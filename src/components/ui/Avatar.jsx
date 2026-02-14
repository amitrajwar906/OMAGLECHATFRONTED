import React from 'react';

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  status = null,
  fallback,
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl'
  };

  const statusSizes = {
    xs: 'h-2 w-2',
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-3.5 w-3.5',
    xl: 'h-4 w-4',
    '2xl': 'h-5 w-5'
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };

  if (src) {
    return (
      <div className={`relative inline-flex ${className}`}>
        <img
          className={`rounded-full object-cover ${sizes[size]}`}
          src={src}
          alt={alt || 'Avatar'}
          {...props}
        />
        {status && (
          <span className={`absolute -bottom-0 -right-0 block rounded-full border-2 border-white dark:border-gray-800 ${statusSizes[status]} ${statusColors[status]}`} />
        )}
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-semibold ${sizes[size]} ${className}`} {...props}>
      {fallback || (alt ? alt.charAt(0).toUpperCase() : '?')}
      {status && (
        <span className={`absolute -bottom-0 -right-0 block rounded-full border-2 border-white dark:border-gray-800 ${statusSizes[status]} ${statusColors[status]}`} />
      )}
    </div>
  );
};

export default Avatar;