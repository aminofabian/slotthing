import React from 'react';

interface StarProps {
  className?: string;
  filled?: boolean;
  animated?: boolean;
  variant?: 'default' | 'shine' | 'pulse' | 'sparkle';
  size?: 'sm' | 'md' | 'lg';
}

const Star: React.FC<StarProps> = ({ 
  className = "", 
  filled = true,
  animated = false,
  variant = 'default',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const variantClasses = {
    default: '',
    shine: 'animate-shine',
    pulse: 'animate-star-pulse',
    sparkle: 'animate-sparkle'
  };

  const baseClass = `${sizeClasses[size]} ${className} transition-all duration-300 hover:scale-110`;
  const animationClass = animated ? variantClasses[variant] : '';

  return (
    <div className="relative inline-block">
      {/* Glow effect */}
      <div className={`absolute inset-0 blur-lg transform scale-150 ${filled ? 'bg-yellow-400/30' : ''} ${animationClass}`}></div>
      
      {/* Main star */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`${baseClass} ${animationClass} relative z-10`}
      >
        <defs>
          {/* Gradient for filled state */}
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
          </linearGradient>
          
          {/* Gradient for outline state */}
          <linearGradient id="outlineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#fcd34d', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Star shape */}
        <path
          d="M12 1.5l2.776 6.098L21.5 8.589l-4.75 4.751 1.122 6.661L12 16.838 6.128 20l1.122-6.661L2.5 8.589l6.724-.991L12 1.5z"
          fill={filled ? 'url(#starGradient)' : 'none'}
          stroke={filled ? 'none' : 'url(#outlineGradient)'}
          strokeWidth={filled ? '0' : '1.5'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Sparkle effects for sparkle variant */}
        {variant === 'sparkle' && (
          <>
            <circle
              className="animate-ping"
              cx="18"
              cy="6"
              r="1"
              fill="#fcd34d"
            />
            <circle
              className="animate-ping animation-delay-300"
              cx="6"
              cy="18"
              r="1"
              fill="#fcd34d"
            />
          </>
        )}
      </svg>

      {/* Shine effect overlay */}
      {variant === 'shine' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-shine"></div>
      )}
    </div>
  );
};

export default Star;
