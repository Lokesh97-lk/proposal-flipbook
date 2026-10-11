/**
 * Intro Configuration Data
 * 
 * You can customize the cover, the first popup message, and the click-to-read prompt here.
 * All text and paths are easily editable.
 */

export const introData = {
  // Intro cover floating paper
  coverImage: "/images/title-page.png",
  coverAlt: "சொல்லா கதை — A handwritten flipbook",
  coverTooltip: "Click the paper to open",

  // First pop-up message (appears immediately after title page turns over)
  firstPopup: {
    title: "To My Dearest",
    message: "I have been watching you in my silence over 7 months of time, so I express today my feelings towards you.",
    prompt: "Please click next to see what is waiting...",
    buttonLabel: "NEXT →",
    tamilText: "Naan unga kitta sollanumnu nenacha\nellathaiyum etho solli irukken paarunga...",
    englishHint: "",
    closeLabel: "Close message"
  },

  // Password Gate (Shown at the time of website starting)
  passwordGate: {
    enabled: true,
    password: "0405", // Logic: DOB in DD/MM format (04/05)
    logicHint: "DOB : DD/MM",
    title: "Only For You",
    message: "It was not an ordinary space to explore, it is full of that how I describe you.",
    subMessage: "A private letter created for only one person. Please enter the key to open.",
    buttonText: "UNLOCK & ENTER",
    errorMessage: "Only the one I wrote this for holds this key... (Hint: DOB : DD/MM)",
    successMessage: "Key verified. Opening your letter..."
  },

  // Message displayed on the opened paper
  clickToRead: {
    message: "I have been watching you in my silence over 7 months of time, so I express today my feelings towards you.",
    prompt: "Please click next to see what is waiting...",
    buttonLabel: "NEXT →"
  }
};

export default introData;
