/**
 * Flipbook Pages Content Configuration
 * 
 * 6 Artistically Arranged Illustrated Pages in exact order (1 to 6)
 * Each illustration features authentic hand-drawn graphite artwork with
 * embedded Tamil love verses.
 * 
 * Arranged strictly from 1st page to 6th page:
 * - Page 01: ஒரு நாள் வானத்தைப் பார்த்தேன்— நிலவு இருந்தது... (1st page .png)
 * - Page 02: நிலவிடம் கேட்டேன், "உன்னை விட அழகானது இந்த உலகில் இருக்கிறதா?"... (2nd page .png)
 * - Page 03: அவளை வர்ணிக்க வார்த்தைகளைத் தேடினேன்... (3rd .png)
 * - Page 04: அவள் கன்னக்குழியை பார்த்த பிறகு தான் தெரிந்தது... (4th .png)
 * - Page 05: மலர்கள் அழகு, மழை அழகு, வானம் அழகு, கடலும் அழகு... (5th .png)
 * - Page 06: காதலனாய் உன் கரம் பிடிப்பேன், ஆனால் ஒரு தந்தையாய் உன்னை நெஞ்சில் சுமப்பேன்... (6th .png)
 */

export const pagesData = [
  {
    id: 1,
    pageNumber: "01",
    title: "THE MOON ON EARTH",
    subtitle: "நிலவு",
    background: "/images/page-01.png",
    alt: "ஒரு நாள் வானத்தைப் பார்த்தேன்— நிலவு இருந்தது... நிலவுக்கே அழகாகத் தோன்றும் ஒரு பெண்.",
    preserveEmbeddedText: true,
    bgColor: "#8c8377",
    textPlacement: "center",
    paragraphs: [],
    highlightedLine: null,
    handwrittenNote: null,
  },
  {
    id: 2,
    pageNumber: "02",
    title: "THE JEALOUS MOON",
    subtitle: "அழகின் உண்மை",
    background: "/images/page-02.png",
    alt: "நிலவிடம் கேட்டேன், 'உன்னை விட அழகானது இந்த உலகில் இருக்கிறதா?'... நிலவுக்கே தன் அழகின் மீது நம்பிக்கை இல்லை.",
    preserveEmbeddedText: true,
    bgColor: "#a69b8f",
    textPlacement: "center",
    paragraphs: [],
    highlightedLine: null,
    handwrittenNote: null,
    popup: {
      tamilText: "Naa ungala epdi pakuren nu nenga ennaku ennava irukinga nu",
      englishHint: "How I see you... and what you mean to me",
      tag: "FROM MY HEART"
    }
  },
  {
    id: 3,
    pageNumber: "03",
    title: "BEYOND WORDS",
    subtitle: "வர்ணனைக்கு அப்பாற்பட்டவள்",
    background: "/images/page-03.png",
    alt: "அவளை வர்ணிக்க வார்த்தைகளைத் தேடினேன்... சில அழகுகளுக்கு பெயர் வைக்க முடியாது; அவற்றை பார்த்துக்கொண்டே இருக்கத்தான் முடியும்.",
    preserveEmbeddedText: true,
    bgColor: "#eaded0",
    textPlacement: "center",
    paragraphs: [],
    highlightedLine: null,
    handwrittenNote: null,
    popup: {
      tamilText: "Naa ungala intha ulagathula ethu kuda compare pannalum athu thoothu than poguthu",
      englishHint: "Whatever in this world I compare you to, it fails in comparison",
      tag: "BEYOND WORDS"
    }
  },
  {
    id: 4,
    pageNumber: "04",
    title: "THE DIMPLE SMILE",
    subtitle: "கன்னக்குழி",
    background: "/images/page-04.png",
    alt: "அவள் கன்னக்குழியை பார்த்த பிறகு தான் தெரிந்தது— சில அழகுகளுக்கு வார்த்தைகள் தேவையில்லை, ஒரு பார்வை போதும் என்று.",
    preserveEmbeddedText: true,
    bgColor: "#e5dbd1",
    textPlacement: "center",
    paragraphs: [],
    highlightedLine: null,
    handwrittenNote: null,
    popup: {
      tamilText: "Enaa ungala first time pakka vechathu,\nivlo thooram yosika vechathu,\nyen enna ungalaiey pakka vechathu,\nungala mattum pakka vechathu...",
      englishHint: "What made me look at you first, think this far, and keep looking only at you...",
      tag: "THE FIRST GLANCE"
    }
  },
  {
    id: 5,
    pageNumber: "05",
    title: "EQUAL TO NONE",
    subtitle: "ஒப்பற்ற அழகு",
    background: "/images/page-05.png",
    alt: "மலர்கள் அழகு, மழை அழகு, வானம் அழகு, கடலும் அழகு... உன்னைப் பார்த்த அந்த ஒரு நொடியின் அழகுக்கு ஈடாகாது.",
    preserveEmbeddedText: true,
    bgColor: "#8c7b6f",
    textPlacement: "center",
    paragraphs: [],
    highlightedLine: null,
    handwrittenNote: null,
    popup: {
      tamilText: "Naa eppovathu yosikum pothu nanum enoda random night thinking um....",
      englishHint: "When I think sometimes... me and my random night thoughts....",
      tag: "RANDOM NIGHT THOUGHTS"
    }
  },
  {
    id: 6,
    pageNumber: "06",
    title: "A SACRED PROMISE",
    subtitle: "என் சத்தியம்",
    background: "/images/page-06.png",
    alt: "காதலனாய் உன் கரம் பிடிப்பேன், ஆனால் ஒரு தந்தையாய் உன்னை நெஞ்சில் சுமப்பேன்... உன் கண்ணீரை துடைக்கும் கைகளாக என் கைகள்..",
    preserveEmbeddedText: true,
    bgColor: "#e8e0d4",
    textPlacement: "center",
    paragraphs: [],
    highlightedLine: null,
    handwrittenNote: null,
    popup: {
      tamilText: "Naa ungalukku promise panren,\nnaa ipdi ungala paathupen nu eppavum from first to last,\nand ipdi than naa ungala pakuren...",
      englishHint: "I promise you, I will always take care of you like this from first to last... and this is truly how I see you.",
      tag: "MY SACRED PROMISE"
    }
  }
];

export default pagesData;
