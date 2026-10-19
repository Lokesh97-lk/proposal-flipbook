import React from 'react';
import PagePopup from '../Flipbook/PagePopup';
import '../../styles/bookExperience.css';

export default function BookPage({
  page,
  isPopupOpen,
  onClosePopup,
  onReopenPopup,
  onPlaySound
}) {
  if (!page) return null;

  // Case 1: Illustrated artwork pages (authentic hand-drawn graphite artwork with embedded Tamil poetry)
  if (page.preserveEmbeddedText) {
    const artworkSrc = page.background || page.image;

    return (
      <div className="book-artwork-page-container">
        {/* Left spine shadow simulating bound flipbook paper */}
        <div className="page-spine-shadow" />

        {/* Main Artwork Stage - cleanly fits without cropping, blurring, or stretching */}
        <div className="book-artwork-stage">
          {artworkSrc && (
            <img
              src={artworkSrc}
              alt={page.alt || page.title || "Illustration with Tamil poem"}
              className="book-artwork-main-img"
              draggable="false"
            />
          )}
        </div>

        {/* Original Personal Note Pop-up if configured on this page */}
        {page.popup && isPopupOpen && (
          <PagePopup
            popup={page.popup}
            onClose={onClosePopup}
            onPlayClick={onPlaySound}
          />
        )}

        {/* Discreet Note Re-open Badge if dismissed */}
        {page.popup && !isPopupOpen && (
          <button
            type="button"
            onClick={() => {
              if (onPlaySound) onPlaySound();
              onReopenPopup();
            }}
            className="page2-reopen-note-btn"
            title="Click to view personal note again"
            aria-label="Re-open note"
          >
            <span>💌</span>
            <span>Note</span>
          </button>
        )}
      </div>
    );
  }

  // Case 2: Chapter Pages for My Nature, Some More Random Thoughts, and For You Intro
  const {
    heading,
    tamilHeading,
    subtitle,
    tag,
    illustration,
    altText,
    poem = [],
    englishReflection,
    paragraphs = [],
    tamilVerse,
    highlightedLine,
    handwrittenNote,
    closingNote
  } = page;

  return (
    <div className="book-page-scrollable">
      {/* Book Spine Shadow */}
      <div className="page-spine-shadow" />
      <div className="paper-deckle-edge" />

      {/* Page Header */}
      <div className="book-page-header">
        {tag && <div className="book-page-tag">{tag}</div>}
        {heading && <h2 className="book-page-heading">{heading}</h2>}
        {tamilHeading && <div className="book-page-tamil-heading">{tamilHeading}</div>}
        {subtitle && <p className="book-page-subtitle">{subtitle}</p>}
      </div>

      {/* Cameo Illustration if provided */}
      {illustration && (
        <div className="book-page-illustration-wrapper">
          <img
            src={illustration}
            alt={altText || heading || 'Page illustration'}
            className="book-page-illustration-img"
            draggable="false"
          />
        </div>
      )}

      {/* Poem Card (Tamil Verses + English Reflection) */}
      {poem.length > 0 && (
        <div className="book-poem-card">
          <div className="book-tamil-poem-text">
            {poem.join('\n')}
          </div>

          {englishReflection && (
            <>
              <div className="book-poem-divider" />
              <p className="book-english-reflection">
                {englishReflection}
              </p>
            </>
          )}
        </div>
      )}

      {/* Paragraphs */}
      {paragraphs.length > 0 && (
        <div className="book-paragraphs-container">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="book-page-paragraph">
              {p}
            </p>
          ))}
        </div>
      )}

      {/* Additional Tamil Verse */}
      {tamilVerse && (
        <p className="book-page-tamil-verse">
          {tamilVerse}
        </p>
      )}

      {/* Highlighted Line */}
      {highlightedLine && (
        <div className="book-page-highlighted-line">
          &ldquo;{highlightedLine}&rdquo;
        </div>
      )}

      {/* Handwritten Note */}
      {handwrittenNote && (
        <p className="book-handwritten-note">
          {handwrittenNote}
        </p>
      )}

      {/* Quiet Closing Reflection */}
      {closingNote && (
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.94rem',
          fontStyle: 'italic',
          color: 'var(--ink-secondary)',
          marginTop: '12px',
          lineHeight: '1.55'
        }}>
          {closingNote}
        </p>
      )}
    </div>
  );
}
