import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Loader, AlertCircle } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency.tsx';

const CurrencySelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { 
    currentCurrency, 
    supportedCurrencies, 
    changeCurrency, 
    isLoading,
    error 
  } = useCurrency();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const handleCurrencyChange = async (currencyCode: string) => {
    if (currencyCode === currentCurrency.code) {
      setIsOpen(false);
      return;
    }

    try {
      await changeCurrency(currencyCode);
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to change currency:', err);
      // Keep dropdown open to show error
    }
  };

  const handleToggle = () => {
    if (!isLoading) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Currency Selector Button */}
      <button
        onClick={handleToggle}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          isLoading 
            ? 'cursor-wait opacity-75' 
            : 'hover:bg-gray-100 cursor-pointer'
        } ${error ? 'text-red-600' : 'text-gray-700'}`}
        disabled={isLoading}
        title={error ? `Currency error: ${error}` : 'Change currency'}
        aria-label="Currency selector"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {isLoading ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : error ? (
          <AlertCircle className="h-4 w-4" />
        ) : (
          <Globe className="h-4 w-4" />
        )}
        
        <span className="text-sm font-medium min-w-[2.5rem]">
          {currentCurrency.code}
        </span>
        
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-900">Select Currency</h3>
          </div>

          {/* Currency List */}
          <div className="py-2 max-h-64 overflow-y-auto" role="listbox">
            {supportedCurrencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleCurrencyChange(currency.code)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                disabled={isLoading}
                role="option"
                aria-selected={currentCurrency.code === currency.code}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-emerald-600">
                      {currency.symbol}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-emerald-600">
                      {currency.code}
                    </div>
                    <div className="text-sm text-gray-500">
                      {currency.name}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {currentCurrency.code === currency.code && (
                    <Check className="h-4 w-4 text-emerald-600" />
                  )}
                  {currency.code !== 'USD' && (
                    <span className="text-xs text-gray-400">
                      ≈{currency.rate?.toFixed(3) || '...'}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            {error ? (
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                <p className="text-xs text-red-600">
                  {error}
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                Rates updated automatically • Prices in USD base
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;