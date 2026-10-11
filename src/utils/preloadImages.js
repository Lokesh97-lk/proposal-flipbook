/**
 * Preload Images utility with Promise resolution
 */

export const preloadImage = (src) => {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = () => {
      console.warn(`Could not load image: ${src}. Fallback placeholder will be used.`);
      resolve(null);
    };
  });
};

export const preloadAllImages = (sources = []) => {
  return Promise.all(sources.map((s) => preloadImage(s)));
};
