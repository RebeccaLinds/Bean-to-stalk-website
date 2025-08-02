import React, { useState } from 'react';
import { X, Share2, Copy, Check } from 'lucide-react';
import { Book } from '../data/books';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
}

// Pinterest icon component
const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
  </svg>
);

// Facebook icon component
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Twitter icon component
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, book }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen) return null;

  const bookUrl = window.location.href;
  const bookImage = `${window.location.origin}${book.image}`;
  const shareText = `Check out "${book.title}" by Bean to Stalk - ${book.subtitle}. Perfect for ${book.age}! Available for ${book.price}`;

  const handlePinterestShare = () => {
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(bookUrl)}&media=${encodeURIComponent(bookImage)}&description=${encodeURIComponent(shareText)}`;
    window.open(pinterestUrl, '_blank', 'width=750,height=320');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(bookUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(bookUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(bookUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = bookUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Share2 className="h-6 w-6 text-emerald-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Share This Book</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close share modal"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Book Preview */}
        <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
          <img 
            src={book.image} 
            alt={book.title}
            className="w-16 h-20 object-cover rounded shadow-sm mr-4"
          />
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-sm">{book.title}</h4>
            <p className="text-gray-600 text-sm">{book.subtitle}</p>
            <p className="text-emerald-600 font-semibold text-sm">{book.price}</p>
          </div>
        </div>

        {/* Share Options */}
        <div className="space-y-3">
          {/* Pinterest */}
          <button
            onClick={handlePinterestShare}
            className="w-full flex items-center p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group"
          >
            <PinterestIcon className="h-6 w-6 text-red-600 mr-4" />
            <div className="text-left">
              <div className="font-semibold text-gray-900 group-hover:text-red-600">Share on Pinterest</div>
              <div className="text-sm text-gray-600">Pin this book to your boards</div>
            </div>
          </button>

          {/* Facebook */}
          <button
            onClick={handleFacebookShare}
            className="w-full flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
          >
            <FacebookIcon className="h-6 w-6 text-blue-600 mr-4" />
            <div className="text-left">
              <div className="font-semibold text-gray-900 group-hover:text-blue-600">Share on Facebook</div>
              <div className="text-sm text-gray-600">Share with your friends</div>
            </div>
          </button>

          {/* Twitter */}
          <button
            onClick={handleTwitterShare}
            className="w-full flex items-center p-4 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors group"
          >
            <TwitterIcon className="h-6 w-6 text-sky-600 mr-4" />
            <div className="text-left">
              <div className="font-semibold text-gray-900 group-hover:text-sky-600">Share on Twitter</div>
              <div className="text-sm text-gray-600">Tweet about this book</div>
            </div>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            {copySuccess ? (
              <Check className="h-6 w-6 text-green-600 mr-4" />
            ) : (
              <Copy className="h-6 w-6 text-gray-600 mr-4" />
            )}
            <div className="text-left">
              <div className={`font-semibold ${copySuccess ? 'text-green-600' : 'text-gray-900 group-hover:text-gray-700'}`}>
                {copySuccess ? 'Link Copied!' : 'Copy Link'}
              </div>
              <div className="text-sm text-gray-600">
                {copySuccess ? 'Link copied to clipboard' : 'Copy link to share anywhere'}
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Help spread the love of learning by sharing our books!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;