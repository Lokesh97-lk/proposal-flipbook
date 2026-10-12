import gsap from 'gsap';

/**
 * Fast 3D Cover Turn-over Animation
 * Swiftly flips the title page cover leaf over along the spine in 3D (~0.55s).
 * 
 * @param {Object} elements - DOM refs for turning leaf, shadow, and container
 * @param {Function} onComplete - Callback executed when flip finishes
 */
export const runOpeningAnimation = ({
  containerRef,
  turningCoverRef,
  shadowRef,
  curlShadowRef
}, onComplete) => {
  if (turningCoverRef) {
    gsap.killTweensOf(turningCoverRef);
  }
  if (containerRef) {
    gsap.killTweensOf(containerRef);
  }

  const isReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = isReduced ? 0.05 : 0.55;

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onComplete: () => {
      if (onComplete) onComplete();
    }
  });

  // Fast & snappy 3D page flip rotation
  if (turningCoverRef) {
    gsap.set(turningCoverRef, {
      transformPerspective: 1600,
      transformOrigin: 'left center',
      transformStyle: 'preserve-3d',
      rotateY: 0,
      zIndex: 25
    });

    tl.to(turningCoverRef, {
      rotateY: -180,
      duration,
      ease: 'power2.inOut'
    }, 0);
  }

  // Dynamic shadow curl moving across the turning page
  if (curlShadowRef && !isReduced) {
    tl.fromTo(
      curlShadowRef,
      { opacity: 0 },
      { opacity: 0.55, duration: duration * 0.5, yoyo: true, repeat: 1, ease: 'power1.in' },
      0
    );
  }

  // Subtle natural camera lift
  if (containerRef && !isReduced) {
    tl.fromTo(
      containerRef,
      { scale: 0.97 },
      { scale: 1.0, duration, ease: 'power2.out' },
      0
    );
  }

  return tl;
};

export default runOpeningAnimation;
