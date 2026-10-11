import { page01Content } from './content';
import './Page01.css';

export default function Page01({ data = page01Content }) {
  return (
    <div className="page01-container">
      <div className="page-header">
        <span className="page-date">{data.date}</span>
        <h1 className="page-title">{data.title}</h1>
        <p className="page-subtitle">{data.subtitle}</p>
        <div className="page01-ornament" />
      </div>

      <div className="page-body">
        {data.content.map((para, idx) => (
          <p
            key={idx}
            className={`page-paragraph ${idx === 0 ? 'page-dropcap' : ''}`}
          >
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
