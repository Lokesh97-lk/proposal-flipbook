import { pagesData } from '../pages';
import { finalMessageData } from '../finalMessage';

/**
 * Book Four: For You — உனக்காக
 * 
 * The most intimate and personal book in the collection.
 * Connects directly to your authentic six-page illustrated letter
 * and personal final message experience.
 */

export const forYouBook = {
  id: 'for-you',
  title: 'For You',
  tamilTitle: 'உனக்காக',
  subtitle: 'My Words, My Heart & My Sacred Promise',
  shortDescription: 'A private letter written from silence, held close for 7 months.',
  tamilDescription: 'சொல்ல நினைத்த வார்த்தைகளும், உனக்காகக் காத்திருக்கும் மனமும்...',
  themeColor: '#ded0b7',
  accentColor: '#8a4852',
  coverImage: '/images/title-page.png',
  decorativeAsset: '/images/intro/envelope.png',
  spineText: 'FOR YOU · உனக்காக',
  isPersonalLetterBook: true,

  cover: {
    title: 'For You',
    tamilTitle: 'உனக்காக',
    subtitle: 'Written From the Depths of Silence',
    ornament: '✉ ❦ ✉',
    tag: 'BOOK IV · தனிப்பட்ட கடிதம்',
    hint: 'Click to open my letter'
  },

  /* =========================================================================
   * EDITABLE PLACEHOLDER POEM: Labeled clearly as requested so you can replace
   * with your personal words anytime.
   * ========================================================================= */
  introPoemPage: {
    id: 'foryou-intro-poem',
    pageNumber: '01',
    heading: 'Words Held in Silence',
    tamilHeading: 'உனக்காக ஒரு மனம்',
    subtitle: 'From my heart to yours',
    illustration: '/images/popup-bg.jpg',
    poem: [
      'சொல்ல நினைத்த வார்த்தைகள் பல,',
      'சொல்லாமல் மறைத்த உணர்வுகள் பல.',
      'இந்தச் சிறிய புத்தகத்தின் ஒவ்வொரு பக்கத்திலும்,',
      'உனக்காகவே ஒரு மனம் காத்திருக்கிறது.'
    ],
    englishReflection: 'Many words I wished to say, many feelings kept hidden in silence.\nWithin every page of this little book, a heart waits only for you.',
    handwrittenNote: '— With all my honesty and love'
  },

  // Direct reference to the authentic 6 illustrated pages
  letterPages: pagesData,

  // Direct reference to the authentic final message configuration
  finalMessage: finalMessageData
};

export default forYouBook;
