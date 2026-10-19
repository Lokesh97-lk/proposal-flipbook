import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { indexBooks } from '../../data/indexBooks';
import '../../styles/storyIndex.css';

export default function StoryIndex({
  onSelectBook,
  onReReadIntro,
  onPlayClick
}) {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Gentle staggered entrance for the library collection
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 }
      );
    }

    const validCards = cardsRef.current.filter(Boolean);
    if (validCards.length > 0) {
      tl.fromTo(
        validCards,
        { opacity: 0, y: 22, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
        '-=0.35'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleBookClick = (bookId) => {
    if (onPlayClick) onPlayClick();
    onSelectBook(bookId);
  };

  const handleKeyDown = (e, bookId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleBookClick(bookId);
    }
  };

  return (
    <div className="story-index-screen">
      <div className="story-index-vignette" />

      <div ref={containerRef} className="story-index-container">
        {/* Header Section (Placed to gracefully leave the top-right flying doves visible) */}
        <header ref={headerRef} className="story-index-header">
          <div className="story-index-tag">
            <span>✦</span>
            <span>A Little Universe · எங்கள் சிறிய உலகம்</span>
            <span>✦</span>
          </div>

          <h1 className="story-index-title">
            A Little Universe, Written For You
          </h1>

          <p className="story-index-subtitle">
            Four little stories. One heart behind them.
          </p>
        </header>

        {/* Four Book Destinations */}
        <section
          className="story-index-grid"
          aria-label="Collection of Romantic Books"
        >
          {indexBooks.map((book, idx) => (
            <div
              key={book.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="index-book-card"
              role="button"
              tabIndex={0}
              onClick={() => handleBookClick(book.id)}
              onKeyDown={(e) => handleKeyDown(e, book.id)}
              aria-label={`Open Book ${book.number}: ${book.title} — ${book.tamilTitle}`}
            >
              {/* Book Spine Simulation Accent */}
              <div className="index-book-spine-accent" />

              {/* Top Row: Roman Numeral & Symbol */}
              <div className="index-book-top-row">
                <span className="index-book-number-badge">
                  <span className="index-book-icon-symbol">{book.iconSymbol}</span>
                  <span>Book {book.number} · {book.tamilNumber}</span>
                </span>
                <span className="index-book-open-tag">
                  Open ↗
                </span>
              </div>

              {/* Body: Cameo Artwork & Titles */}
              <div className="index-book-body">
                <div className="index-book-cameo-frame">
                  <img
                    src={book.previewArtwork || book.coverImage}
                    alt={`${book.title} artwork`}
                    className="index-book-cameo-img"
                    draggable="false"
                  />
                </div>

                <div className="index-book-text-info">
                  <h2 className="index-book-title-en">{book.title}</h2>
                  <div className="index-book-title-ta">{book.tamilTitle}</div>
                  <p className="index-book-subtitle">{book.subtitle}</p>
                </div>
              </div>

              {/* Footer Row: Poetic Tamil Teaser & Button */}
              <div className="index-book-footer-row">
                <p className="index-book-tamil-teaser">
                  {book.tamilPoeticIntro}
                </p>

                <span className="index-book-cta-btn" aria-hidden="true">
                  Read 📖
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Footer Whisper & Navigation back to Intro note */}
        <footer className="story-index-footer">
          <p className="story-index-whisper">
            Click any book to open its cover and turn each page at your own pace.
          </p>

          {onReReadIntro && (
            <button
              onClick={() => {
                if (onPlayClick) onPlayClick();
                onReReadIntro();
              }}
              className="story-index-back-btn"
              aria-label="Re-read first letter"
            >
              💌 Re-read first note
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
