import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { introData } from '../../data/intro';

export default function FirstPopup({ onClose, onPlayClick }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Gentle entrance with a slight float-up
    if (overlayRef.current && cardRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 18, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, delay: 0.1, ease: 'back.out(1.2)' }
      );
    }
  }, []);

  const handleDismiss = () => {
    if (onPlayClick) onPlayClick();

    if (overlayRef.current && cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: -12,
        scale: 0.96,
        duration: 0.35,
        ease: 'power2.in'
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.35,
        delay: 0.05,
        ease: 'power2.in',
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  const popup = introData.firstPopup;

  return (
    <div
      ref={overlayRef}
      className="page-popup-overlay first-popup-overlay"
      role="dialog"
      aria-label="First message"
      tabIndex={-1}
    >
      <div
        ref={cardRef}
        className="first-popup-card page-popup-card"
      >
        {/* '×' Close button in top right dismisses popup */}
        <button
          className="first-popup-close-btn page-popup-close-btn"
          onClick={handleDismiss}
          aria-label={popup.closeLabel || "Close message"}
          autoFocus
        >
          ×
        </button>

        {/* Central Content Area (Safely away from butterfly, sunflower, and eucalyptus) */}
        <div className="first-message-center-content page-popup-center-content">
          {/* Delicate Tag / Title */}
          <div className="first-popup-tag page-popup-tag">
            ✦ {popup.title || "How to Read · வாசிக்கும் வரிசை"} ✦
          </div>

          {/* Main 7 Months Silence Confession Message */}
          <p className="first-popup-confession-text">
            &ldquo;{popup.message}&rdquo;
          </p>

          {/* Step-by-step Reading Order */}
          {popup.orderSteps && popup.orderSteps.length > 0 && (
            <div className="popup-reading-order-card">
              <div className="popup-reading-order-title">
                {popup.orderPrompt || "Please read in this special order:"}
              </div>

              <div className="popup-reading-order-steps">
                {popup.orderSteps.map((stepItem, idx) => (
                  <div
                    key={idx}
                    className={`popup-reading-step-row ${stepItem.isFinal ? 'step-row-final' : ''}`}
                  >
                    <span className={`popup-step-badge ${stepItem.isFinal ? 'badge-final' : ''}`}>
                      {stepItem.step}
                    </span>
                    <span className="popup-step-icon">{stepItem.symbol}</span>
                    <div className="popup-step-info">
                      <span className="popup-step-name">{stepItem.title}</span>
                      {stepItem.tamilTitle && (
                        <span className="popup-step-tamil"> · {stepItem.tamilTitle}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button: CONTINUE READING → */}
          <button
            className="first-popup-next-btn page-popup-continue-btn"
            onClick={handleDismiss}
          >
            {popup.buttonLabel || "CONTINUE READING →"}
          </button>

          {/* Tamil transliteration note */}
          {popup.tamilText && (
            <p className="first-popup-tamil-subtext">
              {popup.tamilText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
