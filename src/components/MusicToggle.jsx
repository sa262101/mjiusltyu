import { useState, useRef } from 'react';
import './MusicToggle.css';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked by browser
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        {/* Drop a birthday.mp3 in public/ folder and update src */}
        <source src="/birthday.mp3" type="audio/mpeg" />
      </audio>
      <button
        className={`music-toggle ${isPlaying ? 'music-toggle--playing' : ''}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        id="music-toggle-button"
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        <span className="music-toggle__icon">{isPlaying ? '🎵' : '🔇'}</span>
      </button>
    </>
  );
}
