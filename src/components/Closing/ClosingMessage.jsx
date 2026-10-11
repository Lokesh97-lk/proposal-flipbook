import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import proposalData from '../../data/proposal';
import PaperShadow from '../Paper/PaperShadow';
import SafeImage from '../UI/SafeImage';

export default function ClosingMessage({ onReplay, onPlayClick }) {
  const paperRef = useRef(null);
  const shadowRef = useRef(null);
  const messageRef = useRef(null);
  const { ending } = proposalData;

  useEffect(() => {
    // Subtle levitation for the closed folded letter
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(paperRef.current, {
      y: -10,
      rotateZ: 1.0,
      duration: 3.5,
      ease: 'sine.inOut'
    });

    gsap.to(shadowRef.current, {
      scaleX: 0.92,
      scaleY: 0.92,
      opacity: 0.45,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Stagger reveal of ending text lines
    if (messageRef.current) {
      const lines = messageRef.current.querySelectorAll('.ending-line');
      gsap.fromTo(
        lines,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.8,
          ease: 'power2.out',
          delay: 0.5
        }
      );
    }

    return () => {
      tl.kill();
      gsap.killTweensOf(shadowRef.current);
    };
  }, []);

  const handleReplay = () => {
    if (onPlayClick) onPlayClick();
    if (onReplay) onReplay();
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20
      }}
    >
      {/* Centered Closed Paper Envelope */}
      <div
        style={{
          position: 'relative',
          width: 'var(--letter-folded-width, 320px)',
          height: 'var(--letter-folded-height, 240px)',
          perspective: '1400px',
          transformStyle: 'preserve-3d',
          marginBottom: '28px'
        }}
      >
        <div
          ref={paperRef}
          className="paper-sheet"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ece1cc',
            boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(160, 130, 95, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transform: 'rotate(-1deg)'
          }}
        >
          <div className="crease-horizontal" />
          <div className="crease-vertical" />

          {/* Stamped wax seal on the closed letter */}
          <div className="wax-seal" style={{ width: '60px', height: '60px' }}>
            <SafeImage
              src="/images/intro/seal.png"
              alt="Seal"
              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            />
          </div>
        </div>

        <PaperShadow ref={shadowRef} />
      </div>

      {/* Elegant Ending Message Typography */}
      <div
        ref={messageRef}
        style={{
          textAlign: 'center',
          maxWidth: '480px',
          padding: '0 20px',
          color: '#ded8c8'
        }}
      >
        <p
          className="ending-line font-serif"
          style={{
            fontSize: '1.35rem',
            fontStyle: 'italic',
            lineHeight: 1.6,
            color: 'rgba(235, 225, 205, 0.9)'
          }}
        >
          {ending.line1}
        </p>
        <p
          className="ending-line font-serif"
          style={{
            fontSize: '1.35rem',
            fontStyle: 'italic',
            lineHeight: 1.6,
            color: 'rgba(235, 225, 205, 0.9)',
            marginBottom: '16px'
          }}
        >
          {ending.line2}
        </p>

        <p
          className="ending-line font-display"
          style={{
            fontSize: '1.25rem',
            color: '#c9a050',
            letterSpacing: '0.02em',
            margin: '18px 0'
          }}
        >
          {ending.line3}
        </p>

        <p
          className="ending-line font-script"
          style={{
            fontSize: '1.9rem',
            color: 'var(--wax-red)',
            margin: '20px 0 28px'
          }}
        >
          {ending.signature}
        </p>

        <div className="ending-line" style={{ marginTop: '12px' }}>
          <button
            onClick={handleReplay}
            className="continue-btn"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(220, 195, 140, 0.4)',
              color: '#f0ece1',
              boxShadow: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(220, 195, 140, 0.15)';
              e.currentTarget.style.borderColor = '#c9a050';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(220, 195, 140, 0.4)';
            }}
          >
            {ending.replayButton || 'Replay Letter ↺'}
          </button>
        </div>
      </div>
    </div>
  );
}
