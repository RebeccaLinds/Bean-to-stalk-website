import { useState, useEffect, useCallback, createContext, useContext } from 'react';

interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

interface GeolocationData {
  country_code: string;
  country_name: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
}

interface ExchangeRateData {
  success: boolean;
  rates: {
    [key: string]: number;
  };
}

interface CurrencyContextType {
  currentCurrency: CurrencyInfo;
  isLoading: boolean;
  error: string | null;
  supportedCurrencies: CurrencyInfo[];
  changeCurrency: (currencyCode: string) => Promise<void>;
  convertPrice: (usdPrice: number) => number;
  formatPrice: (usdPrice: number) => string;
  parsePrice: (priceString: string) => number;
  convertPriceString: (priceString: string) => string;
  detectCurrency: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyInfo>(() => {
    // Try to load from localStorage first
    try {
      const stored = localStorage.getItem('bean-to-stalk-currency');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load currency from localStorage:', error);
    }
    
    // Default to USD
    return {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar',
      rate: 1
    };
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get API keys from environment variables
  const IPDATA_API_KEY = import.meta.env.VITE_IPDATA_API_KEY;
  const FXRATES_API_KEY = import.meta.env.VITE_FXRATES_API_KEY;

  // Supported currencies with proper formatting
  const supportedCurrencies: CurrencyInfo[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1 },
    { code: 'EUR', symbol: '€', name: 'Euro', rate: 1 },
    { code: 'GBP', symbol: '£', name: 'British Pound', rate: 1 },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1 }
  ];

  // Save currency to localStorage
  const saveCurrency = useCallback((currency: CurrencyInfo) => {
    try {
      localStorage.setItem('bean-to-stalk-currency', JSON.stringify(currency));
      
      // Broadcast currency change to other tabs
      window.dispatchEvent(new CustomEvent('currency-changed', {
        detail: currency
      }));
    } catch (error) {
      console.warn('Failed to save currency to localStorage:', error);
    }
  }, []);

