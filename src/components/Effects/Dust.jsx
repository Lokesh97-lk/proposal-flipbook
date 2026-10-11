import { useMemo } from 'react';

export default function Dust({ count = 22 }) {
  const motes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 35 + Math.random() * 30, // focused around central beam
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 7 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.15
    }));
  }, [count]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 6,
        overflow: 'hidden'
      }}
    >
      {motes.map((mote) => (
        <div
          key={mote.id}
          style={{
            position: 'absolute',
            left: `${mote.x}%`,
            top: `${mote.y}%`,
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            borderRadius: '50%',
            backgroundColor: '#faeed7',
            boxShadow: `0 0 4px rgba(250, 238, 215, 0.6)`,
            animation: `floatDust ${mote.duration}s ease-in-out infinite`,
            animationDelay: `${mote.delay}s`,
            opacity: mote.opacity
          }}
        />
      ))}
    </div>
  );
}
