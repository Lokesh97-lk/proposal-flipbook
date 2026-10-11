import { forwardRef } from 'react';

const FoldBottomLeft = forwardRef(({ className = '', style = {} }, ref) => {
  return (
    <div
      ref={ref}
      className={`fold-section fold-bottom-left ${className}`}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '50%',
        height: '50%',
        transformOrigin: 'bottom left',
        transformStyle: 'preserve-3d',
        zIndex: 15,
        ...style
      }}
    >
      {/* Front Face */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#faf5eb',
          backfaceVisibility: 'hidden',
          boxShadow: 'inset 0 0 25px rgba(180, 150, 110, 0.15)'
        }}
      />
      {/* Back Face */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#ece1cc',
          transform: 'rotateY(180deg)',
          backfaceVisibility: 'hidden',
          boxShadow: 'inset 0 0 35px rgba(100, 75, 50, 0.25)',
          borderRight: '1px solid rgba(160, 130, 100, 0.3)',
          borderTop: '1px solid rgba(160, 130, 100, 0.3)'
        }}
      />
    </div>
  );
});

FoldBottomLeft.displayName = 'FoldBottomLeft';
export default FoldBottomLeft;