  // Fetch exchange rates for multiple currencies
  const fetchExchangeRates = useCallback(async (targetCurrencies: string[]): Promise<{ [key: string]: number }> => {
    if (!FXRATES_API_KEY) {
      throw new Error('Exchange rate API key not configured');
    }

    const currencyList = targetCurrencies.join(',');
    const response = await fetch(
      `https://api.fxratesapi.com/latest?api_key=${FXRATES_API_KEY}&base=USD&currencies=${currencyList}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Exchange rate API error: ${response.status}`);
    }

    const data: ExchangeRateData = await response.json();

    if (!data.success) {
      throw new Error('Invalid exchange rate response');
    }

    return data.rates;
  }, [FXRATES_API_KEY]);

  // Detect user's location and currency
  const detectCurrency = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if API keys are available
      if (!IPDATA_API_KEY) {
        console.warn('IPData API key not configured, skipping auto-detection');
        setIsLoading(false);
        return;
      }

      // Step 1: Get user's location using IPData.co
      const locationResponse = await fetch(
        `https://api.ipdata.co?api-key=${IPDATA_API_KEY}&fields=country_code,country_name,currency`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!locationResponse.ok) {
        throw new Error('Failed to fetch location data');
      }

      const locationData: GeolocationData = await locationResponse.json();
      
      // Map country to supported currency
      let targetCurrency = 'USD'; // Default
      
      switch (locationData.country_code) {
        case 'CA':
          targetCurrency = 'CAD';
          break;
        case 'GB':
          targetCurrency = 'GBP';
          break;
        case 'AU':
          targetCurrency = 'AUD';
          break;
        case 'DE':
        case 'FR':
        case 'IT':
        case 'ES':
        case 'NL':
          targetCurrency = 'EUR';
          break;
        default:
          targetCurrency = 'USD';
      }

      // If it's USD, no need to fetch exchange rate
      if (targetCurrency === 'USD') {
        const usdCurrency = supportedCurrencies.find(c => c.code === 'USD')!;
        setCurrentCurrency(usdCurrency);
        saveCurrency(usdCurrency);
        setIsLoading(false);
        return;
      }

      // Step 2: Get exchange rate for non-USD currencies
      const rates = await fetchExchangeRates([targetCurrency]);

      if (!rates[targetCurrency]) {
        throw new Error(`Exchange rate not available for ${targetCurrency}`);
      }

      // Set the detected currency with exchange rate
      const currencyInfo = supportedCurrencies.find(c => c.code === targetCurrency);
      if (currencyInfo) {
        const updatedCurrency = {
          ...currencyInfo,
          rate: rates[targetCurrency]
        };
        setCurrentCurrency(updatedCurrency);
        saveCurrency(updatedCurrency);
      }

    } catch (err) {
      console.error('Currency detection failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to detect currency');
      
      // Don't change currency on error, keep current one
    } finally {
      setIsLoading(false);
    }
  }, [IPDATA_API_KEY, fetchExchangeRates, saveCurrency]);

  // Manual currency change
  const changeCurrency = useCallback(async (currencyCode: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Find currency info
      const currencyInfo = supportedCurrencies.find(c => c.code === currencyCode);
      if (!currencyInfo) {
        throw new Error(`Unsupported currency: ${currencyCode}`);
      }

      // If it's USD, no need to fetch exchange rate
      if (currencyCode === 'USD') {
        setCurrentCurrency(currencyInfo);
        saveCurrency(currencyInfo);
        setIsLoading(false);
        return;
      }

      // Fetch current exchange rate
      const rates = await fetchExchangeRates([currencyCode]);

      if (!rates[currencyCode]) {
        throw new Error(`Exchange rate not available for ${currencyCode}`);
      }

      const updatedCurrency = {
        ...currencyInfo,
        rate: rates[currencyCode]
      };

      setCurrentCurrency(updatedCurrency);
      saveCurrency(updatedCurrency);

    } catch (err) {
      console.error('Currency change failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to change currency');
    } finally {
      setIsLoading(false);
    }
  }, [fetchExchangeRates, saveCurrency]);

  // Convert USD price to current currency
  const convertPrice = useCallback((usdPrice: number): number => {
    const converted = usdPrice * currentCurrency.rate;
    return Math.round(converted * 100) / 100; // Round to 2 decimal places
  }, [currentCurrency.rate]);

  // Format price with currency symbol and proper formatting
  const formatPrice = useCallback((usdPrice: number): string => {
    const convertedPrice = convertPrice(usdPrice);
    
    // Format based on currency
    switch (currentCurrency.code) {
      case 'EUR':
        return `${convertedPrice.toFixed(2)}€`;
      case 'GBP':
        return `£${convertedPrice.toFixed(2)}`;
      default:
        return `${currentCurrency.symbol}${convertedPrice.toFixed(2)}`;
    }
  }, [convertPrice, currentCurrency]);

  // Parse price string (e.g., "$12.99") to number
  const parsePrice = useCallback((priceString: string): number => {
    const cleaned = priceString.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  // Convert and format price string
  const convertPriceString = useCallback((priceString: string): string => {
    const usdPrice = parsePrice(priceString);
    return formatPrice(usdPrice);
  }, [parsePrice, formatPrice]);

  // Listen for currency changes from other tabs
  useEffect(() => {
    const handleCurrencyChange = (event: CustomEvent) => {
      const newCurrency = event.detail;
      setCurrentCurrency(newCurrency);
    };

    window.addEventListener('currency-changed' as any, handleCurrencyChange);
    
    return () => {
      window.removeEventListener('currency-changed' as any, handleCurrencyChange);
    };
  }, []);

  // Auto-detect currency on first load (only if no stored currency)
  useEffect(() => {
    const stored = localStorage.getItem('bean-to-stalk-currency');
    if (!stored) {
      detectCurrency();
    }
  }, [detectCurrency]);

  const contextValue: CurrencyContextType = {
    currentCurrency,
    isLoading,
    error,
    supportedCurrencies,
    changeCurrency,
    convertPrice,
    formatPrice,
    parsePrice,
    convertPriceString,
    detectCurrency
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};