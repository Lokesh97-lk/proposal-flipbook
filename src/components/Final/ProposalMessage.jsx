import { useEffect, useState } from 'react';
import proposalData from '../../data/proposal';

export default function ProposalMessage({ onRevealComplete }) {
  const [step, setStep] = useState(1);
  const { steps } = proposalData;

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 1600);
    const timer2 = setTimeout(() => setStep(3), 3200);
    const timer3 = setTimeout(() => {
      setStep(4);
      if (onRevealComplete) onRevealComplete();
    }, 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onRevealComplete]);

  return (
    <div style={{ textAlign: 'center', maxWidth: '440px', margin: '0 auto' }}>
      <p
        className="font-serif"
        style={{
          fontSize: '1.25rem',
          fontStyle: 'italic',
          color: 'var(--ink-secondary)',
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.8s ease'
        }}
      >
        {steps.step1}
      </p>

      {step >= 2 && (
        <p
          className="font-serif"
          style={{
            fontSize: '1.18rem',
            color: 'var(--ink-secondary)',
            marginTop: '16px',
            animation: 'fadeInUp 0.8s ease forwards'
          }}
        >
          {steps.step2}
        </p>
      )}

      {step >= 3 && (
        <h2
          className="font-display proposal-confession"
          style={{
            animation: 'fadeInUp 0.9s ease forwards'
          }}
        >
          {steps.confession}
        </h2>
      )}

      {step >= 4 && (
        <p
          className="font-serif proposal-question"
          style={{
            animation: 'fadeInUp 0.9s ease forwards'
          }}
        >
          {steps.question}
        </p>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
