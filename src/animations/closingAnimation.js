import gsap from 'gsap';

/**
 * 3D Physical Paper Folding Animation
 * Authentically lifts the letter and folds the top flap downward along the center crease
 * in 3D, casting dynamic fold shadows and settling smoothly into the resting folded letter.
 * 
 * @param {Object} elements - DOM refs for container, flap, shadows, and cover reveal
 * @param {Function} onComplete - Callback executed when folding completes
 */
export const runClosingAnimation = ({
  containerRef,
  topFlapRef,
  topFlapShadowRef,
  bottomShadowRef,
  coverRevealRef,
  creaseShadowRef,
  shadowRef
}, onComplete) => {
  if (containerRef) gsap.killTweensOf(containerRef);
  if (topFlapRef) gsap.killTweensOf(topFlapRef);
  if (topFlapShadowRef) gsap.killTweensOf(topFlapShadowRef);
  if (bottomShadowRef) gsap.killTweensOf(bottomShadowRef);
  if (coverRevealRef) gsap.killTweensOf(coverRevealRef);
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
    if (coverRevealRef) {
      tl.to(coverRevealRef, { opacity: 1, duration: 0.1 });
    }
    return tl;
  }

  // Stage 1: Paper lifts slightly and tilts into 3D folding perspective (0.0s - 0.42s)
  tl.to(containerRef, {
    scale: 1.04,
    y: -22,
    rotateX: 8,
    rotateY: 2,
    rotateZ: 0.8,
    duration: 0.42,
    ease: 'power2.out'
  });

  if (shadowRef) {
    tl.to(shadowRef, {
      scale: 1.08,
      opacity: 0.65,
      filter: 'blur(34px)',
      duration: 0.42,
      ease: 'power2.out'
    }, 0);
  }

  // Stage 2: Top flap physically folds forward and downward in 3D (0.35s - 1.25s)
  if (topFlapRef) {
    tl.to(topFlapRef, {
      rotateX: -180,
      duration: 0.9,
      ease: 'power2.inOut'
    }, 0.35);
  }

  // Dynamic crease and fold shadows deepen as flap rotates
  if (creaseShadowRef) {
    tl.to(creaseShadowRef, {
      opacity: 0.85,
      duration: 0.85,
      ease: 'power1.in'
    }, 0.35);
  }

  if (topFlapShadowRef) {
    tl.to(topFlapShadowRef, {
      opacity: 0.7,
      duration: 0.55,
      ease: 'power1.in'
    }, 0.35);
  }

  if (bottomShadowRef) {
    tl.to(bottomShadowRef, {
      opacity: 0.65,
      duration: 0.7,
      ease: 'power1.in'
    }, 0.55);
  }

  // Stage 3: Smoothly reveal the closed cover note as fold finishes (1.2s - 1.6s)
  if (coverRevealRef) {
    tl.to(coverRevealRef, {
      opacity: 1,
      duration: 0.45,
      ease: 'power2.inOut'
    }, 1.2);
  }

  // Stage 4: Settle gently down to desk resting position (1.4s - 2.05s)
  tl.to(containerRef, {
    scale: 0.88,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: -1.2,
    duration: 0.65,
    ease: 'power2.out'
  }, 1.4);

  if (shadowRef) {
    tl.to(shadowRef, {
      scale: 0.9,
      opacity: 0.42,
      filter: 'blur(26px)',
      duration: 0.65,
      ease: 'power2.out'
    }, 1.4);
  }

  return tl;
};

export default runClosingAnimation;
