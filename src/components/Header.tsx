import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CurrencySelector from './CurrencySelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { totals, isEmpty } = useCart();

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Bean to Stalk Secondary Logo with Appropriate Header Size */}
          <div className="flex items-center cursor-pointer group" onClick={handleLogoClick}>
            <img 
              src="https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1Q22ZDG94KuyGpwxk16Y9eoV0QXRs5cPHaMnLZ" 
              alt="Bean to Stalk - Children's Education & Book Store" 
              className="h-12 w-12 transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                console.error('Logo failed to load:', e.currentTarget.src);
                // Fallback to text if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/books')}
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Books
            </button>
            <button 
              onClick={() => navigate('/activities')}
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Activities
            </button>
            <button 
              onClick={() => navigate('/kids-classes')}
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Kids Classes
            </button>
            <button 
              onClick={() => navigate('/blog')}
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 text-gray-600 hover:text-emerald-600 cursor-pointer transition-colors" />
            
            {/* Currency Selector */}
            <CurrencySelector />
            
            {/* Enhanced Cart Icon with Counter */}
            <div className="relative cursor-pointer group" onClick={() => navigate('/cart')}>
              <ShoppingCart className="h-5 w-5 text-gray-600 hover:text-emerald-600 transition-colors" />
              
              {/* Cart Counter */}
              {!isEmpty && (
                <span 
                  className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-pulse"
                  aria-label={`${totals.itemCount} items in cart`}
                >
                  {totals.itemCount > 99 ? '99+' : totals.itemCount}
                </span>
              )}
              
              {/* Hover tooltip */}
              <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {isEmpty ? 'Cart is empty' : `${totals.itemCount} item${totals.itemCount !== 1 ? 's' : ''} - ${totals.total.toFixed(2)}`}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  navigate('/books');
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-emerald-600 font-medium text-left"
              >
                Books
              </button>
              <button 
                onClick={() => {
                  navigate('/activities');
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-emerald-600 font-medium text-left"
              >
                Activities
              </button>
              <button 
                onClick={() => {
                  navigate('/kids-classes');
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-emerald-600 font-medium text-left"
              >
                Kids Classes
              </button>
              <button 
                onClick={() => {
                  navigate('/blog');
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-emerald-600 font-medium text-left"
              >
                Blog
              </button>
              <button 
                onClick={() => {
                  navigate('/about');
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-emerald-600 font-medium text-left"
              >
                About
              </button>
              <button 
                onClick={() => {
                  navigate('/contact');
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-emerald-600 font-medium text-left"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;