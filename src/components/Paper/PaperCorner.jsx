export default function PaperCorner({ position = 'bottom-right' }) {
  const isBR = position === 'bottom-right';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: isBR ? 0 : 'auto',
        right: isBR ? 0 : 'auto',
        top: !isBR ? 0 : 'auto',
        left: !isBR ? 0 : 'auto',
        width: '24px',
        height: '24px',
        pointerEvents: 'none',
        zIndex: 15,
        background: `linear-gradient(${isBR ? '135deg' : '-45deg'}, transparent 50%, rgba(0,0,0,0.06) 50%, rgba(240,230,210,0.9) 60%)`,
        boxShadow: '-1px -1px 2px rgba(0,0,0,0.05)'
      }}
    />
  );
}
