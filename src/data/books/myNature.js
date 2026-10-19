/**
 * Book Two: My Nature — என் இயற்கை
 * 
 * Featuring the authentic illustrations and verses from D:\asset\nature
 * in exact folder order:
 * 1. nature 1.png
 * 2. nature 2.png
 * 3. nature 3.png
 * 4. nature 4.png
 * 5. nature last .png
 */

export const myNatureBook = {
  id: 'my-nature',
  title: 'My Nature',
  tamilTitle: 'என் இயற்கை',
  subtitle: 'The Freshness of Rain, Flowers & Breeze',
  shortDescription: 'The soothing serenity of nature and memories that bloom forever.',
  tamilDescription: 'பூக்களின் அழகிலும் தென்றலின் மென்மையிலும் உன்னை உணர்ந்த தருணம்...',
  themeColor: '#d6cbb8',
  accentColor: '#5c7359',
  coverImage: '/images/nature/nature-01.png',
  decorativeAsset: '/images/nature/nature-05.png',
  spineText: 'MY NATURE · என் இயற்கை',
  aspectRatio: '1024 / 1536',

  cover: {
    title: 'My Nature',
    tamilTitle: 'என் இயற்கை',
    subtitle: 'The Freshness of Rain, Flowers & Breeze',
    ornament: '❀ 𓇬 ❀',
    tag: 'BOOK II · இரண்டாம் புத்தகம்',
    hint: 'Click to open book'
  },

  pages: [
    {
      id: 'nature-01',
      pageNumber: '01',
      title: 'THE SERENITY OF NATURE',
      subtitle: 'இயற்கை',
      background: '/images/nature/nature-01.png',
      alt: 'பூக்களின் அழகிலும் தென்றலின் மென்மையிலும் — முதல் பக்கம்',
      preserveEmbeddedText: true,
      bgColor: '#ebe3d7'
    },
    {
      id: 'nature-02',
      pageNumber: '02',
      title: 'THE GENTLE BREEZE',
      subtitle: 'தென்றல்',
      background: '/images/nature/nature-02.png',
      alt: 'தென்றலின் வருடல் — இரண்டாம் பக்கம்',
      preserveEmbeddedText: true,
      bgColor: '#eae2d6'
    },
    {
      id: 'nature-03',
      pageNumber: '03',
      title: 'WHISPERS OF RAIN',
      subtitle: 'சாரல்',
      background: '/images/nature/nature-03.png',
      alt: 'மழையின் சாரலும் அமைதியும் — மூன்றாம் பக்கம்',
      preserveEmbeddedText: true,
      bgColor: '#ece5da'
    },
    {
      id: 'nature-04',
      pageNumber: '04',
      title: 'EVERGREEN MEMORIES',
      subtitle: 'வாடாத பூக்கள்',
      background: '/images/nature/nature-04.png',
      alt: 'வாடாத வசந்தம் — நான்காம் பக்கம்',
      preserveEmbeddedText: true,
      bgColor: '#ede6db'
    },
    {
      id: 'nature-05',
      pageNumber: '05',
      title: 'PEACE IN MY WORLD',
      subtitle: 'என் அமைதி',
      background: '/images/nature/nature-05.png',
      alt: 'என் மனதில் நீ பூத்த அமைதி — இறுதிப் பக்கம்',
      preserveEmbeddedText: true,
      bgColor: '#e9e1d4'
    }
  ]
};

export default myNatureBook;
