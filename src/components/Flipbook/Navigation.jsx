import PageNumber from './PageNumber';

export default function Navigation({
  currentPage,
  totalPages,
  canGoNext,
  canGoPrev,
  onNext,
  onPrev,
  onContinue
}) {
  const isLastPage = currentPage === totalPages;

  return (
    <div className="page-footer">
      <div className="page-nav-controls">
        <button
          className="nav-link-btn"
          onClick={onPrev}
          disabled={!canGoPrev}
          aria-label="Previous page"
        >
          ← PREVIOUS
        </button>

        {!isLastPage ? (
          <button
            className="nav-link-btn"
            onClick={onNext}
            disabled={!canGoNext}
            aria-label="Next page"
          >
            NEXT →
          </button>
        ) : (
          <button
            className="nav-link-btn"
            onClick={onContinue}
            style={{ color: 'var(--wax-red)', fontWeight: 600 }}
            aria-label="Continue to proposal"
          >
            CONTINUE →
          </button>
        )}
      </div>

      <PageNumber current={currentPage} total={totalPages} />
    </div>
  );
}
