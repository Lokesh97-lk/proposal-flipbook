import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { introData } from '../../data/intro';
import { finalMessageData } from '../../data/finalMessage';

export default function ClosedScene({ onReopen, onPlaySound }) {
  const paperRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    // Resting quietly with very subtle breathing float
    const floatAnim = gsap.timeline({ repeat: -1, yoyo: true });
    floatAnim.to(paperRef.current, {
      y: -6,
      rotateZ: 0.5,
      duration: 3.6,
      ease: 'sine.inOut'
    });

    return () => {
      floatAnim.kill();
    };
  }, []);

  const handleClick = () => {
    if (onPlaySound) onPlaySound();
    onReopen();
  };

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

      {/* Subtle replay option */}
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
          marginTop: '32px',
          cursor: 'pointer',
          opacity: 0.7,
          transition: 'opacity 0.25s ease, color 0.25s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
      >
        {finalMessageData.reopenButtonText || "OPEN THE LETTER AGAIN"}
      </button>
    </div>
  );
}
