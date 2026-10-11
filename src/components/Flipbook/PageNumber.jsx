export default function PageNumber({ current, total }) {
  const formattedCurrent = String(current).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <div className="page-counter">
      {formattedCurrent} / {formattedTotal}
    </div>
  );
}
