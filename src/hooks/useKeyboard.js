import { useEffect } from 'react';

/**
 * useKeyboard hook
 * Handles keyboard navigation (ArrowRight, ArrowLeft, Space, Escape)
 */
export function useKeyboard({ onNext, onPrev, onAction, onEscape, enabled = true }) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      // Don't trigger if user is interacting with form inputs
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          if (onNext) onNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (onPrev) onPrev();
          break;
        case ' ': // Spacebar
          e.preventDefault();
          if (onAction) onAction();
          else if (onNext) onNext();
          break;
        case 'Escape':
          e.preventDefault();
          if (onEscape) onEscape();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onAction, onEscape, enabled]);
}

export default useKeyboard;
