import PagePopup from './PagePopup';
import { pagesData } from '../../data/pages';

export default function Page2Popup({ onClose, onPlayClick }) {
  const page2Data = pagesData[1];
  const popupData = page2Data?.popup || {
    tamilText: "Naa ungala epdi pakuren nu nenga ennaku ennava irukinga nu",
    englishHint: "How I see you... and what you mean to me",
    tag: "FROM MY HEART"
  };

  return <PagePopup popup={popupData} onClose={onClose} onPlayClick={onPlayClick} />;
}
