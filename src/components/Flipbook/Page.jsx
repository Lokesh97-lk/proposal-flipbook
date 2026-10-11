import { useRef } from 'react';
import Navigation from './Navigation';
import PaperTexture from '../Paper/PaperTexture';
import PaperCorner from '../Paper/PaperCorner';

export default function Page({
  children,
  currentPage,
  totalPages,
  canGoNext,
  canGoPrev,
  onNext,
  onPrev,
  onContinue
}) {
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0 && canGoNext) {
        onNext();
      } else if (diff > 0 && canGoPrev) {
        onPrev();
      } else if (diff < 0 && !canGoNext && onContinue) {
        onContinue();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="page-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <PaperTexture />
      <PaperCorner position="bottom-right" />

      {/* Main Page Content Body */}
      <div style={{ flex: 1, position: 'relative', zIndex: 12 }}>
        {children}
      </div>

      {/* Page Navigation & Counter Footer */}
      <Navigation
        currentPage={currentPage}
        totalPages={totalPages}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        onNext={onNext}
        onPrev={onPrev}
        onContinue={onContinue}
      />
    </div>
  );
}
