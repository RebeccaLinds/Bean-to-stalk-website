import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Eye, Heart, Share2, Copy, Check, Calendar, Clock } from 'lucide-react';
import { getBookById, Book } from '../data/books';
import BookPreviewModal from '../components/BookPreviewModal';
import ShareModal from '../components/ShareModal';
import PriceDisplay from '../components/PriceDisplay';

// Pinterest icon component
const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
  </svg>
);

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const book = getBookById(Number(id));

  // Update meta tags for Pinterest Rich Pins
  useEffect(() => {
    if (!book) return;

    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update Open Graph meta tags for this specific book
    updateMetaTag('og:title', `${book.title} - Bean to Stalk`);
    updateMetaTag('og:description', book.subtitle);
    updateMetaTag('og:image', `${window.location.origin}${book.image}`);
    updateMetaTag('og:url', window.location.href);
    updateMetaTag('og:type', 'product');
    updateMetaTag('product:price:amount', book.price.replace('$', ''));
    updateMetaTag('product:price:currency', 'USD');
    updateMetaTag('product:availability', 'in stock');
    updateMetaTag('product:brand', 'Bean to Stalk');
    updateMetaTag('product:category', book.category);
    updateMetaTag('product:age_group', book.age);

    // Update page title
    document.title = `${book.title} - Bean to Stalk`;

    // Cleanup function to restore original meta tags
    return () => {
      document.title = 'Bean to Stalk - Children\'s Education & Book Store';
    };
  }, [book]);

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h1>
          <button
            onClick={() => navigate('/books')}
            className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} copies of ${book.title} to cart`);
  };

  // Pinterest sharing functionality
  const handlePinterestShare = () => {
    const bookUrl = window.location.href;
    const bookImage = `${window.location.origin}${book.image}`;
    const description = `Check out "${book.title}" by Bean to Stalk - ${book.subtitle}. Perfect for ${book.age}!`;
    
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(bookUrl)}&media=${encodeURIComponent(bookImage)}&description=${encodeURIComponent(description)}`;
    window.open(pinterestUrl, '_blank', 'width=750,height=320');
  };

  // Filter out 'Perforated pages for easy removal and display' for Whimsical Forest Friends
  const filteredFeatures = book.title === "Whimsical Forest Friends" 
    ? book.features.filter(feature => !feature.includes('Perforated pages for easy removal and display'))
    : book.features;

  // Check if book is coming soon or pre-order (no preview available)
  const showPreview = !book.isComingNext && !book.isPreOrder;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate('/books')}
              className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Books
            </button>
          </div>
        </div>

        {/* Book Details */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Book Cover */}
              <div className="text-center">
                <div className="inline-block relative">
                  <div 
                    className={`relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 w-80 ${
                      book.dimensions === 'square' ? 'aspect-square' : 'aspect-7/10'
                    }`}
                  >
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Book spine effect */}
                    <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-black/15 to-transparent"></div>
                  </div>
                  
                  {/* Status Badge - Only show Coming Next or Pre-Order */}
                  {book.isComingNext && (
                    <div className="absolute -top-4 -right-4">
                      <span className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Coming Next
                      </span>
                    </div>
                  )}

                  {book.isPreOrder && !book.isComingNext && (
                    <div className="absolute -top-4 -right-4">
                      <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Pre-Order
                      </span>
                    </div>
                  )}
                </div>

                {/* Centered Action Buttons */}
                <div className="mt-8 space-y-4 flex flex-col items-center">
                  {/* Preview Button - Only show for available books */}
                  {showPreview && (
                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="w-full max-w-sm bg-emerald-100 text-emerald-700 py-3 rounded-full hover:bg-emerald-200 transition-colors flex items-center justify-center font-semibold"
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      Preview Book (20%)
                    </button>
                  )}
                  
                  {/* Coming Soon Notice for books without preview */}
                  {!showPreview && (
                    <div className="w-full max-w-sm bg-gray-100 text-gray-600 py-3 rounded-full flex items-center justify-center font-semibold">
                      <Clock className="h-5 w-5 mr-2" />
                      Preview Available at Release
                    </div>
                  )}
                  
                  {/* Heart and Share Buttons - Below Preview */}
                  <div className="flex space-x-4">
                    <button
                      onClick={handlePinterestShare}
                      className="p-3 bg-white border border-gray-300 rounded-full hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm group"
                      title="Pin to Pinterest"
                      aria-label="Pin to Pinterest"
                    >
                      <PinterestIcon className="h-5 w-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                    </button>
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className="p-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                      title="Add to favorites"
                    >
                      <Heart className={`h-5 w-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                    </button>
                    <button 
                      onClick={() => setIsShareModalOpen(true)}
                      className="p-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                      title="Share this book"
                    >
                      <Share2 className="h-5 w-5 text-gray-400 hover:text-emerald-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Book Information */}
              <div>
                {/* Only show rating if book has a rating (not coming soon) */}
                {book.rating > 0 && (
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-4">
                      {[...Array(book.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-600">{book.rating}.0 out of 5</span>
                  </div>
                )}

                <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-6">{book.subtitle}</p>

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Age Range:</span>
                      <span className="font-semibold text-gray-900 ml-2">{book.age}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Pages:</span>
                      <span className="font-semibold text-gray-900 ml-2">{book.pageCount}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="font-semibold text-gray-900 ml-2">{book.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Format:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        {book.dimensions === 'square' ? '8×8 inches' : '7×10 inches'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Release Date Information - Only show on detail pages */}
                {(book.isPreOrder || book.isComingNext) && book.releaseDate && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
                    <div className="flex items-center text-amber-700">
                      {book.isComingNext ? (
                        <Clock className="h-5 w-5 mr-2" />
                      ) : (
                        <Calendar className="h-5 w-5 mr-2" />
                      )}
                      <span className="font-medium">
                        {book.isComingNext ? 'Coming Next: ' : 'Expected Release: '}
                        {book.releaseDate}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Book</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{book.description}</p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features:</h3>
                  <ul className="space-y-2">
                    {filteredFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Purchase Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <PriceDisplay 
                        usdPrice={book.price} 
                        className="text-3xl font-bold text-emerald-600"
                        size="xl"
                        showOriginal={true}
                      />
                      {book.originalPrice && (
                        <PriceDisplay 
                          usdPrice={book.originalPrice} 
                          className="text-lg text-gray-500 line-through ml-3"
                          size="lg"
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <label className="text-sm font-medium text-gray-700">Quantity:</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-4 rounded-full transition-colors flex items-center justify-center font-semibold text-lg mb-4 ${
                      book.isPreOrder
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : book.isComingNext
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    <ShoppingCart className="h-6 w-6 mr-3" />
                    {book.isPreOrder ? 'Pre-Order Now' : book.isComingNext ? 'Notify Me' : 'Add to Cart'}
                  </button>

                  <p className="text-center text-gray-500 text-sm">
                    Free shipping on orders over $25
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Preview Modal - Only render for available books */}
      {showPreview && (
        <BookPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          bookTitle={book.title}
          previewPages={book.previewPages}
        />
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        book={book}
      />
    </>
  );
};

export default BookDetail;