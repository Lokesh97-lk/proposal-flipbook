import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { finalMessageData } from '../../data/finalMessage';

export default function FinalPage({ onCloseLetter, onPlayClick }) {
  const contentRef = useRef(null);

  useEffect(() => {
    // The final message appears slowly with a gentle text reveal / fade-in
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out', delay: 0.2 }
    );
  }, []);

  const handleClose = () => {
    if (onPlayClick) onPlayClick();
    onCloseLetter();
  };

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
    >
      <div
        className="final-message-container"
        style={{
          backgroundImage: 'url(/images/paper-content-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="paper-deckle-edge" />

        <div
          ref={contentRef}
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}
        >
          {/* Opening Lead-in */}
          <div>
            {finalMessageData.leadIn && (
              <p className="final-lead-in">
                {finalMessageData.leadIn}
              </p>
            )}

            {/* Main Personal Message Paragraphs */}
            <div className="final-paragraphs">
              {finalMessageData.paragraphs.map((p, idx) => (
                <p key={idx} className="page-paragraph" style={{ textAlign: 'center' }}>
                  {p}
                </p>
              ))}

              {finalMessageData.personalMessageTamil && (
                <p
                  className="page-paragraph font-tamil"
                  style={{ textAlign: 'center', fontSize: '1.18rem', marginTop: '8px' }}
                >
                  {finalMessageData.personalMessageTamil}
                </p>
              )}

              {finalMessageData.highlightedLine && (
                <p className="highlighted-line" style={{ textAlign: 'center', margin: '14px auto 0' }}>
                  {finalMessageData.highlightedLine}
                </p>
              )}
            </div>
          </div>

          {/* Sincere Signature Area */}
          <div className="final-signature-wrapper">
            {finalMessageData.thankYouText && (
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.98rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-secondary)',
                  marginBottom: '2px',
                  fontWeight: 600
                }}
              >
                {finalMessageData.thankYouText}
              </span>
            )}
            {finalMessageData.signatureImage && (
              <img
                src={finalMessageData.signatureImage}
                alt="Signature"
                className="final-signature-img"
                draggable="false"
              />
            )}
            {finalMessageData.signatureText && (
              <span className="final-signature-text">
                {finalMessageData.signatureText}
              </span>
            )}
          </div>

          {/* Discreet CLOSE THE LETTER Control */}
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
            <button
              className="close-letter-btn"
              onClick={handleClose}
              aria-label="Close the letter"
            >
              <span className="close-btn-icon" style={{ fontSize: '1rem', marginRight: '6px' }}>✉</span>
              <span>{finalMessageData.closeButtonText || "CLOSE THE LETTER"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
