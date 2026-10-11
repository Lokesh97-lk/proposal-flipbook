import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { introData } from '../../data/intro';

export default function OpenedPaperScene({ onStartReading, onPlayClick }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Smooth, gentle entrance animation
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power2.out' }
      );
    }
  }, []);

  const handleNext = () => {
    if (onPlayClick) onPlayClick();
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: -12,
        scale: 0.97,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: onStartReading
      });
    } else {
      onStartReading();
    }
  };

  const content = introData.firstPopup;

  return (
    <div ref={containerRef} className="opened-paper-scene-container">
      <div ref={cardRef} className="first-message-page-sheet">
        {/* Subtle deckle border & crease */}
        <div className="paper-deckle-edge" />
        <div className="paper-crease-overlay" />

        {/* 'x' button proceeds forward into the flipbook instead of closing into a blank void */}
        <button
          className="first-message-close-btn"
          onClick={handleNext}
          title="Continue to letter (Next)"
          aria-label="Continue to letter"
        >
          ×
        </button>

        {/* Central Content Area (Safely away from butterfly, sunflower, and eucalyptus) */}
        <div className="first-message-center-content">
          <div className="first-message-tag">
            ✦ {content.title || "TO MY DEAREST"} ✦
          </div>

          <p className="first-message-text">
            &ldquo;{content.message}&rdquo;
          </p>

          <p className="first-message-prompt">
            {content.prompt || "Please click next to see what is waiting..."}
          </p>

          <button
            className="first-message-next-btn"
            onClick={handleNext}
            autoFocus
          >
            {content.buttonLabel || "NEXT →"}
          </button>
        </div>
      </div>
    </div>
  );
}
