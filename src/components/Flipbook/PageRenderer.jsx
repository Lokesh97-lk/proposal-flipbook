import React from 'react';

export default function PageRenderer({ page }) {
  if (!page) return null;

  const {
    title,
    subtitle,
    background,
    alt,
    bgColor,
    paragraphs = [],
    highlightedLine,
    handwrittenNote,
    textPlacement = 'center',
    preserveEmbeddedText = false
  } = page;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Background Illustration Layer */}
      {background && (
        <div
          className="page-bg-layer"
          style={{ backgroundColor: bgColor || '#f3ede3' }}
        >
          {/* Ambient blurred backdrop to softly fill any aspect-ratio margins */}
          <img
            src={background}
            alt=""
            aria-hidden="true"
            className="page-bg-backdrop"
            draggable="false"
          />
          {/* Main Full Artwork (contain ensures zero text/drawing cropping or stretching) */}
          <img
            src={background}
            alt={alt || title || "Page illustration"}
            className="page-bg-img"
            draggable="false"
          />
          <div className="page-bg-wash" />
        </div>
      )}

      {/* Book Spine Shadow */}
      <div className="page-spine-shadow" />

      {/* Content Layer Over Artwork */}
      <div
        className={`page-content-layer placement-${textPlacement}`}
        style={{ pointerEvents: preserveEmbeddedText ? 'none' : 'auto' }}
      >
        {/* If preserveEmbeddedText is false, render typed paragraphs inside a gentle parchment card */}
        {!preserveEmbeddedText ? (
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '440px',
              backgroundColor: 'rgba(250, 245, 235, 0.72)',
              backdropFilter: 'blur(1px)',
              padding: '20px 24px',
              borderRadius: '3px',
              border: '1px solid rgba(160, 130, 95, 0.22)',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.06)'
            }}
          >
            {/* Header: Title & Subtitle */}
            <div className="page-header" style={{ marginBottom: '14px' }}>
              {title && <h2 className="page-title">{title}</h2>}
              {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>

            {/* Paragraphs (Tamil or English) */}
            <div className="page-body-paragraphs">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="page-paragraph">
                  {p}
                </p>
              ))}
            </div>

            {/* Highlighted Emotional Line */}
            {highlightedLine && (
              <p className="highlighted-line">
                {highlightedLine}
              </p>
            )}

            {/* Optional Handwritten Script Note */}
            {handwrittenNote && (
              <p className="handwritten-note">
                {handwrittenNote}
              </p>
            )}
          </div>
        ) : (
          /* For illustrated pages where Tamil verses are already hand-drawn in the artwork,
             preserve the artwork cleanly without rendering duplicate text over the existing quote.
             Only render notes if explicitly configured. */
          handwrittenNote ? (
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '440px',
                textAlign: 'center',
                marginTop: 'auto',
                marginBottom: '12px'
              }}
            >
              <p className="handwritten-note" style={{ fontSize: '1.35rem' }}>
                {handwrittenNote}
              </p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
