export default function PaperBack({ className = '', style = {} }) {
  return (
    <div
      className={`paper-backface ${className}`}
      style={style}
    >
      <div className="crease-horizontal" />
      <div className="crease-vertical" />
    </div>
  );
}
