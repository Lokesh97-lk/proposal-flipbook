export default function PageStack({ currentPage = 1, totalPages = 6 }) {
  const remainingPages = totalPages - currentPage;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {/* Right edge paper thickness layers */}
      {Array.from({ length: Math.min(4, remainingPages) }, (_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${(i + 1) * 1.5}px`,
            bottom: `${(i + 1) * 1.5}px`,
            right: `-${(i + 1) * 1.5}px`,
            width: '4px',
            backgroundColor: '#ece1cc',
            borderRadius: '0 2px 2px 0',
            boxShadow: '1px 0 2px rgba(0, 0, 0, 0.08)',
            borderRight: '1px solid rgba(180, 150, 120, 0.3)'
          }}
        />
      ))}
    </div>
  );
}
