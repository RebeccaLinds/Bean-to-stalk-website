import React from 'react';
import { useCurrency } from '../hooks/useCurrency.tsx';
import { Loader } from 'lucide-react';

interface PriceDisplayProps {
  usdPrice: string | number;
  className?: string;
  showOriginal?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCurrencyCode?: boolean;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  usdPrice, 
  className = '', 
  showOriginal = false,
  size = 'md',
  showCurrencyCode = false
}) => {
  const { convertPriceString, currentCurrency, isLoading, parsePrice, formatPrice } = useCurrency();

  // Convert string price to number if needed
  const priceNumber = typeof usdPrice === 'number' ? usdPrice : parsePrice(usdPrice.toString());
  const priceString = typeof usdPrice === 'number' ? `$${usdPrice.toFixed(2)}` : usdPrice.toString();
  
  // Get converted price
  const convertedPrice = formatPrice(priceNumber);
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  // Show loading state with skeleton
  if (isLoading) {
    return (
      <span className={`${className} ${sizeClasses[size]} flex items-center`}>
        <Loader className="h-3 w-3 animate-spin mr-1" />
        <span className="animate-pulse bg-gray-200 rounded px-2 py-1">
          {priceString}
        </span>
      </span>
    );
  }

  return (
    <span className={`${className} ${sizeClasses[size]}`}>
      {convertedPrice}
      {showCurrencyCode && currentCurrency.code !== 'USD' && (
        <span className="text-xs text-gray-500 ml-1">
          {currentCurrency.code}
        </span>
      )}
      {showOriginal && currentCurrency.code !== 'USD' && (
        <span className="text-xs text-gray-500 ml-1 block">
          (≈ {priceString} USD)
        </span>
      )}
    </span>
  );
};

export default PriceDisplay;