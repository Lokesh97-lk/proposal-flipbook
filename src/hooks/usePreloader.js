import { useState, useEffect } from 'react';
import { preloadAllImages } from '../utils/preloadImages';
import soundEngine from '../utils/audioUtils';

/**
 * usePreloader hook
 * Preloads essential visual assets, font readiness, and audio buffers
 */
export function usePreloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    let isMounted = true;

    const loadAssets = async () => {
      // 1. Initial progress tick
      setProgress(30);

      // 2. Preload images
      const imagesToPreload = [
        '/images/title-page.png',
        '/images/page-01.png',
        '/images/page-02.png',
        '/images/page-03.png',
        '/images/page-04.png',
        '/images/page-05.png',
        '/images/page-06.png',
        '/images/paper-content-bg.jpg',
        '/images/intro/seal.png',
        '/images/bamini-tamil.png'
      ];
      await preloadAllImages(imagesToPreload);
      if (isMounted) setProgress(70);

      // 3. Audio preload
      soundEngine.preloadAudio();
      if (isMounted) setProgress(90);

      // 4. Ensure document fonts are ready
      if (document.fonts) {
        try {
          await document.fonts.ready;
        } catch (e) {}
      }

      // 5. Short natural delay for smooth presentation
      setTimeout(() => {
        if (isMounted) {
          setProgress(100);
          setIsLoaded(true);
        }
      }, 600);
    };

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, []);

  return { isLoaded, progress };
}

export default usePreloader;
