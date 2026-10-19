import '../../styles/bookExperience.css';

/**
 * Top Return Bar & Chapter Badge
 * Positioned cleanly at the top of the readable book.
 */
export function BookTopBar({
  onReturnToIndex,
  bookTitle,
  bookTamilTitle
}) {
  return (
    <header className="book-top-bar">
      <button
        type="button"
        onClick={onReturnToIndex}
        className="book-return-btn"
        aria-label="Return to library collection"
      >
        <span className="book-return-arrow">←</span>
        <span>LIBRARY</span>
      </button>

      <div className="book-chapter-badge">
        <span className="badge-en">{bookTitle}</span>
        {bookTamilTitle && <span className="badge-ta"> · {bookTamilTitle}</span>}
      </div>
    </header>
  );
}

/**
 * Bottom Navigation Footer
 * Positioned strictly at the bottom of the page.
 * Contains Previous, Page Counter, and prominent Next/Finish button.
 */
export function BookBottomNav({
  currentPage,
  totalPages,
  isLastPage,
  isTurning,
  isPersonalLetterBook,
  onNext,
  onPrev,
  onReturnToIndex,
  onFinalAction
}) {
  const formattedCurrent = String(currentPage).padStart(2, '0');
  const formattedTotal = String(totalPages).padStart(2, '0');

  return (
    <footer className="book-bottom-nav">
      {/* Left: Previous page button */}
      <div className="book-nav-col book-nav-col-left">
        <button
          type="button"
          className="book-nav-btn book-nav-btn-prev"
          onClick={onPrev}
          disabled={currentPage <= 1 || isTurning}
          aria-label="Previous page"
        >
          <span className="nav-arrow">←</span>
          <span>PREVIOUS</span>
        </button>
      </div>

      {/* Center: Page Counter */}
      <div className="book-nav-col book-nav-col-center">
        <span className="book-counter-text" aria-live="polite">
          Page {formattedCurrent} of {formattedTotal}
        </span>
      </div>

      {/* Right: Next or Finish action button strictly at bottom right */}
      <div className="book-nav-col book-nav-col-right">
        {!isLastPage ? (
          <button
            type="button"
            className="book-nav-btn book-nav-btn-next"
            onClick={onNext}
            disabled={isTurning}
            aria-label="Next page"
          >
            <span>NEXT</span>
            <span className="nav-arrow">→</span>
          </button>
        ) : isPersonalLetterBook ? (
          <button
            type="button"
            className="book-nav-btn book-nav-btn-next book-nav-btn-finish"
            onClick={onFinalAction}
            disabled={isTurning}
            aria-label="Read final personal message"
          >
            <span>FINAL MESSAGE</span>
            <span className="nav-arrow">→</span>
          </button>
        ) : (
          <button
            type="button"
            className="book-nav-btn book-nav-btn-next book-nav-btn-finish"
            onClick={onFinalAction || onReturnToIndex}
            disabled={isTurning}
            aria-label="Close book and return to library"
          >
            <span>CLOSE BOOK</span>
            <span className="nav-arrow">↺</span>
          </button>
        )}
      </div>
    </footer>
  );
}

// Default export combining both for legacy callers if needed
export default function BookNavigation(props) {
  return (
    <>
      <BookTopBar
        onReturnToIndex={props.onReturnToIndex}
        bookTitle={props.bookTitle}
        bookTamilTitle={props.bookTamilTitle}
      />
      <BookBottomNav {...props} />
    </>
  );
}
