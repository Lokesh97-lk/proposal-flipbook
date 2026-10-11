import proposalData from '../../data/proposal';
import Particles from '../Effects/Particles';

export default function FinalMessage({ answer, onCloseLetter, onPlayClick }) {
  const { options } = proposalData;
  const isYes = answer === 'yes';
  const data = isYes ? options.yes : options.time;

  const handleClose = () => {
    if (onPlayClick) onPlayClick();
    if (onCloseLetter) onCloseLetter();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px 16px',
        animation: 'fadeInUp 1s ease forwards',
        position: 'relative'
      }}
    >
      {/* Gentle floating particles on Yes */}
      {isYes && <Particles count={25} color="#e5c07b" />}

      <span
        style={{
          fontSize: '2rem',
          color: isYes ? 'var(--wax-red)' : 'var(--ink-gold)',
          marginBottom: '14px'
        }}
      >
        {data.icon || '✦'}
      </span>

      <h3
        className="font-display"
        style={{
          fontSize: '2rem',
          color: isYes ? 'var(--wax-red)' : 'var(--ink-primary)',
          fontWeight: 500,
          marginBottom: '16px'
        }}
      >
        {data.message}
      </h3>

      <p
        className="font-serif"
        style={{
          fontSize: '1.22rem',
          lineHeight: 1.6,
          color: 'var(--ink-secondary)',
          maxWidth: '420px',
          marginBottom: '32px'
        }}
      >
        {data.subMessage}
      </p>

      <button
        onClick={handleClose}
        className="continue-btn"
        style={{
          marginTop: '10px',
          backgroundColor: isYes ? 'var(--wax-red)' : '#4a4d56',
          boxShadow: isYes ? '0 6px 20px rgba(120, 28, 34, 0.4)' : '0 4px 14px rgba(0, 0, 0, 0.2)'
        }}
      >
        {data.closingPrompt || 'FOLD LETTER & CLOSE →'}
      </button>
    </div>
  );
}
