import { page03Content } from './content';
import './Page03.css';

export default function Page03({ data = page03Content }) {
  return (
    <div className="page03-container">
      <div className="page-header">
        <span className="page-date">{data.date}</span>
        <h2 className="page-title">{data.title}</h2>
        <p className="page-subtitle">{data.subtitle}</p>
      </div>

      <div className="page-body page03-journal-lines">
        {data.content.map((para, idx) => (
          <p key={idx} className="page-paragraph page03-handwritten-primary">
            {para}
          </p>
        ))}

        {data.quote && (
          <div className="page-quote" style={{ marginTop: '20px' }}>
            "{data.quote}"
          </div>
        )}

        {data.handwrittenNote && (
          <div className="handwritten-note" style={{ marginTop: '16px', color: 'var(--wax-red)' }}>
            — {data.handwrittenNote}
          </div>
        )}
      </div>
    </div>
  );
}
