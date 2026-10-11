import { forwardRef } from 'react';
import PaperFront from './PaperFront';
import PaperBack from './PaperBack';
import PaperShadow from './PaperShadow';

const Paper = forwardRef(({
  children,
  className = '',
  style = {},
  shadowRef = null,
  showBack = false,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`paper-wrapper ${className}`}
      style={style}
      {...props}
    >
      <PaperFront>
        {children}
      </PaperFront>
      {showBack && <PaperBack />}
      {shadowRef && <PaperShadow ref={shadowRef} />}
    </div>
  );
});

Paper.displayName = 'Paper';
export default Paper;
