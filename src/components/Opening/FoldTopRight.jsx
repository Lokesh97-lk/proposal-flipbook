import { forwardRef } from 'react';

const FoldTopRight = forwardRef(({ className = '', style = {} }, ref) => {
  return (
    <div
      ref={ref}
      className={`fold-section fold-top-right ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '50%',
        transformOrigin: 'top right',
        transformStyle: 'preserve-3d',
        zIndex: 14,
        ...style
      }}
    >
      {/* Front Face (Interior parchment) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#faf5eb',
          backfaceVisibility: 'hidden',
          boxShadow: 'inset 0 0 25px rgba(180, 150, 110, 0.15)'
        }}
      />
      {/* Back Face (Exterior folded paper) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#ece1cc',
          transform: 'rotateY(180deg)',
          backfaceVisibility: 'hidden',
          boxShadow: 'inset 0 0 35px rgba(100, 75, 50, 0.25)',
          borderLeft: '1px solid rgba(160, 130, 100, 0.3)',
          borderBottom: '1px solid rgba(160, 130, 100, 0.3)'
        }}
      />
    </div>
  );
});

FoldTopRight.displayName = 'FoldTopRight';
export default FoldTopRight;
