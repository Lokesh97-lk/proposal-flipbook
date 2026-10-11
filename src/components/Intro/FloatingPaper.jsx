import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import PaperShadow from './PaperShadow';
import IntroText from './IntroText';
import Particles from '../Effects/Particles';
import SafeImage from '../UI/SafeImage';

export default function FloatingPaper({ onClick, onHoverChange }) {
  const paperRef = useRef(null);
  const shadowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const paper = paperRef.current;
    const shadow = shadowRef.current;
    if (!paper || !shadow) return;

    // Levitation floating timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(paper, {
      y: -14,
      rotateZ: 1.2,
      rotateX: 2.5,
      duration: 3.2,
      ease: 'sine.inOut'
    });

    gsap.to(shadow, {
      scaleX: 0.88,
      scaleY: 0.88,
      opacity: 0.42,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(shadow);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHoverChange) onHoverChange(true);
    gsap.to(paperRef.current, {
      scale: 1.05,
      rotateX: 6,
      rotateY: -3,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onHoverChange) onHoverChange(false);
    gsap.to(paperRef.current, {
      scale: 1.0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <div
      style={{
        position: 'relative',
        width: 'var(--letter-folded-width, 320px)',
        height: 'var(--letter-folded-height, 240px)',
        perspective: '1400px',
        transformStyle: 'preserve-3d',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <IntroText position="top" />

      {/* The Floating Folded Paper Sheet */}
      <div
        ref={paperRef}
        className="paper-sheet"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '24px',
          backgroundColor: '#faf5eb',
          boxShadow: isHovered
            ? '0 25px 60px -10px rgba(0,0,0,0.65), 0 10px 25px rgba(0,0,0,0.4), inset 0 0 35px rgba(180,150,110,0.2)'
            : '0 15px 40px -10px rgba(0,0,0,0.5), 0 6px 16px rgba(0,0,0,0.25), inset 0 0 30px rgba(180,150,110,0.15)',
          transition: 'box-shadow 0.4s ease',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Crease line across folded sheet */}
        <div className="crease-horizontal" />
        <div className="crease-vertical" />

        {/* Wax Seal Centered */}
        <div
          className="wax-seal"
          style={{
            marginBottom: '14px',
            transform: isHovered ? 'scale(1.08)' : 'scale(1.0)',
            transition: 'transform 0.3s ease'
          }}
        >
          <SafeImage
            src="/images/intro/seal.png"
            alt="Wax Seal"
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          />
        </div>

        {/* Elegant Handwritten Instruction */}
        <p
          className="font-script"
          style={{
            fontSize: '1.85rem',
            color: 'var(--wax-red)',
            letterSpacing: '0.04em',
            margin: 0,
            textShadow: '0 1px 2px rgba(120, 28, 34, 0.15)',
            transform: 'rotate(-2deg)'
          }}
        >
          OPEN THIS
        </p>

        <span
          className="font-serif"
          style={{
            fontSize: '0.85rem',
            fontStyle: 'italic',
            color: 'var(--ink-secondary)',
            marginTop: '6px',
            opacity: 0.8
          }}
        >
          A handwritten letter awaits
        </span>

        {/* Tiny particle motes on hover */}
        {isHovered && <Particles count={10} color="#e5c07b" />}
      </div>

      <IntroText position="bottom" />
      <PaperShadow ref={shadowRef} isHovered={isHovered} />
    </div>
  );
}
