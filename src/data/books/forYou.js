import { finalMessageData } from '../finalMessage';

/**
 * Book Four: For You — உனக்காக
 * 
 * Featuring the authentic artwork and handwritten love letter
 * from D:\asset\last in exact folder order:
 * 1. last 1 .png (/images/for-you/last-01.png) — சில அழகுகள் பூக்களைப் போல மலர்வதில்லை...
 * 2. last 2 .png (/images/for-you/last-02.png) — ஒருநாள் நீ இதைப் படித்தால்... உன்னை நினைத்தபோது என் உலகம் எவ்வளவு அழகாக இருந்தது...
 * 3. last 3 .png (/images/for-you/last-03.png) — First ivlo thooram pathathuku romba Nandri..! "I WANT TO TRAVEL A LIFE WITH YOU!!" by - Lokesh லோகேஷ்
 */

export const forYouBook = {
  id: 'for-you',
  title: 'For You',
  tamilTitle: 'உனக்காக',
  subtitle: 'My Words, My Heart & My Sacred Promise',
  shortDescription: 'The authentic handwritten letter, spoken straight from the heart.',
  tamilDescription: 'சொல்ல நினைத்த வார்த்தைகளும், உனக்காகக் காத்திருக்கும் மனமும்...',
  themeColor: '#ded0b7',
  accentColor: '#8a4852',
  coverImage: '/images/for-you/last-01.png',
  decorativeAsset: '/images/for-you/last-03.png',
  spineText: 'FOR YOU · உனக்காக',
  isPersonalLetterBook: true,
  isSlimPortrait: true,
  aspectRatio: '941 / 1672',

  cover: {
    title: 'For You',
    tamilTitle: 'உனக்காக',
    subtitle: 'Written From the Depths of Silence',
    ornament: '✉ ❦ ✉',
    tag: 'BOOK IV · கடைசிப் புத்தகம்',
    hint: 'Click to open my letter'
  },

  pages: [
    {
      id: 'foryou-01',
      pageNumber: '01',
      title: 'UNSPOKEN BEAUTY',
      subtitle: 'கவிதையாய் நீ',
      background: '/images/for-you/last-01.png',
      alt: 'சில அழகுகள் பூக்களைப் போல மலர்வதில்லை, சில உணர்வுகள் வார்த்தைகளைப் போல வெளிவருவதில்லை... சிலர் நம் வாழ்க்கையில் ஒரு கவிதையாக வருவதில்லை... நம் மனமே அவர்களுக்காக கவிதையாக மாறி விடுகிறது.',
      preserveEmbeddedText: true,
      isSlimPortrait: true,
      aspectRatio: '941 / 1672',
      bgColor: '#d4c1a7',
      textPlacement: 'center'
    },
    {
      id: 'foryou-02',
      pageNumber: '02',
      title: 'MY BEAUTIFUL WORLD',
      subtitle: 'என் உலகம்',
      background: '/images/for-you/last-02.png',
      alt: 'ஒருநாள் நீ இதைப் படித்தால், உன்னை எவ்வளவு நேசித்தேன் என்பதைவிட... உன்னை நினைத்தபோது என் உலகம் எவ்வளவு அழகாக இருந்தது என்பதை மட்டும் புரிந்துகொள். 🌹🤍',
      preserveEmbeddedText: true,
      isSlimPortrait: true,
      aspectRatio: '941 / 1672',
      bgColor: '#c7b59d',
      textPlacement: 'center'
    },
    {
      id: 'foryou-03',
      pageNumber: '03',
      title: 'A SACRED PROMISE',
      subtitle: 'என் பயணம்',
      background: '/images/for-you/last-03.png',
      alt: 'First ivlo thooram pathathuku romba Nandri..! 🤍 ivlo thooram vnathathu la naa enna solla varen nu purunju irukum nu namburen , illanalum na solren... 🥺 "I WANT TO TRAVEL A LIFE WITH YOU!!" ❤️ by - Lokesh லோகேஷ்',
      preserveEmbeddedText: true,
      isSlimPortrait: true,
      aspectRatio: '941 / 1672',
      bgColor: '#ede8e1',
      textPlacement: 'center'
    }
  ],

  // Direct reference to the authentic final message configuration
  finalMessage: finalMessageData
};

export default forYouBook;
