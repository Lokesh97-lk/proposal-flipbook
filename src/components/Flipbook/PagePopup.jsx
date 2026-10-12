import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function PagePopup({ popup, onClose, onPlayClick }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Gentle entrance with a slight float-up
    if (overlayRef.current && cardRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, delay: 0.1, ease: 'power2.out' }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 16, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.15, ease: 'back.out(1.2)' }
      );
    }
  }, []);

  const handleClose = () => {
    if (onPlayClick) onPlayClick();

    if (overlayRef.current && cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.96,
        duration: 0.3,
        ease: 'power2.in'
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.05,
        ease: 'power2.in',
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  if (!popup) return null;

  return (
    <div
      ref={overlayRef}
      className="page-popup-overlay"
      role="dialog"
      aria-label="Personal Note"
    >
      <div ref={cardRef} className="page-popup-card">
        {/* 'X' Close button in top-right */}
        <button
          className="page-popup-close-btn"
          onClick={handleClose}
          aria-label="Close message"
          autoFocus
        >
          ×
        </button>

        {/* Central Content Area (Safely centered within paper artwork) */}
        <div className="page-popup-center-content">
          {/* Decorative Tag */}
          {popup.tag && (
            <div className="page-popup-tag">
              ✦ {popup.tag} ✦
            </div>
          )}

          {/* Tamil Message */}
          <p className="page-popup-tamil-text">
            &ldquo;{popup.tamilText}&rdquo;
          </p>

          {/* English Meaning Hint */}
          {popup.englishHint && (
            <p className="page-popup-english-hint">
              {popup.englishHint}
            </p>
          )}

          {/* Continue Button */}
          <button
            className="page-popup-continue-btn"
            onClick={handleClose}
          >
            CONTINUE READING →
          </button>
        </div>
      </div>
    </div>
  );
}
