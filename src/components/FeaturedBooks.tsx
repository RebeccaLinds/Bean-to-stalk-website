import React from 'react';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { books } from '../data/books';
import PriceDisplay from './PriceDisplay';

// Pinterest icon component
const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
  </svg>
);

const FeaturedBooks = () => {
  const navigate = useNavigate();

  // Get featured books from the main books data
  const featuredBooks = [
    books.find(book => book.id === 1), // Whimsical Forest Friends
    books.find(book => book.id === 2), // Young Explorer's Guide - Wilderness
    books.find(book => book.id === 3)  // Young Explorer's Guide - Mindfulness
  ].filter(Boolean);

  const handleBookClick = (bookId: number) => {
    navigate(`/books/${bookId}`);
  };

  // Pinterest sharing functionality
  const handlePinterestShare = (book: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const bookUrl = `${window.location.origin}/books/${book.id}`;
    const bookImage = `${window.location.origin}${book.image}`;
    const description = `Check out "${book.title}" by Bean to Stalk - ${book.subtitle}. Perfect for ${book.age}!`;
    
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(bookUrl)}&media=${encodeURIComponent(bookImage)}&description=${encodeURIComponent(description)}`;
    window.open(pinterestUrl, '_blank', 'width=750,height=320');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Books</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Carefully curated stories and educational materials that inspire wonder, 
            creativity, and learning in young minds.
          </p>
        </div>

        {/* Digital Bookshelf */}
        <div className="relative">
          {/* Books Display with Dynamic Sizing */}
          <div className="flex justify-center items-end space-x-4 lg:space-x-6 mb-6 px-4">
            {featuredBooks.map((book, index) => {
              return (
                <div key={book.id} className="group relative flex-shrink-0">
                  {/* Book */}
                  <div 
                    className="relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-6 cursor-pointer"
                    onClick={() => handleBookClick(book.id)}
                  >
                    {/* Book Shadow */}
                    <div 
                      className={`absolute inset-0 bg-black/15 rounded-lg transform translate-x-3 translate-y-3 blur-md w-48 ${
                        book.dimensions === 'square' ? 'aspect-square' : 'aspect-7/10'
                      }`}
                    ></div>
                    
                    {/* Book Cover */}
                    <div 
                      className={`relative bg-white rounded shadow-xl overflow-hidden border border-gray-200 w-48 ${
                        book.dimensions === 'square' ? 'aspect-square' : 'aspect-7/10'
                      }`}
                    >
                      <img 
                        src={book.image} 
                        alt={book.title}
                        className="absolute inset-0 w-full h-full object-cover rounded shadow-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex items-center justify-center">
                      <div className="absolute left-0 top-0 w-3 h-full bg-gradient-to-r from-black/15 to-transparent"></div>
                      
                      {/* Favorite Button */}
                      <div className="absolute top-3 right-3">
                        <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors shadow-lg">
                          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                      </div>
                    </div>
                    
                    {/* Book Info Popup on Hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-20">
                      <div className="bg-white rounded-xl shadow-2xl p-5 w-72 border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex text-yellow-400">
                            {[...Array(book.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{book.age}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{book.subtitle}</p>
                        
                        {/* Book specifications */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Format:</span>
                            <span className="font-medium text-gray-900">
                              {book.dimensions === 'square' ? '8×8 inches' : '7×10 inches'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-600">Category:</span>
                            <span className="font-medium text-gray-900">{book.category}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-emerald-600">{book.price}</span>
                          <button className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors flex items-center text-sm font-semibold">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Bookshelf Mantle - Adjusts to accommodate different book widths */}
          <div className="relative">
            <div className="h-4 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg shadow-lg mx-4"></div>
            <div className="h-3 bg-gradient-to-b from-amber-200 to-amber-300 rounded-b-lg shadow-md mx-2 -mt-1"></div>
            <div className="h-2 bg-gradient-to-b from-amber-300 to-amber-400 rounded-b-lg shadow-sm mx-1 -mt-1"></div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/books')}
            className="bg-emerald-100 text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-emerald-200 transition-colors"
          >
            View All Books
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;