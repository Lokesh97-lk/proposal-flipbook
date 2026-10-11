import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { introData } from '../../data/intro';

export default function IntroCover({ onOpen, onPlaySound }) {
  const paperRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const paper = paperRef.current;
    const shadow = shadowRef.current;
    if (!paper || !shadow) return;

    // Very slight, gentle floating movement
    const floatAnim = gsap.timeline({ repeat: -1, yoyo: true });
    floatAnim.to(paper, {
      y: -10,
      rotateZ: 0.8,
      duration: 3.4,
      ease: 'sine.inOut'
    });

    const shadowAnim = gsap.to(shadow, {
      scaleX: 0.9,
      scaleY: 0.9,
      opacity: 0.38,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    return () => {
      floatAnim.kill();
      shadowAnim.kill();
    };
  }, []);

  const handleClick = () => {
    if (onPlaySound) onPlaySound();
    onOpen();
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
      {/* Floating Paper with Handmade Swan Cover */}
      <div
        ref={paperRef}
        className="intro-paper-sheet"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={introData.coverTooltip || "Open the letter"}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <img
          src={introData.coverImage}
          alt={introData.coverAlt}
          className="intro-cover-image"
          draggable="false"
        />

        {/* Subtle physical paper deckle and inner edge border */}
        <div className="paper-deckle-edge" />
      </div>

      {/* Realistic soft shadow underneath */}
      <div ref={shadowRef} className="intro-paper-shadow" />

      {/* Discreet whisper text below */}
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.85rem',
          fontStyle: 'italic',
          letterSpacing: '0.12em',
          color: 'var(--ink-muted)',
          marginTop: '28px',
          opacity: 0.75,
          pointerEvents: 'none'
        }}
      >
        {introData.coverTooltip}
      </p>
    </div>
  );
}
