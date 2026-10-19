import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { introData } from '../../data/intro';
import { useDayTimer } from '../../utils/dateTimer';

export default function ClickToRead({ onReadLetter, onPlayClick }) {
  const containerRef = useRef(null);
  const timer = useDayTimer(introData.firstPopup.startDate || '2026-03-19');

  useEffect(() => {
    // Gentle fade-in after popup closes
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.15 }
    );
  }, []);

  const handleClick = () => {
    if (onPlayClick) onPlayClick();
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: onReadLetter
    });
  };

  return (
    <div ref={containerRef} className="click-to-read-stage">
      <p className="click-to-read-message">
        &ldquo;I have been watching you in the silence from{' '}
        <span className="first-popup-timer-highlight">{timer.formattedMonthDay}</span>
        , so I express today my feelings towards you.&rdquo;
      </p>

      {introData.clickToRead.prompt && (
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.98rem',
            fontStyle: 'italic',
            color: 'var(--ink-muted)',
            marginBottom: '24px'
          }}
        >
          {introData.clickToRead.prompt}
        </p>
      )}

      <button
        className="click-to-read-btn"
        onClick={handleClick}
        aria-label="Next page"
      >
        {introData.clickToRead.buttonLabel}
      </button>
    </div>
  );
}
