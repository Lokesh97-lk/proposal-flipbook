export default function SkipButton({ onReset }) {
  return (
    <button
      onClick={onReset}
      aria-label="Replay Letter"
      title="Replay Letter from beginning"
      style={{
        position: 'fixed',
        top: '24px',
        left: '24px',
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '50px',
        padding: '8px 14px',
        color: 'rgba(255, 255, 255, 0.4)',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.72rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        zIndex: 100,
        transition: 'all 0.25s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      }}
    >
      Replay ↺
    </button>
  );
}
