/**
 * Final Personal Message Configuration
 * 
 * Replace this sample message with your actual Tamil or English personal message.
 * No automatic proposals, questions, or Yes/No buttons. Just your honest words.
 */

export const finalMessageData = {
  // Opening lead-in sentence
  leadIn: "",

  // Main personal message paragraphs
  paragraphs: [
    "Naa unga kita sollanumnu vanthatha etho solli iruken, unagaluku purium nu nenikuren.",
    "Naa final solla varathu enna naa..."
  ],

  // Prominent highlighted line
  highlightedLine: "“I WANT TO TRAVEL THE REMAINING LIFE WITH YOU TILL END”",

  // Sincere thank you note
  thankYouText: "Thank You ❤️",

  // Personal handwritten signature
  signatureText: "— Lokesh",
  signatureImage: "/images/bamini-tamil.png", // Tamil handwritten "லோகேஷ்"

  // Discreet control to physically fold the letter back
  closeButtonText: "CLOSE THE LETTER",
  reopenButtonText: "OPEN THE LETTER AGAIN",

  // POV Video Popup (Appears as a surprise after the letter is closed)
  povVideoPopup: {
    enabled: true,
    tag: "( this you on my POV ) 🥺❤️",
    title: "( this you on my POV ) 🥺❤️",
    subtitle: "A glimpse of you through my eyes...",
    // Put your video at public/video/pov.mp4 or specify a path / YouTube link below
    videoSrc: "/video/pov.mp4",
    youtubeUrl: "",
    caption: "Forever my favorite view ✨",
    closeButtonText: "CLOSE",
    reopenButtonText: "( this you on my POV ) 🥺❤️"
  }
};

export default finalMessageData;
