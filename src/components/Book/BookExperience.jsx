import { useState, useRef, useCallback } from 'react';
import { getBookById } from '../../data/indexBooks';
import BookCover from './BookCover';
import BookPage from './BookPage';
import { BookTopBar, BookBottomNav } from './BookNavigation';
import PageTurn from '../Flipbook/PageTurn';
import useKeyboard from '../../hooks/useKeyboard';
import '../../styles/bookExperience.css';

export default function BookExperience({
  bookId,
  onReturnToIndex,
  onOpenFinalMessage,
  onPlayPageTurn,
  onPlayPaperOpen,
  onPlayClick
}) {
  const book = getBookById(bookId);
  const bookData = book?.bookData || {};

  // Construct page array based on book type
  const isPersonalLetterBook = Boolean(bookData.isPersonalLetterBook);
  const pages = (bookData.pages && bookData.pages.length > 0)
    ? bookData.pages
    : isPersonalLetterBook
      ? [bookData.introPoemPage, ...(bookData.letterPages || [])].filter(Boolean)
      : (bookData.pages || []);

  const totalPages = pages.length;

  // Book State
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState('next');
  const [turningContent, setTurningContent] = useState(null);
  const [closedPopups, setClosedPopups] = useState({});

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const currentPageData = pages[currentPage - 1] || pages[0];
  const isPopupOpen = Boolean(currentPageData?.popup && !closedPopups[currentPage] && !isTurning);
  const isLastPage = currentPage === totalPages;

  // Check if current book or page has landscape aspect ratio (e.g. My Moon 1536x1024)
  const isLandscape = Boolean(
    bookData?.isLandscape ||
    currentPageData?.isLandscape ||
    (currentPageData?.background && currentPageData.background.includes('/moon/'))
  );

  // Check if current book has slim portrait 9:16 aspect ratio (For You book 941x1672)
  const isSlimPortrait = Boolean(
    bookData?.isSlimPortrait ||
    bookData?.aspectRatio === '941 / 1672' ||
    currentPageData?.isSlimPortrait ||
    currentPageData?.aspectRatio === '941 / 1672' ||
    (currentPageData?.background && currentPageData.background.includes('/for-you/'))
  );

  // Open the book cover
  const handleOpenCover = useCallback(() => {
    setIsCoverOpen(true);
    setCurrentPage(1);
  }, []);

  // Next Page Handler
  const handleNext = useCallback(() => {
    if (isTurning || currentPage >= totalPages) return;
    setTurningContent(<BookPage page={pages[currentPage - 1]} />);
    setTurnDirection('next');
    setIsTurning(true);
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }, [isTurning, currentPage, totalPages, pages]);

  // Previous Page Handler
  const handlePrev = useCallback(() => {
    if (isTurning || currentPage <= 1) return;
    setTurningContent(<BookPage page={pages[currentPage - 2] || pages[0]} />);
    setTurnDirection('prev');
    setIsTurning(true);
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, [isTurning, currentPage, pages]);

  // Final Action Handler
  const handleFinalAction = useCallback(() => {
    if (isTurning) return;
    if (onPlayClick) onPlayClick();

    if (isPersonalLetterBook && onOpenFinalMessage) {
      onOpenFinalMessage();
    } else {
      onReturnToIndex();
    }
  }, [isTurning, onPlayClick, isPersonalLetterBook, onOpenFinalMessage, onReturnToIndex]);

  // Keyboard navigation
  useKeyboard({
    onNext: isCoverOpen && currentPage < totalPages ? handleNext : null,
    onPrev: isCoverOpen && currentPage > 1 ? handlePrev : null,
    onEscape: () => {
      if (isPopupOpen) {
        setClosedPopups((prev) => ({ ...prev, [currentPage]: true }));
      } else {
        onReturnToIndex();
      }
    },
    enabled: isCoverOpen && !isTurning && !isPopupOpen
  });

  // Touch Swipe for mobile devices
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || isTurning || isPopupOpen || !isCoverOpen) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - (touchStartY.current ?? 0);

    // Dominant horizontal swipe
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0 && currentPage < totalPages) {
        handleNext();
      } else if (diffX > 0 && currentPage > 1) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="book-experience-stage"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`book-stage-container ${isLandscape ? 'landscape-book' : ''} ${isSlimPortrait ? 'slim-portrait-book' : ''}`}>
        {/* STAGE A: COVER SCREEN (Hinges open when clicked) */}
        {!isCoverOpen ? (
          <BookCover
            bookData={bookData}
            isLandscape={isLandscape}
            isSlimPortrait={isSlimPortrait}
            onOpenBook={handleOpenCover}
            onReturnToIndex={onReturnToIndex}
            onPlaySound={onPlayPaperOpen || onPlayClick}
          />
        ) : (
          /* STAGE B: INTERIOR READABLE PAGES */
          <div className={`book-interior-page ${isLandscape ? 'landscape-page' : ''} ${isSlimPortrait ? 'slim-portrait-page' : ''}`}>
            {/* 1. TOP BAR: Return to Library + Title Badge */}
            <BookTopBar
              onReturnToIndex={onReturnToIndex}
              bookTitle={bookData.title}
              bookTamilTitle={bookData.tamilTitle}
            />

            {/* 2. PAGE CONTENT BODY: Fits the artwork and text cleanly */}
            <div className="book-page-body-container">
              <BookPage
                page={currentPageData}
                isPopupOpen={isPopupOpen}
                onClosePopup={() => setClosedPopups((prev) => ({ ...prev, [currentPage]: true }))}
                onReopenPopup={() => setClosedPopups((prev) => ({ ...prev, [currentPage]: false }))}
                onPlaySound={onPlayClick || onPlayPageTurn}
              />
            </div>

            {/* 3. BOTTOM NAVIGATION: Strictly anchored at the bottom of the page */}
            <BookBottomNav
              currentPage={currentPage}
              totalPages={totalPages}
              isLastPage={isLastPage}
              isTurning={isTurning}
              isPersonalLetterBook={isPersonalLetterBook}
              onNext={handleNext}
              onPrev={handlePrev}
              onReturnToIndex={onReturnToIndex}
              onFinalAction={handleFinalAction}
            />

            {/* 3D Page Turn Animation Layer */}
            {isTurning && (
              <PageTurn
                direction={turnDirection}
                frontContent={turningContent}
                onComplete={() => setIsTurning(false)}
                onPlaySound={onPlayPageTurn}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
