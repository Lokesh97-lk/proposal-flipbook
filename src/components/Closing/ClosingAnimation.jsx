import { useRef, useEffect } from 'react';
import FoldBack from './FoldBack';
import PaperShadow from '../Paper/PaperShadow';
import runClosingAnimation from '../../animations/closingAnimation';

export default function ClosingAnimation({ onComplete, onPlaySound }) {
  const containerRef = useRef(null);
  const foldBottomLeftRef = useRef(null);
  const foldTopRightRef = useRef(null);
  const creaseShadowRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    if (onPlaySound) onPlaySound();

    const anim = runClosingAnimation(
      {
        containerRef: containerRef.current,
        foldBottomLeftRef: foldBottomLeftRef.current,
        foldTopRightRef: foldTopRightRef.current,
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
        className="paper-sheet"
        style={{
          position: 'relative',
          width: 'var(--letter-width)',
          height: 'var(--letter-height)',
          perspective: '1400px',
          transformStyle: 'preserve-3d',
          backgroundColor: '#faf5eb',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.65)',
          overflow: 'hidden'
        }}
      >
        {/* Crease shadow deepening */}
        <div
          ref={creaseShadowRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(60,40,20,0.3) 0%, transparent 75%)',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 10
          }}
        />

        {/* 3D Folding Flaps */}
        <FoldBack
          foldTopRightRef={foldTopRightRef}
          foldBottomLeftRef={foldBottomLeftRef}
        />
      </div>

      <PaperShadow ref={shadowRef} />
    </div>
  );
}
