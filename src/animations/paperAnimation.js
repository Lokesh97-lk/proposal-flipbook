import gsap from 'gsap';

/**
 * Paper floating and hover animation timelines
 */

export const createFloatingAnimation = (paperRef, shadowRef) => {
  if (!paperRef || !shadowRef) return null;

  const tl = gsap.timeline({ repeat: -1, yoyo: true });

  tl.to(paperRef, {
    y: -14,
    rotateZ: 1.2,
    rotateX: 2,
    duration: 3.2,
    ease: 'sine.inOut'
  });

  gsap.to(shadowRef, {
    scaleX: 0.9,
    scaleY: 0.9,
    opacity: 0.45,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  return tl;
};

export const animatePaperHover = (paperRef, shadowRef, isHovered) => {
  if (!paperRef || !shadowRef) return;

  if (isHovered) {
    gsap.to(paperRef, {
      scale: 1.04,
      rotateX: 4,
      rotateY: -2,
      duration: 0.4,
      ease: 'power2.out'
    });
    gsap.to(shadowRef, {
      scale: 1.08,
      opacity: 0.65,
      filter: 'blur(35px)',
      duration: 0.4,
      ease: 'power2.out'
    });
  } else {
    gsap.to(paperRef, {
      scale: 1.0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
    gsap.to(shadowRef, {
      scale: 1.0,
      opacity: 0.5,
      filter: 'blur(25px)',
      duration: 0.5,
      ease: 'power2.out'
    });
  }
};
