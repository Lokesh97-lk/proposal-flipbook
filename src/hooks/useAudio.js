import { useState, useEffect, useCallback } from 'react';
import soundEngine from '../utils/audioUtils';

/**
 * useAudio hook
 * Provides sound playback methods and audio mute state to React components.
 */
export function useAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);

  useEffect(() => {
    soundEngine.preloadAudio();
  }, []);

  const playClick = useCallback(() => {
    soundEngine.playSFX('click');
  }, []);

  const playPageTurn = useCallback(() => {
    soundEngine.playSFX('page-turn');
  }, []);

  const playPaperOpen = useCallback(() => {
    soundEngine.playSFX('paper-open');
  }, []);

  const playPaperFold = useCallback(() => {
    soundEngine.playSFX('paper-fold');
  }, []);

  const playUnlock = useCallback(() => {
    soundEngine.playSFX('unlock');
  }, []);

  const startAmbient = useCallback(() => {
    soundEngine.playAmbient();
    setIsPlayingAmbient(true);
  }, []);

  const stopAmbient = useCallback(() => {
    soundEngine.stopAmbient();
    setIsPlayingAmbient(false);
  }, []);

  const setMute = useCallback((muted) => {
    const isNowMuted = soundEngine.setMute(muted);
    setIsMuted(isNowMuted);
  }, []);

  const toggleMute = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  return {
    isMuted,
    isPlayingAmbient,
    playClick,
    playPageTurn,
    playPaperOpen,
    playPaperFold,
    playUnlock,
    startAmbient,
    stopAmbient,
    setMute,
    toggleMute
  };
}

export default useAudio;
