import gsap from 'gsap';

/**
 * Text reveal and element fade transitions
 */

export const revealStaggerText = (elements, delay = 0.2, onComplete) => {
  if (!elements || elements.length === 0) return null;

  gsap.set(elements, { opacity: 0, y: 15 });

  return gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.25,
    delay,
    ease: 'power2.out',
    onComplete
  });
};

export const fadeOutElements = (elements, duration = 0.4, onComplete) => {
  if (!elements) return null;

  return gsap.to(elements, {
    opacity: 0,
    duration,
    ease: 'power2.in',
    onComplete
  });
};

export const pulseGlow = (elementRef) => {
  if (!elementRef) return null;

  return gsap.to(elementRef, {
    boxShadow: '0 0 45px rgba(255, 220, 160, 0.45)',
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
};
