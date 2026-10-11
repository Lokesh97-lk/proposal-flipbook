export default function PageShadow({ opacity = 0.5 }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '-45px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '85%',
        height: '40px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.25) 55%, transparent 75%)',
        filter: 'blur(30px)',
        opacity,
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'opacity 0.4s ease'
      }}
    />
  );
}
