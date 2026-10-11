import { page06Content } from './content';
import './Page06.css';

export default function Page06({ data = page06Content, onContinue }) {
  return (
    <div className="page06-container">
      <div className="page-header" style={{ textAlign: 'center' }}>
        <span className="page-date">{data.date}</span>
        <h2 className="page-title">{data.title}</h2>
        <p className="page-subtitle">{data.subtitle}</p>
      </div>

      <div className="page-body page06-anticipation-box">
        {data.content.map((para, idx) => (
          <p key={idx} className="page-paragraph" style={{ textAlign: 'center', fontSize: '1.22rem' }}>
            {para}
          </p>
        ))}

        {data.handwrittenNote && (
          <div className="handwritten-note" style={{ fontSize: '1.75rem', margin: '20px 0' }}>
            {data.handwrittenNote}
          </div>
        )}

        {onContinue && (
          <button
            onClick={onContinue}
            className="continue-btn"
            style={{ marginTop: '16px' }}
          >
            {data.actionLabel || 'CONTINUE TO THE QUESTION →'}
          </button>
        )}
      </div>
    </div>
  );
}
