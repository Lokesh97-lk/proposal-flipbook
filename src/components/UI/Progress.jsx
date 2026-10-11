export default function Progress({ current, total, onSelect }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 100,
        background: 'rgba(15, 20, 30, 0.4)',
        backdropFilter: 'blur(6px)',
        padding: '6px 14px',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onSelect && onSelect(page)}
          aria-label={`Go to page ${page}`}
          style={{
            width: current === page ? '18px' : '6px',
            height: '6px',
            borderRadius: '3px',
            backgroundColor: current === page ? '#c9a050' : 'rgba(255, 255, 255, 0.25)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        />
      ))}
    </div>
  );
}
