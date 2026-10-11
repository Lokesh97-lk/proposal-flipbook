import FloatingPaper from './FloatingPaper';

export default function IntroScene({ onOpen, onHoverSound }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20
      }}
    >
      <FloatingPaper
        onClick={onOpen}
        onHoverChange={(hovered) => {
          if (hovered && onHoverSound) onHoverSound();
        }}
      />
    </div>
  );
}
