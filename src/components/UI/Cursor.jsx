import { useEffect, useState, useRef } from 'react';
import { isTouchDevice } from '../../utils/deviceUtils';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const rippleRef = useRef(null);

  useEffect(() => {
    if (isTouchDevice()) {
      setDisabled(true);
      return;
    }
    setDisabled(false);

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target;
      const isInteractive = !!target.closest('button, a, [data-cursor="pointer"], .paper-sheet, .wax-seal, .polaroid-card');
      setIsHovered(isInteractive);
    };

    const onMouseDown = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  if (disabled) return null;

  return (
    <>
      {/* Central dot cursor */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '28px' : '8px',
          height: isHovered ? '28px' : '8px',
          borderRadius: '50%',
          backgroundColor: isHovered ? 'transparent' : '#e5c07b',
          border: isHovered ? '1.5px solid rgba(229, 192, 123, 0.85)' : 'none',
          boxShadow: isHovered ? '0 0 12px rgba(229, 192, 123, 0.4)' : '0 0 6px rgba(229, 192, 123, 0.6)',
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border 0.2s ease',
          pointerEvents: 'none',
          zIndex: 99999
        }}
      />
      {/* Click ripple */}
      {isClicked && (
        <div
          ref={rippleRef}
          className="ripple-circle"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 99998
          }}
        />
      )}
    </>
  );
}
