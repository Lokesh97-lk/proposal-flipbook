import { page02Content } from './content';
import SafeImage from '../../UI/SafeImage';
import './Page02.css';

export default function Page02({ data = page02Content }) {
  return (
    <div className="page02-container">
      <div className="page-header">
        <span className="page-date">{data.date}</span>
        <h2 className="page-title">{data.title}</h2>
        <p className="page-subtitle">{data.subtitle}</p>
      </div>

      {data.image && (
        <div className="page02-polaroid-section">
          <div className="polaroid-card">
            <div className="polaroid-image-wrapper">
              <SafeImage
                src={data.image.src}
                alt={data.image.alt || 'Memory'}
                className="polaroid-image"
              />
            </div>
            {data.image.caption && (
              <p className="polaroid-caption">{data.image.caption}</p>
            )}
          </div>
        </div>
      )}

      <div className="page-body">
        {data.content.map((para, idx) => (
          <p key={idx} className="page-paragraph">
            {para}
          </p>
        ))}
        {data.handwrittenNote && (
          <div className="handwritten-note">
            {data.handwrittenNote}
          </div>
        )}
      </div>
    </div>
  );
}
