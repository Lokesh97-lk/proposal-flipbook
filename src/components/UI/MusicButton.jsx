export default function MusicButton({ isMuted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
      title={isMuted ? 'Sound Off (Click to turn on)' : 'Sound On (Click to mute)'}
      style={{
        position: 'fixed',
        top: '20px',
        right: '24px',
        background: 'none',
        border: 'none',
        color: isMuted ? 'rgba(180, 160, 140, 0.4)' : 'rgba(215, 195, 170, 0.8)',
        fontFamily: 'var(--font-serif)',
        fontSize: '0.82rem',
        letterSpacing: '0.14em',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        zIndex: 100,
        transition: 'color 0.25s ease, opacity 0.25s ease',
        padding: '6px 10px'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#e8dcc8')}
      onMouseLeave={(e) => (e.currentTarget.style.color = isMuted ? 'rgba(180, 160, 140, 0.4)' : 'rgba(215, 195, 170, 0.8)')}
    >
      <span style={{ fontSize: '0.95rem' }}>{isMuted ? '✕' : '♫'}</span>
      <span>{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
    </button>
  );
}
