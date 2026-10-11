import { forwardRef } from 'react';

const PaperShadow = forwardRef(({ className = '', style = {} }, ref) => {
  return (
    <div
      ref={ref}
      className={`paper-shadow-drop ${className}`}
      style={style}
    />
  );
});

PaperShadow.displayName = 'PaperShadow';
export default PaperShadow;
