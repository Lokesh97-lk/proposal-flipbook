import { useState, useRef, useCallback } from 'react';
import { pagesData } from '../../data/pages';
import PageRenderer from './PageRenderer';
import PageTurn from './PageTurn';
import PagePopup from './PagePopup';
import useKeyboard from '../../hooks/useKeyboard';

export default function Flipbook({
  currentPage,
  totalPages = 6,
  onNextPage,
  onPrevPage,
  onFinishLetter,
  onPageTurnSound,
  onPlayClick
}) {
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState('next');
  const [turningContent, setTurningContent] = useState(null);
  const [closedPopups, setClosedPopups] = useState({});

  const touchStartX = useRef(null);

  const currentPageData = pagesData[currentPage - 1] || pagesData[0];

  const handleNext = useCallback(() => {
    if (isTurning) return;
    if (currentPage >= totalPages) {
      if (onFinishLetter) onFinishLetter();
      return;
    }
    setTurningContent(<PageRenderer page={pagesData[currentPage - 1]} />);
    setTurnDirection('next');
    setIsTurning(true);
    onNextPage();
  }, [isTurning, currentPage, totalPages, onFinishLetter, onNextPage]);

  const handlePrev = useCallback(() => {
    if (isTurning || currentPage <= 1) return;
    setTurningContent(<PageRenderer page={pagesData[currentPage - 1]} />);
    setTurnDirection('prev');
    setIsTurning(true);
    onPrevPage();
  }, [isTurning, currentPage, onPrevPage]);

  // Keyboard navigation
  useKeyboard({
    onNext: handleNext,
    onPrev: handlePrev,
    onAction: currentPage === totalPages ? onFinishLetter : handleNext,
    enabled: !isTurning
  });

  // Touch swipe support for mobile & tablet
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || isTurning) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) {
        // Swiped left -> next page
        handleNext();
      } else if (diff > 0 && currentPage > 1) {
        // Swiped right -> previous page
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const isLastPage = currentPage === totalPages;
  const formattedPage = String(currentPage).padStart(2, '0');
  const formattedTotal = String(totalPages).padStart(2, '0');

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flipbook-container">
        {/* Main Reading Page */}
        <div className="flipbook-page">
          <PageRenderer page={currentPageData} />

          {/* Special Page Confession Pop-up (Page 2, Page 3, and any upcoming page with a popup) */}
          {currentPageData?.popup && !closedPopups[currentPage] && !isTurning && (
            <PagePopup
              popup={currentPageData.popup}
              onClose={() => setClosedPopups(prev => ({ ...prev, [currentPage]: true }))}
              onPlayClick={onPlayClick || onPageTurnSound}
            />
          )}

          {/* Subtle badge to re-open note if closed while on a page that has a popup */}
          {currentPageData?.popup && closedPopups[currentPage] && !isTurning && (
            <button
              onClick={() => {
                if (onPlayClick) onPlayClick();
                setClosedPopups(prev => ({ ...prev, [currentPage]: false }));
              }}
              className="page2-reopen-note-btn"
              title="Click to view personal note again"
              aria-label="Re-open note"
            >
              <span>💌</span>
              <span>Note</span>
            </button>
          )}

          {/* Discreet Footer with Controls & Counter */}
          <footer className="flipbook-footer">
            <button
              className="nav-link-btn"
              onClick={handlePrev}
              disabled={currentPage <= 1 || isTurning}
              aria-label="Previous page"
            >
              ← PREVIOUS
            </button>

            <span className="page-counter-text">
              {formattedPage} / {formattedTotal}
            </span>

            {!isLastPage ? (
              <button
                className="nav-link-btn nav-link-next"
                onClick={handleNext}
                disabled={isTurning}
                aria-label="Next page"
              >
                NEXT →
              </button>
            ) : (
              <button
                className="nav-link-btn nav-link-next"
                onClick={onFinishLetter}
                disabled={isTurning}
                style={{ fontWeight: 700 }}
                aria-label="Read final message"
              >
                FINAL MESSAGE →
              </button>
            )}
          </footer>
        </div>

        {/* 3D Page Turn Animation Layer */}
        {isTurning && (
          <PageTurn
            direction={turnDirection}
            frontContent={turningContent}
            onComplete={() => setIsTurning(false)}
            onPlaySound={onPageTurnSound}
          />
        )}
      </div>
    </div>
  );
}
