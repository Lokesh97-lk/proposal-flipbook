import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { introData } from '../../data/intro';

export default function FirstPopup({ onClose, onNext, onPlayClick }) {
  const popupRef = useRef(null);

  useEffect(() => {
    // Fade in gently with a slight upward movement
    gsap.fromTo(
      popupRef.current,
      { opacity: 0, y: 16, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' }
    );
  }, []);

  const handleNext = () => {
    if (onPlayClick) onPlayClick();
    gsap.to(popupRef.current, {
      opacity: 0,
      y: -10,
      scale: 0.98,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        if (onNext) onNext();
        else if (onClose) onClose();
      }
    });
  };

  const handleClose = () => {
    if (onPlayClick) onPlayClick();
    gsap.to(popupRef.current, {
      opacity: 0,
      y: -8,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: onClose
    });
  };

  const popup = introData.firstPopup;

  return (
    <div className="popup-overlay-container">
      <div
        ref={popupRef}
        className="first-popup-card"
        role="dialog"
        aria-label="First message"
        tabIndex={-1}
      >
        {/* Subtle decorative inner border */}
        <div className="popup-card-inner-border" />

        {/* Small X close button in top right */}
        <button
          className="first-popup-close-btn"
          onClick={handleClose}
          aria-label={popup.closeLabel || "Close message"}
        >
          ×
        </button>

        {/* Delicate Tag / Title */}
        <div className="first-popup-tag">
          {popup.title || "To My Dearest"}
        </div>

        {/* Main 7 Months Silence Confession Message */}
        <p className="first-popup-confession-text">
          &ldquo;{popup.message}&rdquo;
        </p>

        {/* Prompt to click next */}
        <p className="first-popup-prompt-text">
          {popup.prompt || "Please click next to see what is waiting..."}
        </p>

        {/* Action Button: NEXT → */}
        <button
          className="first-popup-next-btn"
          onClick={handleNext}
          autoFocus
        >
          {popup.buttonLabel || "NEXT →"}
        </button>

        {/* Optional Tamil transliteration note */}
        {popup.tamilText && (
          <p className="first-popup-tamil-subtext">
            {popup.tamilText}
          </p>
        )}
      </div>
    </div>
  );
}
