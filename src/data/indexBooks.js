import myMoonBook from './books/myMoon';
import myNatureBook from './books/myNature';
import mineUniverseBook from './books/mineUniverse';
import forYouBook from './books/forYou';

export const indexBooks = [
  {
    id: 'my-moon',
    number: '01',
    tamilNumber: '௧',
    title: 'My Moon',
    tamilTitle: 'என் நிலா',
    subtitle: 'The Quiet Light in the Night Sky',
    description: 'ஒரு நாள் வானத்தைப் பார்த்தேன் — நிலவு இருந்தது...',
    tamilPoeticIntro: 'ஒரு நாள் வானத்தைப் பார்த்தேன் — நிலவு இருந்தது...\nமறுநாள் உன் முகம் பார்த்தேன் — அதே நிலவே நீ...',
    coverImage: '/images/moon/moon-01.png',
    previewArtwork: '/images/moon/moon-01.png',
    accentColor: '#8a4852',
    iconSymbol: '☾',
    isLandscape: true,
    bookData: myMoonBook
  },
  {
    id: 'my-nature',
    number: '02',
    tamilNumber: '௨',
    title: 'My Nature',
    tamilTitle: 'என் இயற்கை',
    subtitle: 'Rain, Flowers & Serenity',
    description: 'The freshness of flowers, breeze, and peace found in someone special.',
    tamilPoeticIntro: 'பூக்களின் அழகிலும்,\nதென்றலின் மென்மையிலும் உன்னை உணர்ந்தேன்...',
    coverImage: '/images/nature/nature-01.png',
    previewArtwork: '/images/nature/nature-01.png',
    accentColor: '#5c7359',
    iconSymbol: '❀',
    bookData: myNatureBook
  },
  {
    id: 'mine-universe',
    number: '03',
    tamilNumber: '௩',
    title: 'Some More Random Thoughts',
    tamilTitle: 'சில நினைவுகள்',
    subtitle: 'Quiet Musings & Sudden Reflections',
    description: 'A little collection of spontaneous thoughts, memories, and quiet feelings.',
    tamilPoeticIntro: 'நான் அவளோடு கனவில் வாழத் துவங்கினேன்...\nஅப்போது இந்த இனிமையான நினைவுகளுக்குத் தெரியவில்லை...',
    coverImage: '/images/thoughts/thoughts-01.png',
    previewArtwork: '/images/thoughts/thoughts-01.png',
    accentColor: '#3a4b66',
    iconSymbol: '✧',
    bookData: mineUniverseBook
  },
  {
    id: 'for-you',
    number: '04',
    tamilNumber: '௪',
    title: 'For You',
    tamilTitle: 'உனக்காக',
    subtitle: 'My Words, My Heart & My Sacred Promise',
    description: 'The authentic handwritten letter, spoken straight from the heart.',
    tamilPoeticIntro: 'சில அழகுகள் பூக்களைப் போல மலர்வதில்லை...\nநம் மனமே அவர்களுக்காக கவிதையாக மாறி விடுகிறது...',
    coverImage: '/images/for-you/last-01.png',
    previewArtwork: '/images/for-you/last-01.png',
    accentColor: '#8a4852',
    iconSymbol: '✉',
    isSlimPortrait: true,
    aspectRatio: '941 / 1672',
    bookData: forYouBook
  }
];

export const getBookById = (id) => {
  return indexBooks.find((book) => book.id === id) || indexBooks[0];
};

export default indexBooks;
