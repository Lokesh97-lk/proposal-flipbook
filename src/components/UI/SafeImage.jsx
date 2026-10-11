import { useState } from 'react';

/**
 * SafeImage component
 * Gracefully handles broken or missing images with an artistic vintage sketch placeholder.
 */
export default function SafeImage({ src, alt = '', className = '', ...props }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={`safe-image-placeholder ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ece3d2',
          border: '1px dashed #c0b095',
          color: '#8c7e6c',
          padding: '16px',
          textAlign: 'center',
          width: '100%',
          height: '100%'
        }}
        {...props}
      >
        <span style={{ fontSize: '1.4rem', marginBottom: '4px' }}>✧</span>
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.85rem' }}>
          {alt || 'A cherished memory'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
      {...props}
    />
  );
}
