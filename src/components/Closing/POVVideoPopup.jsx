import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { finalMessageData } from '../../data/finalMessage';
import soundEngine from '../../utils/audioUtils';

export default function POVVideoPopup({ onClose, onPlayClick }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  const config = finalMessageData.povVideoPopup || {
    tag: "( this you on my POV ) 🥺❤️",
    title: "( this you on my POV ) 🥺❤️",
    subtitle: "A glimpse of you through my eyes...",
    videoSrc: "/video/pov.mp4",
    youtubeUrl: "",
    caption: "Forever my favorite view ✨",
    closeButtonText: "CLOSE"
  };

  const [hasVideoError, setHasVideoError] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Smooth entrance animation
  useEffect(() => {
    if (overlayRef.current && cardRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 22, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, delay: 0.1, ease: 'back.out(1.15)' }
      );
    }

    return () => {
      // Resume background music if popup is unmounted while playing
      soundEngine.playAmbient();
    };
  }, []);

  const handleDismiss = () => {
    if (onPlayClick) onPlayClick();

    // Pause video and resume ambient
    if (videoRef.current) {
      videoRef.current.pause();
    }
    soundEngine.playAmbient();

    if (overlayRef.current && cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: -14,
        scale: 0.96,
        duration: 0.32,
        ease: 'power2.in'
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.32,
        delay: 0.04,
        ease: 'power2.in',
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  // Video playback events
  const handleVideoPlay = () => {
    setIsPlaying(true);
    // Pause background music so it doesn't clash with video audio
    soundEngine.stopAmbient();
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    soundEngine.playAmbient();
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    soundEngine.playAmbient();
  };

  const handleVideoError = () => {
    if (!selectedVideoUrl) {
      setHasVideoError(true);
    }
  };

  // Allow selecting local video directly for instant testing
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedVideoUrl(url);
      setHasVideoError(false);
    }
  };

  const activeVideoSrc = selectedVideoUrl || config.videoSrc || '/video/pov.mp4';
  const youtubeUrl = config.youtubeUrl;

  return (
    <div
      ref={overlayRef}
      className="pov-popup-overlay"
      role="dialog"
      aria-label="POV Video"
      tabIndex={-1}
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          handleDismiss();
        }
      }}
    >
      <div
        ref={cardRef}
        className="pov-popup-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* '×' Close button in top-right */}
        <button
          className="pov-popup-close-btn"
          onClick={handleDismiss}
          aria-label="Close message"
          autoFocus
        >
          ×
        </button>

        {/* Header Tag */}
        <div className="pov-popup-tag">
          ✦ {config.tag || "( this you on my POV ) 🥺❤️"} ✦
        </div>

        {/* Subtitle */}
        {config.subtitle && (
          <p className="pov-popup-subtitle">
            {config.subtitle}
          </p>
        )}

        {/* Video Container */}
        <div className="pov-video-container">
          {youtubeUrl ? (
            <div className="pov-youtube-wrapper">
              <iframe
                src={youtubeUrl}
                title="POV Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="pov-iframe-element"
              />
            </div>
          ) : !hasVideoError ? (
            <div className="pov-video-player-wrapper">
              <video
                ref={videoRef}
                src={activeVideoSrc}
                className="pov-video-element"
                controls
                playsInline
                preload="metadata"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={handleVideoEnded}
                onError={handleVideoError}
              />
            </div>
          ) : (
            <div className="pov-video-placeholder">
              <span className="pov-placeholder-icon">📹 🥺❤️</span>
              <p className="pov-placeholder-text">
                &ldquo;{config.title || "( this you on my POV )"}&rdquo;
              </p>
              <p className="pov-placeholder-hint">
                Place your video in <code>public/video/pov.mp4</code>
              </p>
              <label className="pov-choose-file-btn">
                <span>Choose Video File</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          )}
        </div>

        {/* Romantic Caption */}
        {config.caption && (
          <p className="pov-popup-caption">
            {config.caption}
          </p>
        )}

        {/* Bottom Close Button */}
        <button
          className="pov-popup-continue-btn"
          onClick={handleDismiss}
        >
          {config.closeButtonText || "CLOSE"}
        </button>
      </div>
    </div>
  );
}
