import { useState, useCallback } from 'react';
import useAudio from './hooks/useAudio';

// Experience Stages
import IntroCover from './components/Intro/IntroCover';
import OpeningAnimation from './components/Opening/OpeningAnimation';
import OpenedPaperScene from './components/Intro/OpenedPaperScene';
import StoryIndex from './components/Index/StoryIndex';
import BookExperience from './components/Book/BookExperience';
import Flipbook from './components/Flipbook/Flipbook';
import FinalPage from './components/Final/FinalPage';
import ClosingAnimation from './components/Closing/ClosingAnimation';
import ClosedScene from './components/Closing/ClosedScene';

// Subtle Controls
import MusicButton from './components/UI/MusicButton';
import PasswordGate from './components/UI/PasswordGate';
import Cursor from './components/UI/Cursor';

export default function App() {
  // Lock state at website start (Key: 0405 / DOB: DD/MM)
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('proposal_flipbook_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  // Experience sequence: 'intro' | 'opening' | 'opened-scene' | 'index' | 'book' | 'flipbook' | 'final' | 'closing' | 'closed'
  const [experienceState, setExperienceState] = useState('intro');
  const [selectedBookId, setSelectedBookId] = useState('my-moon');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    isMuted,
    playClick,
    playPageTurn,
    playPaperOpen,
    playPaperFold,
    playUnlock,
    startAmbient,
    stopAmbient,
    setMute,
    toggleMute
  } = useAudio();

  // 1. User clicks intro floating cover -> triggers physical unfold (no song played at starting)
  const handleOpenPaper = useCallback(() => {
    setExperienceState('opening');
  }, []);

  // 2. Physical paper unfolding finishes -> reveals opened paper with First Popup
  const handleOpeningFinished = useCallback(() => {
    setExperienceState('opened-scene');
  }, []);

  // 3. User closes first popup and clicks "NEXT →" -> transitions to Story Index
  const handleStartReading = useCallback(() => {
    playPageTurn();
    setExperienceState('index');
  }, [playPageTurn]);

  // Select a book from the Index
  const handleSelectBook = useCallback((bookId) => {
    setSelectedBookId(bookId);
    setExperienceState('book');
  }, []);

  // Return to the Index from any book
  const handleReturnToIndex = useCallback(() => {
    playPaperFold();
    setExperienceState('index');
  }, [playPaperFold]);

  // Re-read first note / intro popup
  const handleReReadIntro = useCallback(() => {
    playClick();
    setExperienceState('opened-scene');
  }, [playClick]);

  // Flipbook page navigation
  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(6, prev + 1));
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  // 4. User finishes Page 6 -> transitions to Final Personal Message
  const handleFinishLetter = useCallback(() => {
    playPageTurn();
    setExperienceState('final');
  }, [playPageTurn]);

  // 5. User clicks "CLOSE THE LETTER" -> triggers reverse physical 3D fold
  const handleCloseLetter = useCallback(() => {
    setExperienceState('closing');
  }, []);

  // 6. Reverse folding completes -> letter rests quietly folded on screen
  const handleClosingFinished = useCallback(() => {
    setExperienceState('closed');
  }, []);

  // Replay letter from beginning
  const handleReplay = useCallback(() => {
    playClick();
    setCurrentPage(1);
    setExperienceState('intro');
  }, [playClick]);

  // Unlock after password verification (no song at starting)
  const handleUnlock = useCallback(() => {
    try {
      sessionStorage.setItem('proposal_flipbook_unlocked', 'true');
    } catch {}
    setIsUnlocked(true);
  }, []);

  // Lock the website again
  const handleLock = useCallback(() => {
    try {
      sessionStorage.removeItem('proposal_flipbook_unlocked');
    } catch {}
    setIsUnlocked(false);
  }, []);

  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Subtle Room Vignette */}
      <div className="room-vignette" />

      {/* Romantic Custom Cursor for desktop */}
      <Cursor />

      {/* Discreet Audio Toggle */}
      <MusicButton isMuted={isMuted} onToggle={toggleMute} />

      {/* Discreet Lock Screen Toggle (Active once unlocked) */}
      {isUnlocked && (
        <button
          onClick={handleLock}
          aria-label="Lock Website"
          title="Lock with password (0405)"
          style={{
            position: 'fixed',
            top: '20px',
            left: '24px',
            background: 'none',
            border: 'none',
            color: 'rgba(215, 195, 170, 0.55)',
            fontFamily: 'var(--font-serif)',
            fontSize: '0.8rem',
            letterSpacing: '0.14em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 100,
            transition: 'color 0.25s ease',
            padding: '6px 10px'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#e8dcc8')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(215, 195, 170, 0.55)')}
        >
          <span style={{ fontSize: '0.85rem' }}>🔒</span>
          <span>LOCK</span>
        </button>
      )}

      {/* Gatekeeper Password Modal at Website Start */}
      {!isUnlocked && (
        <PasswordGate
          onUnlock={handleUnlock}
          onPlayUnlock={playUnlock}
          onPlayClick={playClick}
        />
      )}

      {/* Central Interactive Experience */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* STAGE 1: INTRO COVER (Handmade swan notebook floating paper) */}
        {experienceState === 'intro' && (
          <IntroCover
            onOpen={handleOpenPaper}
            onPlaySound={playPaperOpen}
          />
        )}

        {/* STAGE 2: PHYSICAL PAPER OPENING (3D unfold from bottom-left to top-right) */}
        {experienceState === 'opening' && (
          <OpeningAnimation
            onComplete={handleOpeningFinished}
            onPlaySound={playPaperOpen}
          />
        )}

        {/* STAGE 3 & 4: FIRST POP-UP MESSAGE & CLICK-TO-READ PROMPT */}
        {experienceState === 'opened-scene' && (
          <OpenedPaperScene
            onStartReading={handleStartReading}
            onPlayClick={playClick}
          />
        )}

        {/* STAGE 5: STORY INDEX (Collection of 4 Romantic Books) */}
        {experienceState === 'index' && (
          <StoryIndex
            onSelectBook={handleSelectBook}
            onReReadIntro={handleReReadIntro}
            onPlayClick={playClick}
          />
        )}

        {/* STAGE 6: SEPARATE READABLE BOOK EXPERIENCE */}
        {experienceState === 'book' && (
          <BookExperience
            key={selectedBookId}
            bookId={selectedBookId}
            onReturnToIndex={handleReturnToIndex}
            onOpenFinalMessage={handleFinishLetter}
            onPlayPageTurn={playPageTurn}
            onPlayPaperOpen={playPaperOpen}
            onPlayClick={playClick}
          />
        )}

        {/* STANDALONE FLIPBOOK (Preserved for backwards compatibility) */}
        {experienceState === 'flipbook' && (
          <Flipbook
            currentPage={currentPage}
            totalPages={6}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            onFinishLetter={handleFinishLetter}
            onPageTurnSound={playPageTurn}
            onPlayClick={playClick}
          />
        )}

        {/* STAGE 7: FINAL PERSONAL MESSAGE */}
        {experienceState === 'final' && (
          <FinalPage
            onCloseLetter={handleCloseLetter}
            onPlayClick={playClick}
            onReturnToIndex={handleReturnToIndex}
          />
        )}

        {/* STAGE 8: PHYSICAL CLOSING ANIMATION (Reverse 3D fold) */}
        {experienceState === 'closing' && (
          <ClosingAnimation
            onComplete={handleClosingFinished}
            onPlaySound={playPaperFold}
          />
        )}

        {/* STAGE 9: CLOSED PAPER RESTING QUIETLY */}
        {experienceState === 'closed' && (
          <ClosedScene
            onReopen={handleReplay}
            onPlaySound={playClick}
            onReturnToIndex={handleReturnToIndex}
          />
        )}
      </section>
    </main>
  );
}
