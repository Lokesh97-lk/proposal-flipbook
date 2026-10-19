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
    title: "How to Read · வாசிக்கும் வரிசை",
    tag: "READING ORDER",
    message: "I have been watching you in my silence over 7 months of time, so I express today my feelings towards you.",
    orderPrompt: "Please read in this special order:",
    orderSteps: [
      {
        step: "1st",
        title: "Go with Moon",
        tamilTitle: "என் நிலா",
        symbol: "☾"
      },
      {
        step: "2nd",
        title: "Go with Nature",
        tamilTitle: "என் இயற்கை",
        symbol: "❀"
      },
      {
        step: "3rd",
        title: "Read with Random Thoughts",
        tamilTitle: "சில நினைவுகள்",
        symbol: "✧"
      },
      {
        step: "Finally",
        title: "Open to \"For You\" section and read that",
        tamilTitle: "உனக்காக",
        symbol: "✉",
        isFinal: true
      }
    ],
    buttonLabel: "CONTINUE READING →",
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
