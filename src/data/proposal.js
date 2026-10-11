/**
 * Final Proposal Content Data
 * 
 * Edit this file to customize the confession, questions, and responses.
 */

export const proposalData = {
  // Pacing sequence before reveal
  steps: {
    step1: "Before you close this letter...",
    step2: "There is one thing I've been wanting to ask you.",
    confession: "I have feelings for you.",
    question: "Would you give me a chance to see where this could go?"
  },
  
  // Interactive answer options
  options: {
    yes: {
      id: "yes",
      label: "YES",
      icon: "✦",
      title: "A New Beginning",
      message: "Thank you for giving this little letter a beautiful ending.",
      subMessage: "I cannot wait to see where this journey takes us together. You've made my heart so full.",
      closingPrompt: "Let's keep this memory safe."
    },
    time: {
      id: "time",
      label: "I NEED SOME TIME",
      icon: "⏳",
      title: "With All My Heart",
      message: "That's completely okay.",
      subMessage: "Take all the time you need. Thank you for reading everything I wanted to say. Your feelings will always be respected.",
      closingPrompt: "Close letter and fold back."
    }
  },

  // Final folded envelope ending text
  ending: {
    line1: "Whatever happens next,",
    line2: "thank you for opening this.",
    line3: "Some things are worth writing down.",
    signature: "— From me, to you.",
    replayButton: "Replay Letter ↺"
  }
};

export default proposalData;
