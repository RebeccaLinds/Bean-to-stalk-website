import React, { useState } from 'react';
import { Mail, User, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface FormData {
  email: string;
  name: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

const NewsletterSignup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: ''
  });
  
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formState.error) {
      setFormState(prev => ({ ...prev, error: null }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset form state
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      error: null
    });

    // Validation
    if (!formData.email.trim()) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Email address is required'
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Please enter a valid email address'
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      const isSuccessful = Math.random() > 0.2; // 80% success rate
      
      if (isSuccessful) {
        setFormState({
          isSubmitting: false,
          isSuccess: true,
          error: null
        });
        
        // Reset form data on success
        setFormData({
          email: '',
          name: ''
        });
      } else {
        throw new Error('Subscription failed. Please try again.');
      }
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    }
  };

  const resetForm = () => {
    setFormState({
      isSubmitting: false,
      isSuccess: false,
      error: null
    });
  };

  return (
    <section className="newsletter-signup" aria-labelledby="newsletter-heading">
      <div className="newsletter-container">
        {/* Background Image with WebP/JPG fallback */}
        <picture className="newsletter-background">
          <source 
            srcSet="https://images.pexels.com/photos/3933036/pexels-photo-3933036.jpeg?auto=compress&cs=tinysrgb&w=1600&h=400&fit=crop" 
            type="image/webp" 
          />
          <img 
            src="https://images.pexels.com/photos/3933036/pexels-photo-3933036.jpeg?auto=compress&cs=tinysrgb&w=1600&h=400&fit=crop"
            alt="Family reading together"
            loading="lazy"
            className="newsletter-bg-image"
          />
        </picture>

        {/* Content Overlay */}
        <div className="newsletter-content">
          {formState.isSuccess ? (
            // Success State
            <div className="success-message" role="alert" aria-live="polite">
              <div className="success-icon">
                <CheckCircle className="icon" aria-hidden="true" />
              </div>
              <h2 className="success-heading">Welcome to Our Reading Community!</h2>
              <p className="success-text">
                Thank you for subscribing. You'll receive your first weekly reading tips soon.
              </p>
              <button 
                onClick={resetForm}
                className="reset-button"
                type="button"
              >
                Subscribe Another Email
              </button>
            </div>
          ) : (
            // Form State
            <div className="form-content">
              <h1 id="newsletter-heading" className="newsletter-heading">
                Get Weekly Reading Tips
              </h1>
              <p className="newsletter-subtext">
                Join our community of parents and receive curated reading activities every week
              </p>

              <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
                {/* Error Message */}
                {formState.error && (
                  <div className="error-message" role="alert" aria-live="polite">
                    <AlertCircle className="error-icon" aria-hidden="true" />
                    <span>{formState.error}</span>
                  </div>
                )}

                {/* Form Fields */}
                <div className="form-fields">
                  {/* Name Field (Optional) */}
                  <div className="field-group">
                    <label htmlFor="name" className="field-label">
                      <User className="field-icon" aria-hidden="true" />
                      <span className="sr-only">Name (optional)</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name (optional)"
                      className="form-input"
                      disabled={formState.isSubmitting}
                      autoComplete="given-name"
                    />
                  </div>

                  {/* Email Field (Required) */}
                  <div className="field-group">
                    <label htmlFor="email" className="field-label">
                      <Mail className="field-icon" aria-hidden="true" />
                      <span className="sr-only">Email address (required)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="form-input"
                      required
                      disabled={formState.isSubmitting}
                      autoComplete="email"
                      aria-describedby={formState.error ? "email-error" : undefined}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="submit-button"
                  disabled={formState.isSubmitting || !formData.email.trim()}
                  aria-describedby="submit-status"
                >
                  {formState.isSubmitting ? (
                    <>
                      <Loader className="submit-icon animate-spin" aria-hidden="true" />
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="submit-icon" aria-hidden="true" />
                      <span>Join Our Reading Community</span>
                    </>
                  )}
                </button>

                {/* Privacy Notice */}
                <p className="privacy-notice">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .newsletter-signup {
          width: 100%;
          margin: 2rem 0;
        }

        .newsletter-container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          background-color: #f5f5f5;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .newsletter-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .newsletter-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }

        .newsletter-content {
          position: relative;
          z-index: 2;
          background: linear-gradient(
            135deg,
            rgba(44, 82, 130, 0.95) 0%,
            rgba(26, 54, 93, 0.9) 100%
          );
          padding: 3rem 2rem;
          color: white;
          text-align: center;
        }

        .newsletter-heading {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .newsletter-subtext {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 1.125rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          line-height: 1.5;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .newsletter-form {
          max-width: 500px;
          margin: 0 auto;
        }

        .error-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fecaca;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }

        .error-icon {
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .field-group {
          position: relative;
        }

        .field-label {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          pointer-events: none;
        }

        .field-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #6b7280;
        }

        .form-input {
          width: 100%;
          min-width: min(400px, 100%);
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1rem;
          font-family: system-ui, -apple-system, sans-serif;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .form-input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.5);
          background-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
        }

        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-button {
          width: 200px;
          padding: 1rem 1.5rem;
          background-color: #2C5282;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          font-family: system-ui, -apple-system, sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 0 auto;
          box-shadow: 0 4px 12px rgba(44, 82, 130, 0.3);
        }

        .submit-button:hover:not(:disabled) {
          background-color: #1A365D;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(44, 82, 130, 0.4);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .submit-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .privacy-notice {
          margin-top: 1rem;
          font-size: 0.875rem;
          opacity: 0.8;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .success-message {
          text-align: center;
          padding: 2rem 0;
        }

        .success-icon {
          margin-bottom: 1.5rem;
        }

        .success-icon .icon {
          width: 4rem;
          height: 4rem;
          color: #10b981;
        }

        .success-heading {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: white;
        }

        .success-text {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 1.125rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          line-height: 1.5;
        }

        .reset-button {
          padding: 0.75rem 1.5rem;
          background-color: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .reset-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Tablet Styles */
        @media (max-width: 1024px) {
          .newsletter-container {
            width: 90vw;
            margin: 0 auto;
          }

          .newsletter-heading {
            font-size: 1.75rem;
          }

          .newsletter-content {
            padding: 2.5rem 1.5rem;
          }
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .newsletter-container {
            width: calc(100% - 40px);
            margin: 0 20px;
          }

          .newsletter-heading {
            font-size: 1.5rem;
          }

          .newsletter-subtext {
            font-size: 1rem;
          }

          .newsletter-content {
            padding: 2rem 1rem;
          }

          .form-fields {
            gap: 0.75rem;
          }

          .submit-button {
            width: 100%;
            max-width: 300px;
          }

          .success-heading {
            font-size: 1.5rem;
          }

          .success-text {
            font-size: 1rem;
          }
        }

        /* Small Mobile Styles */
        @media (max-width: 480px) {
          .newsletter-container {
            width: calc(100% - 20px);
            margin: 0 10px;
          }

          .newsletter-content {
            padding: 1.5rem 0.75rem;
          }

          .form-input {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .form-input {
            border-color: white;
            background-color: rgba(0, 0, 0, 0.8);
          }

          .submit-button {
            border: 2px solid white;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .submit-button,
          .form-input,
          .reset-button {
            transition: none;
          }

          .animate-spin {
            animation: none;
          }

          .submit-button:hover:not(:disabled) {
            transform: none;
          }
        }

        /* Focus styles for better accessibility */
        .submit-button:focus-visible,
        .reset-button:focus-visible {
          outline: 2px solid #fbbf24;
          outline-offset: 2px;
        }

        .form-input:focus-visible {
          outline: 2px solid #fbbf24;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
};

export default NewsletterSignup;