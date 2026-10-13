import { useState, useEffect, useRef, useCallback } from 'react';
import '../../styles/FlowerWordAnimation.css';

/**
 * Photorealistic Cinematic Flower Sequence
 * Matches reference sequence:
 * 1. Pink Rose (magenta-rose)
 * 2. Yellow Flower (golden-yellow)
 * 3. Pale Rose (white-rose)
 * 4. Orange-Red Flower (orange-red)
 * 5. Green Spherical Flower (green-spherical)
 * 6. White Lily (white-lily)
 * Total duration: 6 x 1833ms = 11,000ms (~11 seconds loop)
 */
export const DEFAULT_FLOWER_SEQUENCE = [
  {
    id: 'magenta-rose',
    name: 'Pink Rose',
    src: '/images/flowers/magenta-rose.jpg',
    duration: 1833
  },
  {
    id: 'golden-yellow',
    name: 'Yellow Flower',
    src: '/images/flowers/golden-yellow.jpg',
    duration: 1833
  },
  {
    id: 'white-rose',
    name: 'Pale Rose',
    src: '/images/flowers/white-rose.jpg',
    duration: 1833
  },
  {
    id: 'orange-red',
    name: 'Orange-Red Flower',
    src: '/images/flowers/orange-red.jpg',
    duration: 1833
  },
  {
    id: 'green-spherical',
    name: 'Green Spherical Flower',
    src: '/images/flowers/green-spherical.jpg',
    duration: 1833
  },
  {
    id: 'white-lily',
    name: 'White Lily',
    src: '/images/flowers/white-lily.jpg',
    duration: 1833
  }
];

export default function FlowerWordAnimation({
  flowers = DEFAULT_FLOWER_SEQUENCE,
  onProceed,
  onPlayClick
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef(null);

  // 1. Preload all photographic frames for instant zero-latency transitions
  useEffect(() => {
    flowers.forEach((flower) => {
      const img = new Image();
      img.src = flower.src;
    });
  }, [flowers]);

  // 2. Continuous 11-second cinematic loop through the 6 flowers
  useEffect(() => {
    const isReduced = typeof window !== 'undefined' && 
      window.matchMedia && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) return;

    const currentDuration = flowers[currentIndex]?.duration || 1833;

    const timer = setTimeout(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % flowers.length);
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [currentIndex, flowers]);

  // 3. User interaction to proceed into the proposal flipbook
  const handleProceed = useCallback((e) => {
    if (e) e.stopPropagation();
    if (isExiting) return;
    if (onPlayClick) onPlayClick();

    setIsExiting(true);

    if (containerRef.current) {
      containerRef.current.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      containerRef.current.style.opacity = '0';
    }

    setTimeout(() => {
      if (onProceed) onProceed();
    }, 600);
  }, [isExiting, onPlayClick, onProceed]);

  // 4. Keyboard support (Enter, Space, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        handleProceed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleProceed]);

  return (
    <section
      ref={containerRef}
      className="flower-word-section"
      role="region"
      aria-label="Y [FLOWER] U Cinematic Sequence"
      onClick={handleProceed}
      tabIndex={0}
    >
      <div className="flower-cinematic-stage">
        {/* Real photographic road & hand flower sequence */}
        <div className="flower-images-track">
          {flowers.map((flower, idx) => {
            let stateClass = '';
            if (idx === currentIndex) {
              stateClass = 'active';
            } else if (idx === prevIndex) {
              stateClass = 'previous';
            }
            return (
              <img
                key={flower.id}
                src={flower.src}
                alt={flower.name}
                className={`flower-frame-img ${stateClass}`}
                draggable="false"
              />
            );
          })}
        </div>

        {/* Crisp stationary pure white sans-serif typography: Y [FLOWER] U */}
        <div className="flower-word-typography" aria-label="YOU">
          <span className="flower-char char-y" aria-hidden="true">
            Y
          </span>

          {/* Central Gap framing the hand-held center flower */}
          <div className="flower-center-gap" aria-hidden="true" />

          <span className="flower-char char-u" aria-hidden="true">
            U
          </span>
        </div>
      </div>
    </section>
  );
}
