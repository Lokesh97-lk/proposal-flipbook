import { useRef, useEffect } from 'react';
import PaperShadow from '../Paper/PaperShadow';
import runOpeningAnimation from '../../animations/openingAnimation';
import { introData } from '../../data/intro';

export default function OpeningAnimation({ onComplete, onPlaySound }) {
  const containerRef = useRef(null);
  const turningCoverRef = useRef(null);
  const curlShadowRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    if (onPlaySound) onPlaySound();

    const anim = runOpeningAnimation(
      {
        containerRef: containerRef.current,
        turningCoverRef: turningCoverRef.current,
        curlShadowRef: curlShadowRef.current,
        shadowRef: shadowRef.current
      },
      onComplete
    );

    return () => {
      if (anim) anim.kill();
    };
  }, [onComplete, onPlaySound]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 25
      }}
    >
      <div
        ref={containerRef}
        className="paper-sheet"
        style={{
          position: 'relative',
          width: 'min(var(--letter-width), 92vw, calc(90vh * 520 / 720))',
          maxHeight: '90vh',
          aspectRatio: '520 / 720',
          perspective: '1600px',
          transformStyle: 'preserve-3d',
          backgroundColor: '#faf5eb',
          backgroundImage: 'url(/images/paper-content-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 25px 65px -12px rgba(0,0,0,0.6), inset 0 0 45px rgba(160,130,90,0.15)',
          overflow: 'hidden'
        }}
      >
        {/* Underneath interior parchment face showing the new message preview */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '48px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            pointerEvents: 'none'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink-rose)',
              marginBottom: '16px',
              opacity: 0.9
            }}
          >
            {introData.firstPopup.title || "To My Dearest"}
          </span>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              fontStyle: 'italic',
              lineHeight: 1.7,
              color: 'var(--ink-primary)',
              maxWidth: '380px',
              marginBottom: '14px'
            }}
          >
            &ldquo;{introData.firstPopup.message}&rdquo;
          </p>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.95rem',
              color: 'var(--ink-muted)',
              fontStyle: 'italic'
            }}
          >
            {introData.firstPopup.prompt}
          </p>
        </div>

        {/* The 3D Turning Title Page Cover Leaf */}
        <div
          ref={turningCoverRef}
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            zIndex: 20
          }}
        >
          {/* Front of Turning Leaf (Title Page) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              backgroundColor: '#faf5eb',
              borderRadius: '4px',
              overflow: 'hidden'
            }}
          >
            <img
              src={introData.coverImage}
              alt={introData.coverAlt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              draggable="false"
            />
            {/* Dynamic Curl Shadow */}
            <div
              ref={curlShadowRef}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%)',
                pointerEvents: 'none',
                opacity: 0
              }}
            />
          </div>

          {/* Back of Turning Leaf (Inner Left Cover) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#ede3cf',
              backgroundImage: 'url(/images/paper-content-bg.jpg)',
              backgroundSize: 'cover',
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              boxShadow: 'inset 0 0 35px rgba(100, 75, 50, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                fontStyle: 'italic',
                color: 'rgba(120, 90, 60, 0.4)'
              }}
            >
              ✦
            </div>
          </div>
        </div>

        {/* Paper Deckle Border */}
        <div className="paper-deckle-edge" />
        <div className="paper-crease-overlay" />
      </div>

      <PaperShadow ref={shadowRef} />
    </div>
  );
}
