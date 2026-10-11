import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ progress = 0, isLoaded = false, onFinished }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isLoaded && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          if (onFinished) onFinished();
        }
      });
    }
  }, [isLoaded, onFinished]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#07090e',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        color: '#f0ece1',
        pointerEvents: isLoaded ? 'none' : 'all'
      }}
    >
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          border: '1.5px solid rgba(200, 160, 100, 0.3)',
          borderTopColor: '#c9a050',
          animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite'
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontStyle: 'italic',
            letterSpacing: '0.04em',
            color: '#ded8c8'
          }}
        >
          Preparing something special...
        </p>
        <div
          style={{
            width: '180px',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            marginTop: '16px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#c9a050',
              transition: 'width 0.4s ease'
            }}
          />
        </div>
      </div>
    </div>
  );
}
