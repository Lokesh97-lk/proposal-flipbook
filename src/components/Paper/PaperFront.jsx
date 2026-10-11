import PaperTexture from './PaperTexture';

export default function PaperFront({ children, className = '', style = {} }) {
  return (
    <div
      className={`paper-sheet ${className}`}
      style={{
        ...style,
        position: 'relative'
      }}
    >
      <PaperTexture />
      <div className="crease-horizontal" />
      <div className="crease-vertical" />
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
