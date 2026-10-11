export default function IntroText({ position = 'top' }) {
  if (position === 'top') {
    return (
      <div
        style={{
          position: 'absolute',
          top: '-55px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.15rem',
            letterSpacing: '0.08em',
            color: 'rgba(235, 225, 205, 0.75)',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)'
          }}
        >
          A little something for you...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '-45px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        pointerEvents: 'none',
        whiteSpace: 'nowrap'
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.35)'
        }}
      >
        Click to open
      </span>
    </div>
  );
}
