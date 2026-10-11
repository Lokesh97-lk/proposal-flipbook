import OpeningAnimation from './OpeningAnimation';

export default function OpeningTransition({ onComplete, onPlaySound }) {
  return (
    <OpeningAnimation
      onComplete={onComplete}
      onPlaySound={onPlaySound}
    />
  );
}
