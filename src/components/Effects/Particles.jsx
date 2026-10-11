import { useMemo } from 'react';

export default function Particles({ count = 18, color = '#e5c07b' }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() * 60 - 30),
      y: 50 + (Math.random() * 60 - 30),
      size: Math.random() * 3 + 1.5,
      delay: Math.random() * 2,
      duration: Math.random() * 2.5 + 2
    }));
  }, [count]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: '-40px',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 50
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`,
            animation: `floatDust ${p.duration}s ease-out infinite`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
}
