import gsap from 'gsap';

/**
 * Common Animation Timing and Easing Presets
 */

export const EASING = {
  paperOpen: 'power2.inOut',
  paperFold: 'power2.inOut',
  pageTurn: 'power2.inOut',
  smoothFloat: 'sine.inOut',
  softBounce: 'back.out(1.2)'
};

export const killTweens = (targets) => {
  if (targets) {
    gsap.killTweensOf(targets);
  }
};
