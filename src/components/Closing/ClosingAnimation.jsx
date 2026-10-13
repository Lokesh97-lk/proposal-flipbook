import { useRef, useEffect } from 'react';
import PaperShadow from '../Paper/PaperShadow';
import runClosingAnimation from '../../animations/closingAnimation';
import { finalMessageData } from '../../data/finalMessage';
import { introData } from '../../data/intro';

export default function ClosingAnimation({ onComplete, onPlaySound }) {
  const containerRef = useRef(null);
  const topFlapRef = useRef(null);
  const topFlapShadowRef = useRef(null);
  const bottomShadowRef = useRef(null);
  const coverRevealRef = useRef(null);
  const creaseShadowRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    if (onPlaySound) onPlaySound();

    const anim = runClosingAnimation(
      {
        containerRef: containerRef.current,
        topFlapRef: topFlapRef.current,
        topFlapShadowRef: topFlapShadowRef.current,
        bottomShadowRef: bottomShadowRef.current,
        coverRevealRef: coverRevealRef.current,
        creaseShadowRef: creaseShadowRef.current,
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
        className="paper-sheet paper-closing-sheet"
        style={{
          position: 'relative',
          width: 'min(var(--letter-width), 92vw, calc(90vh * 520 / 720))',
          maxHeight: '90vh',
          aspectRatio: '520 / 720',
          perspective: '1800px',
          transformStyle: 'preserve-3d',
          backgroundColor: '#faf5eb',
          backgroundImage: 'url(/images/paper-content-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 25px 65px -12px rgba(0,0,0,0.6), inset 0 0 45px rgba(160,130,90,0.15)',
          overflow: 'hidden'
        }}
      >
        <div className="paper-deckle-edge" />

        {/* BOTTOM HALF (Contains lower message & signature) */}
        <div
          className="closing-half closing-bottom-half"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50%',
            overflow: 'hidden',
            backgroundImage: 'url(/images/paper-content-bg.jpg)',
            backgroundSize: '100% 200%',
            backgroundPosition: 'bottom center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '18px 24px',
            textAlign: 'center'
          }}
        >
          {/* Highlighted Quote Line */}
          {finalMessageData.highlightedLine && (
            <p
              className="highlighted-line"
              style={{
                fontSize: 'clamp(0.92rem, 2vw, 1.12rem)',
                margin: '10px auto 14px auto',
                padding: '8px 14px',
                textAlign: 'center'
              }}
            >
              {finalMessageData.highlightedLine}
            </p>
          )}

          {/* Signature Wrapper (by end as same) */}
          <div className="final-signature-wrapper" style={{ margin: '8px auto 0 auto' }}>
            {finalMessageData.thankYouText && (
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-secondary)',
                  fontWeight: 600
                }}
              >
                {finalMessageData.thankYouText}
              </span>
            )}
            {finalMessageData.signatureImage && (
              <img
                src={finalMessageData.signatureImage}
                alt="Signature"
                className="final-signature-img"
                style={{ maxHeight: '42px' }}
                draggable="false"
              />
            )}
            {finalMessageData.signatureText && (
              <span className="final-signature-text" style={{ fontSize: '1.25rem' }}>
                {finalMessageData.signatureText}
              </span>
            )}
          </div>

          {/* Dynamic shadow overlay falling onto bottom half during folding */}
          <div
            ref={bottomShadowRef}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(40, 25, 15, 0.55) 0%, rgba(40, 25, 15, 0.15) 60%, transparent 100%)',
              opacity: 0,
              pointerEvents: 'none',
              zIndex: 10
            }}
          />
        </div>

        {/* TOP HALF (3D Folding Flap across the horizontal center crease) */}
        <div
          ref={topFlapRef}
          className="closing-half closing-top-flap"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            zIndex: 15
          }}
        >
          {/* Front Face: Upper message content */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              backgroundImage: 'url(/images/paper-content-bg.jpg)',
              backgroundSize: '100% 200%',
              backgroundPosition: 'top center',
              padding: '28px 24px 12px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              overflow: 'hidden'
            }}
          >
            {finalMessageData.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="page-paragraph"
                style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
                  marginBottom: '10px',
                  textAlign: 'center',
                  maxWidth: '420px'
                }}
              >
                {p}
              </p>
            ))}

            {/* Dynamic crease shadow on top face */}
            <div
              ref={topFlapShadowRef}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 30%, rgba(40, 25, 15, 0.6) 100%)',
                opacity: 0,
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Back Face: Folded outer parchment */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'rotateX(180deg)',
              backfaceVisibility: 'hidden',
              backgroundColor: '#ece1cc',
              backgroundImage: 'url(/images/paper-content-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'inset 0 0 35px rgba(100, 75, 50, 0.25)',
              borderBottom: '2px solid rgba(130, 95, 60, 0.35)',
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
                color: 'rgba(120, 90, 60, 0.45)',
                userSelect: 'none'
              }}
            >
              ✦
            </div>
          </div>
        </div>

        {/* Center Crease Shadow */}
        <div
          ref={creaseShadowRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '6px',
            marginTop: '-3px',
            background: 'linear-gradient(to bottom, rgba(40,25,15,0.4) 0%, rgba(40,25,15,0.65) 50%, rgba(40,25,15,0.2) 100%)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 16
          }}
        />

        {/* Closed Folded Cover (Seamless transition into ClosedScene) */}
        <div
          ref={coverRevealRef}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            zIndex: 20,
            pointerEvents: 'none',
            backgroundColor: '#faf5eb'
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
          <div className="paper-deckle-edge" />
        </div>
      </div>

      <PaperShadow ref={shadowRef} />
    </div>
  );
}
