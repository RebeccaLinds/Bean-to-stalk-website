import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface BookPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  previewPages: string[];
}

const BookPreviewModal: React.FC<BookPreviewModalProps> = ({ 
  isOpen, 
  onClose, 
  bookTitle, 
  previewPages 
}) => {
  const [currentPage, setCurrentPage] = React.useState(0);

  if (!isOpen) return null;

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % previewPages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + previewPages.length) % previewPages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowRight') {
      nextPage();
    } else if (e.key === 'ArrowLeft') {
      prevPage();
    }
  };

  // Check if this is "The Bear and His Magic" which uses spread layout
  const isSpreadLayout = bookTitle === "The Bear and His Magic";

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div 
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Preview: {bookTitle}</h3>
            <p className="text-sm text-gray-600">
              {isSpreadLayout ? 'Two-page spread view' : `Page ${currentPage + 1} of ${previewPages.length}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Close preview"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-gray-100">
          {isSpreadLayout ? (
            // Two-page spread layout for "The Bear and His Magic"
            <div className="relative max-w-5xl mx-auto">
              {/* Book Container with realistic proportions */}
              <div className="relative bg-white rounded shadow-2xl overflow-hidden" style={{ maxWidth: '90vw', maxHeight: '75vh' }}>
                {/* Main spread image */}
                <img
                  src={previewPages[currentPage]}
                  alt={`${bookTitle} spread ${currentPage + 1}`}
                  className="w-full h-auto object-contain"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>
              
              {/* Navigation arrows for multiple spreads */}
              {previewPages.length > 1 && (
                <>
                  <button
                    onClick={prevPage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110 z-30"
                    aria-label="Previous spread"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-700" />
                  </button>
                  <button
                    onClick={nextPage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110 z-30"
                    aria-label="Next spread"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-700" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="relative mx-auto">
              <div className="bg-white rounded shadow-2xl overflow-hidden" style={{ maxWidth: '90vw', maxHeight: '75vh' }}>
                <img
                  src={previewPages[currentPage]}
                  alt={`Page ${currentPage + 1}`}
                  className="w-full h-auto object-contain"
                />
              </div>
              
              {/* Navigation for standard layout */}
              {previewPages.length > 1 && (
                <>
                  <button
                    onClick={prevPage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-colors z-30"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextPage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-colors z-30"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            {/* Page indicators */}
            {previewPages.length > 1 && (
              <div className="flex space-x-2">
                {previewPages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentPage ? 'bg-emerald-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to ${isSpreadLayout ? 'spread' : 'page'} ${index + 1}`}
                  />
                ))}
              </div>
            )}
            
            <div className="text-center flex-1">
              <p className="text-gray-600 text-sm">
                {isSpreadLayout 
                  ? `Spread ${currentPage + 1} of ${previewPages.length} (Preview - Sample pages)`
                  : `Page ${currentPage + 1} of ${previewPages.length} (Preview - 20% of book)`
                }
              </p>
            </div>
            
            {/* Keyboard shortcuts hint */}
            <div className="text-xs text-gray-500">
              <span className="hidden sm:inline">Use ← → keys or click arrows to navigate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPreviewModal;