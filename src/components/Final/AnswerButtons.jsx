import proposalData from '../../data/proposal';

export default function AnswerButtons({ onAnswer, onPlayClick }) {
  const { options } = proposalData;

  const handleClick = (choice) => {
    if (onPlayClick) onPlayClick();
    if (onAnswer) onAnswer(choice);
  };

  return (
    <div
      className="answer-options-group"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        animation: 'fadeInUp 0.8s ease forwards',
        marginTop: '10px'
      }}
    >
      <button
        onClick={() => handleClick('yes')}
        className="answer-btn answer-btn-yes"
        aria-label="Answer Yes"
      >
        <span>{options.yes.label}</span>
      </button>

      <button
        onClick={() => handleClick('time')}
        className="answer-btn answer-btn-time"
        aria-label="Answer I Need Some Time"
      >
        <span>{options.time.label}</span>
      </button>
    </div>
  );
}
