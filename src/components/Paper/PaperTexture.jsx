export default function PaperTexture() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: `radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.45) 0%, rgba(240, 230, 210, 0.25) 75%, rgba(220, 205, 180, 0.5) 100%)`,
        opacity: 0.85,
        zIndex: 2
      }}
    />
  );
}
