import { useRef, useEffect } from 'react';
import runPageTurnAnimation from '../../animations/pageTurnAnimation';

export default function PageTurn({
  direction = 'next',
  frontContent,
  onComplete,
  onPlaySound
}) {
  const leafRef = useRef(null);
  const curlShadowRef = useRef(null);

  useEffect(() => {
    if (onPlaySound) onPlaySound();

    const anim = runPageTurnAnimation(
      leafRef.current,
      curlShadowRef.current,
      direction,
      onComplete
    );

    return () => {
      if (anim) anim.kill();
    };
  }, [direction, onComplete, onPlaySound]);

  return (
    <div ref={leafRef} className="page-leaf-turning">
      {/* Front Face of Turning Leaf */}
      <div className="page-leaf-front" style={{ backgroundColor: '#faf5eb' }}>
        <div style={{ position: 'relative', zIndex: 5, width: '100%', height: '100%' }}>
          {frontContent}
        </div>
        <div ref={curlShadowRef} className="page-curl-shadow" />
      </div>

      {/* Back Face of Turning Leaf */}
      <div className="page-leaf-back" style={{ backgroundColor: '#ede3cf' }}>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: 'rgba(120, 90, 60, 0.35)',
            letterSpacing: '0.1em'
          }}
        >
          ✦
        </div>
      </div>
    </div>
  );
}
