import gsap from 'gsap';

/**
 * 3D Page Turn Animation
 * Rotates the page along its spine with dynamic shadow movement and depth.
 * 
 * @param {HTMLElement} turningPageRef - Element performing the 3D flip
 * @param {HTMLElement} shadowOverlayRef - Inner shadow simulating paper curl
 * @param {string} direction - 'next' or 'prev'
 * @param {Function} onComplete - Callback executed when flip finishes
 */
export const runPageTurnAnimation = (
  turningPageRef,
  shadowOverlayRef,
  direction = 'next',
  onComplete
) => {
  if (!turningPageRef) {
    if (onComplete) onComplete();
    return null;
  }

  const isNext = direction === 'next';
  const startAngle = isNext ? 0 : -180;
  const endAngle = isNext ? -180 : 0;

  gsap.killTweensOf(turningPageRef);
  if (shadowOverlayRef) gsap.killTweensOf(shadowOverlayRef);

  gsap.set(turningPageRef, {
    transformPerspective: 1600,
    transformOrigin: isNext ? 'left center' : 'right center',
    transformStyle: 'preserve-3d',
    rotateY: startAngle,
    zIndex: 20
  });

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut', duration: 0.75 },
    onComplete: () => {
      gsap.set(turningPageRef, { zIndex: 1 });
      if (onComplete) onComplete();
    }
  });

  // 1. Rotate the turning leaf
  tl.to(turningPageRef, {
    rotateY: endAngle,
    duration: 0.75
  }, 0);

  // 2. Dynamic curl shadow moving across the paper
  if (shadowOverlayRef) {
    tl.fromTo(shadowOverlayRef,
      { opacity: isNext ? 0 : 0.6 },
      {
        opacity: 0.5,
        duration: 0.35,
        ease: 'power1.in',
        yoyo: true,
        repeat: 1
      },
      0
    );
  }

  return tl;
};

export default runPageTurnAnimation;
