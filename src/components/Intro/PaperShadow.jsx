import { forwardRef } from 'react';

const PaperShadow = forwardRef(({ isHovered = false }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        bottom: '-55px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '78%',
        height: '42px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 75%)',
        filter: isHovered ? 'blur(34px)' : 'blur(26px)',
        opacity: isHovered ? 0.75 : 0.5,
        transition: 'filter 0.4s ease, opacity 0.4s ease',
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  );
});

PaperShadow.displayName = 'PaperShadow';
export default PaperShadow;
