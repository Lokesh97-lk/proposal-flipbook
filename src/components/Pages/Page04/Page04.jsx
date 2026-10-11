import { page04Content } from './content';
import SafeImage from '../../UI/SafeImage';
import './Page04.css';

export default function Page04({ data = page04Content }) {
  return (
    <div className="page04-container">
      <div className="page-header">
        <span className="page-date">{data.date}</span>
        <h2 className="page-title">{data.title}</h2>
        <p className="page-subtitle">{data.subtitle}</p>
      </div>

      <div className="page-body page04-content-split">
        {data.content.map((para, idx) => (
          <p key={idx} className="page-paragraph">
            {para}
          </p>
        ))}

        {data.milestones && (
          <div className="milestones-container">
            {data.milestones.map((m, idx) => (
              <div key={idx} className="milestone-item">
                <span className="milestone-tag">{m.tag}</span>
                <p className="milestone-text">{m.text}</p>
              </div>
            ))}
          </div>
        )}

        {data.image && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
            <div
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '3px',
                overflow: 'hidden',
                flexShrink: 0,
                border: '1px solid rgba(180, 150, 110, 0.4)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
            >
              <SafeImage
                src={data.image.src}
                alt={data.image.alt || 'Milestone'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p className="font-serif" style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--ink-secondary)' }}>
              {data.image.caption}
            </p>
          </div>
        )}

        {data.handwrittenNote && (
          <div className="handwritten-note">
            {data.handwrittenNote}
          </div>
        )}
      </div>
    </div>
  );
}
