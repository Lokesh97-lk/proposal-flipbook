import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { introData } from '../../data/intro';
import { finalMessageData } from '../../data/finalMessage';
import POVVideoPopup from './POVVideoPopup';

export default function ClosedScene({ onReopen, onPlaySound, onReturnToIndex }) {
  const paperRef = useRef(null);
  const shadowRef = useRef(null);

  // Automatically show the POV Video Popup after the letter finishes closing
  const [showPOVPopup, setShowPOVPopup] = useState(false);

  useEffect(() => {
    // Resting quietly with very subtle breathing float
    const floatAnim = gsap.timeline({ repeat: -1, yoyo: true });
    floatAnim.to(paperRef.current, {
      y: -6,
      rotateZ: 0.5,
      duration: 3.6,
      ease: 'sine.inOut'
    });

    // Reveal the surprise POV video popup after the letter rests
    const timer = setTimeout(() => {
      setShowPOVPopup(true);
    }, 650);

    return () => {
      floatAnim.kill();
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    if (onPlaySound) onPlaySound();
    onReopen();
  };

  const handleOpenPOV = () => {
    if (onPlaySound) onPlaySound();
    setShowPOVPopup(true);
  };

  const handleClosePOV = () => {
    setShowPOVPopup(false);
  };

  const povConfig = finalMessageData.povVideoPopup;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20
      }}
    >
      {/* Resting Folded Letter */}
      <div
        ref={paperRef}
        className="intro-paper-sheet"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Open the letter again"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={introData.coverImage}
          alt={introData.coverAlt}
          className="intro-cover-image"
          draggable="false"
        />
        <div className="paper-deckle-edge" />
      </div>

      <div ref={shadowRef} className="intro-paper-shadow" />

      {/* Action buttons below the resting folded letter */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          marginTop: '28px'
        }}
      >
        {/* Surprise POV Video Pill Button */}
        {povConfig?.enabled !== false && (
          <button
            onClick={handleOpenPOV}
            className="pov-reopen-pill-btn"
            aria-label="Watch POV Video"
          >
            <span>📹</span>
            <span>{povConfig?.reopenButtonText || "( this you on my POV ) 🥺❤️"}</span>
          </button>
        )}

        {/* Replay option */}
        <button
          onClick={handleClick}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-serif)',
            fontSize: '0.8rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            cursor: 'pointer',
            opacity: 0.75,
            transition: 'opacity 0.25s ease, color 0.25s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
        >
          {finalMessageData.reopenButtonText || "OPEN THE LETTER AGAIN"}
        </button>

        {/* Return to Library option */}
        {onReturnToIndex && (
          <button
            onClick={() => {
              if (onPlaySound) onPlaySound();
              onReturnToIndex();
            }}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-serif)',
              fontSize: '0.8rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-secondary)',
              cursor: 'pointer',
              opacity: 0.85,
              transition: 'opacity 0.25s ease, color 0.25s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
          >
            ← RETURN TO LIBRARY / பொருளடக்கம்
          </button>
        )}
      </div>

      {/* Surprise POV Video Pop-up Modal */}
      {showPOVPopup && (
        <POVVideoPopup
          onClose={handleClosePOV}
          onPlayClick={onPlaySound}
        />
      )}
    </div>
  );
}
