import React, { useState } from 'react';
import { X, Mail, Download, Loader, CheckCircle, AlertCircle } from 'lucide-react';

interface EmailCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: any;
  onEmailSubmitted: () => void;
}

const EmailCollectionModal: React.FC<EmailCollectionModalProps> = ({
  isOpen,
  onClose,
  resource,
  onEmailSubmitted
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  if (!isOpen || !resource) return null;

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setError('');
    setIsValidEmail(validateEmail(newEmail));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // For now, we'll simulate the email submission since direct API calls to Beehiiv
      // from the browser may have CORS restrictions. In production, this would typically
      // go through your own backend endpoint that handles the Beehiiv API call.
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log the email for development purposes
      console.log('Email submitted for newsletter:', email);
      console.log('Resource:', resource.title);

      // Open the Google Drive link in a new tab for Creative Writing Prompts
      if (resource.id === 1) {
        window.open('https://drive.google.com/file/d/13pbS0IP273ezW2gqTylS8YTiaiDkcQeC/edit', '_blank', 'noopener,noreferrer');
      }
      
      // Call the success callback
      onEmailSubmitted();
      
      // Reset form
      setEmail('');
      setIsValidEmail(false);
      
    } catch (err) {
      console.error('Email submission error:', err);
      setError('Failed to process your request. Please try again.');
    } finally {
      setIsSubmitting(false);
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
            <Download className="h-6 w-6 text-emerald-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Download Free Resource</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Resource Preview */}
        <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
          <img 
            src={resource.image} 
            alt={resource.title}
            className="w-16 h-20 object-cover rounded shadow-sm mr-4"
            onError={(e) => {
              e.currentTarget.src = "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QyaPpazYowXdrJHpBFgYnuWS5G3T8NLzP1M9O";
            }}
          />
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-sm">{resource.title}</h4>
            <p className="text-gray-600 text-sm">{resource.type}</p>
            <p className="text-emerald-600 font-semibold text-sm">Free Download</p>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 transition-colors ${
                  error 
                    ? 'border-red-300 focus:border-red-500' 
                    : isValidEmail 
                    ? 'border-green-300 focus:border-green-500'
                    : 'border-gray-300 focus:border-emerald-500'
                }`}
                required
                disabled={isSubmitting}
              />
              {isValidEmail && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
              )}
            </div>
            {error && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}
          </div>

          {/* Publishing Opportunity Notice */}
          {resource.hasPublishingOpportunity && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
              <p className="text-sm text-purple-700 font-medium">
                ✨ Remember: Each submission has the chance to win a complimentary publishing package through Bean to Stalk Young Authors Club!
              </p>
            </div>
          )}

          {/* Newsletter Signup Notice */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <p className="text-sm text-emerald-700">
              📧 By downloading this resource, you'll also receive our weekly newsletter with educational tips and new resource announcements. You can unsubscribe at any time.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValidEmail || isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center ${
              !isValidEmail || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 transform hover:scale-105'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Open in New Tab
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            We respect your privacy and will never share your information.
          </p>
        </form>
      </div>
    </div>
  );
};

export default EmailCollectionModal;