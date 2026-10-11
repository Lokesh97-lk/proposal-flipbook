/**
 * Application Settings & Defaults
 */

export const settingsData = {
  title: "Proposal Flipbook",
  recipient: "My Dearest",
  author: "Always Yours",
  
  // Timing / animation constants (seconds)
  timing: {
    openingDuration: 2.0,
    pageTurnDuration: 0.8,
    closingDuration: 2.0,
    revealStepDelay: 1.6
  },

  // Audio settings
  audio: {
    ambientVolume: 0.48,
    sfxVolume: 0.5,
    defaultMuted: false
  },

  // Visual features
  visuals: {
    enableStars: true,
    enableDust: true,
    enableCustomCursor: true,
    paperShadowBlur: 40
  }
};

export default settingsData;
