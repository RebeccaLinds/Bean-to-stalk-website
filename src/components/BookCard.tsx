import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Eye, Share2, Calendar, Clock } from 'lucide-react';
import { Book } from '../data/books';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import PriceDisplay from './PriceDisplay';
import { useNavigate } from 'react-router-dom';

// Pinterest icon component
const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
  </svg>
);

interface BookCardProps {
  book: Book;
  onViewDetails: (bookId: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onViewDetails }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (book.isPreOrder) {
      addToast({
        type: 'info',
        title: 'Pre-Order Available',
        message: `${book.title} is available for pre-order. Expected release: ${book.releaseDate}`,
        duration: 4000
      });
      return;
    }

    if (book.isComingNext) {
      addToast({
        type: 'info',
        title: 'Coming Next',
        message: `${book.title} will be available soon. Expected release: ${book.releaseDate}`,
        duration: 4000
      });
      return;
    }

    setIsAddingToCart(true);

    try {
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const cartItem = {
        id: book.id,
        title: book.title,
        subtitle: book.subtitle,
        image: book.image,
        price: book.price,
        category: book.category,
        dimensions: book.dimensions,
        type: 'book' as const,
        maxQuantity: 5
      };

      const result = await addItem(cartItem, 1);

      if (result.success) {
        addToast({
          type: 'success',
          title: 'Added to Cart!',
          message: `${book.title} has been added to your cart.`,
          duration: 3000,
          action: {
            label: 'View Cart',
            onClick: () => navigate('/cart')
          }
        });
      } else {
        addToast({
          type: 'error',
          title: 'Unable to Add to Cart',
          message: result.error || 'Please try again.',
          duration: 4000
        });
      }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Something went wrong',
        message: 'Please check your connection and try again.',
        duration: 4000
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Pinterest sharing functionality
  const handlePinterestShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const bookUrl = `${window.location.origin}/books/${book.id}`;
    const bookImage = `${window.location.origin}${book.image}`;
    const description = `Check out "${book.title}" by Bean to Stalk - ${book.subtitle}. Perfect for ${book.age}!`;
    
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(bookUrl)}&media=${encodeURIComponent(bookImage)}&description=${encodeURIComponent(description)}`;
    window.open(pinterestUrl, '_blank', 'width=750,height=320');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col">
      {/* Book Cover - Consistent padding for all book types */}
      <div className="relative p-8 bg-gradient-to-br from-emerald-50 to-green-50 flex-shrink-0">
        <div className="flex justify-center">
          <div className="relative">
            <div 
              className={`relative bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 cursor-pointer w-40 ${
                book.dimensions === 'square' ? 'aspect-square' : 'aspect-7/10'
              }`}
              onClick={() => onViewDetails(book.id)}
            >
              <img 
                src={book.image} 
                alt={book.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="h-8 w-8 text-white" />
              </div>
            </div>
            
            {/* Status Badges - Only show Coming Next or Pre-Order */}
            {book.isComingNext && (
              <div className="absolute -top-2 -right-2">
                <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Coming Next
                </span>
              </div>
            )}

            {book.isPreOrder && !book.isComingNext && (
              <div className="absolute -top-2 -right-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Pre-Order
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Book Info - Flexible content area */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          {/* Only show rating if book has a rating (not coming soon) */}
          {book.rating > 0 && (
            <div className="flex text-yellow-400">
              {[...Array(book.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          )}
          <span className="text-sm text-gray-500">{book.age}</span>
        </div>
        
        <h3 
          className="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-emerald-600 transition-colors line-clamp-2"
          onClick={() => onViewDetails(book.id)}
        >
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{book.subtitle}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <PriceDisplay 
              usdPrice={book.price} 
              className="text-2xl font-bold text-emerald-600"
              size="xl"
            />
            {book.originalPrice && (
              <PriceDisplay 
                usdPrice={book.originalPrice} 
                className="text-sm text-gray-500 line-through ml-2"
                size="sm"
              />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorited(!isFavorited);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Add to favorites"
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-5 w-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
            </button>
            <button
              onClick={handlePinterestShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Pin to Pinterest"
              aria-label="Pin to Pinterest"
            >
              <PinterestIcon className="h-5 w-5 text-gray-400 hover:text-red-600" />
            </button>
            <button
              onClick={handlePinterestShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Share on Pinterest"
              aria-label="Share on Pinterest"
            >
              <Share2 className="h-5 w-5 text-gray-400 hover:text-emerald-600" />
            </button>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="space-y-2 mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`w-full py-3 rounded-full transition-all duration-300 flex items-center justify-center font-semibold ${
              book.isPreOrder
                ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                : book.isComingNext
                ? 'bg-amber-600 text-white hover:bg-amber-700 transform hover:scale-105'
                : isAddingToCart
                ? 'bg-emerald-400 text-white cursor-wait'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 transform hover:scale-105'
            }`}
            aria-label={`${book.isPreOrder ? 'Pre-order' : book.isComingNext ? 'Coming Next' : 'Add'} ${book.title} to cart`}
          >
            {isAddingToCart ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {book.isPreOrder ? 'Pre-Order Now' : book.isComingNext ? 'Notify Me' : 'Add to Cart'}
              </>
            )}
          </button>
          <button
            onClick={() => onViewDetails(book.id)}
            className="w-full border-2 border-emerald-600 text-emerald-600 py-2 rounded-full hover:bg-emerald-600 hover:text-white transition-colors flex items-center justify-center font-semibold"
            aria-label={`View details for ${book.title}`}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;