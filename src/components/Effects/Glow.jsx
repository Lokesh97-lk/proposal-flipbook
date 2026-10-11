export default function Glow({ active = false, color = 'rgba(235, 195, 120, 0.35)' }) {
  if (!active) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: '-20px',
        borderRadius: '8px',
        boxShadow: `0 0 60px ${color}`,
        pointerEvents: 'none',
        transition: 'box-shadow 1s ease',
        zIndex: -1
      }}
    />
  );
}
