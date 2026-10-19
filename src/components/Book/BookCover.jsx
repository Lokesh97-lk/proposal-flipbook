import { useRef } from 'react';
import gsap from 'gsap';
import '../../styles/bookExperience.css';

export default function BookCover({
  bookData,
  isLandscape = false,
  onOpenBook,
  onReturnToIndex,
  onPlaySound
}) {
  const sheetRef = useRef(null);
  const coverInfo = bookData?.cover || {};

  const handleOpen = () => {
    if (onPlaySound) onPlaySound();

    if (sheetRef.current) {
      // 3D cover hinge opening animation along left spine
      gsap.to(sheetRef.current, {
        rotateY: -110,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.inOut',
        onComplete: onOpenBook
      });
    } else {
      onOpenBook();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div className="book-cover-wrapper">
      <div
        ref={sheetRef}
        className={`book-cover-sheet ${isLandscape ? 'landscape-cover' : ''}`}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`Open book: ${bookData.title} — ${bookData.tamilTitle}`}
      >
        {/* Left Book Spine Binding Simulation */}
        <div className="book-spine-binding" />

        {/* Embossed Gold Foil Border Frame */}
        <div className="book-cover-embossed-frame" />

        {/* Paper Deckle Edge */}
        <div className="paper-deckle-edge" />

        {/* Header Section */}
        <div className="book-cover-header">
          <div className="book-cover-tag">
            {coverInfo.tag || `BOOK · புத்தகம்`}
          </div>
          <div className="book-cover-ornament">
            {coverInfo.ornament || '✦ ☾ ✦'}
          </div>
        </div>

        {/* Central Cameo Artwork & Titles */}
        <div className="book-cover-center">
          <div className="book-cover-artwork-cameo">
            <img
              src={bookData.coverImage}
              alt={bookData.title}
              className="book-cover-artwork-img"
              draggable="false"
            />
          </div>

          <div className="book-cover-title-group">
            <h1 className="book-cover-title-en">{bookData.title}</h1>
            <div className="book-cover-title-ta">{bookData.tamilTitle}</div>
            <p className="book-cover-subtitle">{coverInfo.subtitle || bookData.subtitle}</p>
          </div>
        </div>

        {/* Footer: Open Button & Return */}
        <div className="book-cover-footer">
          <button
            type="button"
            className="book-cover-open-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            aria-label="Open the book"
          >
            <span>OPEN BOOK</span>
            <span aria-hidden="true">📖</span>
          </button>

          <button
            type="button"
            className="book-cover-return-link"
            onClick={(e) => {
              e.stopPropagation();
              onReturnToIndex();
            }}
            aria-label="Return to Library Index"
          >
            ← RETURN TO LIBRARY
          </button>
        </div>
      </div>
    </div>
  );
}
