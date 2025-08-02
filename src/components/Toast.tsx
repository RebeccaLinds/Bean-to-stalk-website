import React, { useEffect, useRef } from 'react';
import { CheckCircle, X, AlertCircle, Info, ShoppingCart } from 'lucide-react';

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ 
  id, 
  type, 
  title, 
  message, 
  duration = 5000, 
  action,
  onClose 
}) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Announce to screen readers
    const announcement = `${title}${message ? `. ${message}` : ''}`;
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.setAttribute('aria-atomic', 'true');
    ariaLive.className = 'sr-only';
    ariaLive.textContent = announcement;
    document.body.appendChild(ariaLive);

    // Clean up announcement
    setTimeout(() => {
      document.body.removeChild(ariaLive);
    }, 1000);

    // Auto-close timer with progress bar
    let startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed / duration) * 100;
      
      if (progressRef.current) {
        progressRef.current.style.width = `${Math.min(progress, 100)}%`;
      }
      
      if (elapsed >= duration) {
        clearInterval(timer);
        onClose(id);
      }
    }, 16); // ~60fps

    // Pause timer on hover
    const handleMouseEnter = () => {
      clearInterval(timer);
      startTime = Date.now() - (Date.now() - startTime); // Preserve current progress
    };

    const handleMouseLeave = () => {
      startTime = Date.now() - (Date.now() - startTime); // Resume from where we left off
      // Restart timer logic here if needed
    };

    const toastElement = toastRef.current;
    if (toastElement) {
      toastElement.addEventListener('mouseenter', handleMouseEnter);
      toastElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearInterval(timer);
      if (toastElement) {
        toastElement.removeEventListener('mouseenter', handleMouseEnter);
        toastElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [id, duration, onClose, title, message]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose(id);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" aria-hidden="true" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" aria-hidden="true" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" aria-hidden="true" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getProgressColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-400';
      case 'error':
        return 'bg-red-400';
      case 'warning':
        return 'bg-amber-400';
      case 'info':
        return 'bg-blue-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div 
      ref={toastRef}
      className={`${getBackgroundColor()} border rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-300 ease-in-out animate-slide-in-right relative overflow-hidden`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
        <div 
          ref={progressRef}
          className={`h-full ${getProgressColor()} transition-all duration-75 ease-linear`}
          style={{ width: '0%' }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            {message && (
              <p className="mt-1 text-sm text-gray-600">{message}</p>
            )}
            {action && (
              <div className="mt-3">
                <button
                  onClick={action.onClick}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
                >
                  {action.label}
                </button>
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={() => onClose(id)}
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;