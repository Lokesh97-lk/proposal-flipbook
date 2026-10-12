import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { introData } from '../../data/intro';
import FirstPopup from './FirstPopup';
import ClickToRead from './ClickToRead';
import PaperShadow from '../Paper/PaperShadow';

export default function OpenedPaperScene({ onStartReading, onPlayClick }) {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const sheetRef = useRef(null);

  useEffect(() => {
    // Gentle entrance for the opened paper sheet
    if (sheetRef.current) {
      gsap.fromTo(
        sheetRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleReopenPopup = () => {
    if (onPlayClick) onPlayClick();
    setIsPopupOpen(true);
  };

  return (
    <div className="opened-paper-scene-container">
      {/* Physical Opened Paper Sheet */}
      <div
        ref={sheetRef}
        className="paper-sheet"
        style={{
          position: 'relative',
          width: 'min(var(--letter-width), 92vw, calc(90vh * 520 / 720))',
          maxHeight: '90vh',
          aspectRatio: '520 / 720',
          backgroundColor: '#faf5eb',
          backgroundImage: 'url(/images/paper-content-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 25px 65px -12px rgba(0,0,0,0.6), inset 0 0 45px rgba(160,130,90,0.15)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20
        }}
      >
        {/* Paper Deckle Edge and Crease Overlay */}
        <div className="paper-deckle-edge" />
        <div className="paper-crease-overlay" />

        {/* Discreet Note Reopen Button when popup is dismissed */}
        {!isPopupOpen && (
          <button
            onClick={handleReopenPopup}
            className="page2-reopen-note-btn"
            title="View first message again"
            aria-label="View first message again"
            style={{ top: '18px', right: '18px', zIndex: 30 }}
          >
            <span>💌</span>
            <span>First Note</span>
          </button>
        )}

        {/* Physical Paper Reading Action: Explicitly clicked to begin page 1 */}
        <ClickToRead
          onReadLetter={onStartReading}
          onPlayClick={onPlayClick}
        />

        {/* First Pop-up Message */}
        {isPopupOpen && (
          <FirstPopup
            onClose={handleClosePopup}
            onPlayClick={onPlayClick}
          />
        )}
      </div>

      <PaperShadow />
    </div>
  );
}
