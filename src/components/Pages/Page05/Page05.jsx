import { page05Content } from './content';
import SafeImage from '../../UI/SafeImage';
import './Page05.css';

export default function Page05({ data = page05Content }) {
  return (
    <div className="page05-container">
      <div className="page-header">
        <span className="page-date">{data.date}</span>
        <h2 className="page-title">{data.title}</h2>
        <p className="page-subtitle">{data.subtitle}</p>
      </div>

      <div className="page-body">
        {data.quote && (
          <div className="page05-statement-quote">
            "{data.quote}"
          </div>
        )}

        {data.content.map((para, idx) => (
          <p key={idx} className="page-paragraph">
            {para}
          </p>
        ))}

        {data.image && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <div
              style={{
                width: '180px',
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: '0 6px 18px rgba(0,0,0,0.14)',
                border: '1px solid rgba(180, 150, 110, 0.4)'
              }}
            >
              <SafeImage
                src={data.image.src}
                alt={data.image.alt || 'Memory'}
                style={{ width: '100%', height: '110px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        )}

        {data.handwrittenNote && (
          <div className="handwritten-note" style={{ textAlign: 'center' }}>
            {data.handwrittenNote}
          </div>
        )}
      </div>
    </div>
  );
}
