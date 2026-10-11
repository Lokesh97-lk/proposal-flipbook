import FoldTopRight from './FoldTopRight';
import FoldBottomLeft from './FoldBottomLeft';

export default function FoldBack({ foldTopRightRef, foldBottomLeftRef }) {
  return (
    <>
      <FoldTopRight ref={foldTopRightRef} />
      <FoldBottomLeft ref={foldBottomLeftRef} />
    </>
  );
}
