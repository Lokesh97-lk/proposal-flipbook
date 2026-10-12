import gsap from 'gsap';

/**
 * Closing Animation
 * Folds the paper physically from TOP-RIGHT ↙ toward BOTTOM-LEFT in 3D.
 * 
 * @param {Object} elements - DOM refs for container, flaps, shadows
 * @param {Function} onComplete - Callback executed when folding completes
 */
export const runClosingAnimation = ({
  containerRef,
  foldBottomLeftRef,
  foldTopRightRef,
  creaseShadowRef,
  shadowRef
}, onComplete) => {
  if (containerRef) gsap.killTweensOf(containerRef);
  if (foldBottomLeftRef) gsap.killTweensOf(foldBottomLeftRef);
  if (foldTopRightRef) gsap.killTweensOf(foldTopRightRef);
  if (creaseShadowRef) gsap.killTweensOf(creaseShadowRef);
  if (shadowRef) gsap.killTweensOf(shadowRef);

  const isReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onComplete: () => {
      if (onComplete) onComplete();
    }
  });

  if (isReduced) {
    tl.to(containerRef, {
      opacity: 0.9,
      duration: 0.05
    });
    return tl;
  }

  // Stage 1: Lift paper slightly and tilt into 3D folding perspective (0.0s - 0.4s)
  tl.to(containerRef, {
    scale: 1.05,
    y: -20,
    rotateX: 6,
    rotateY: 4,
    rotateZ: 1,
    duration: 0.45,
    ease: 'power2.out'
  });

  // Stage 2: Flap (TOP-RIGHT) folds down & inward toward bottom-left (0.35s - 1.15s)
  if (foldTopRightRef) {
    tl.to(foldTopRightRef, {
      rotateX: -165,
      rotateY: -15,
      rotateZ: 6,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 0.35);
  }

  // Crease shadow deepens as paper folds
  if (creaseShadowRef) {
    tl.to(creaseShadowRef, {
      opacity: 0.6,
      duration: 0.8,
      ease: 'power1.in'
    }, 0.4);
  }

  // Stage 3: Flap (BOTTOM-LEFT) folds over to lock the folded envelope (0.8s - 1.55s)
  if (foldBottomLeftRef) {
    tl.to(foldBottomLeftRef, {
      rotateX: 165,
      rotateY: 15,
      rotateZ: -6,
      duration: 0.75,
      ease: 'power2.inOut'
    }, 0.75);
  }

  // Stage 4: Settle down to compact folded paper resting position (1.3s - 1.9s)
  tl.to(containerRef, {
    scale: 0.88,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: -1.5,
    duration: 0.65,
    ease: 'power2.out'
  }, 1.3);

  if (shadowRef) {
    tl.to(shadowRef, {
      scale: 0.9,
      opacity: 0.5,
      filter: 'blur(28px)',
      duration: 0.65
    }, 1.3);
  }

  return tl;
};

export default runClosingAnimation;
