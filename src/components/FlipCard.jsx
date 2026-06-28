import { useState, useCallback } from 'react';
import './FlipCard.css';

export default function FlipCard({ frontContent, backContent, onFlipComplete, className = '' }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped((prev) => !prev);

    setTimeout(() => {
      setIsAnimating(false);
      if (onFlipComplete) {
        onFlipComplete(!isFlipped);
      }
    }, 600);
  }, [isAnimating, isFlipped, onFlipComplete]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  }, [handleFlip]);

  return (
    <div
      className={`flip-card ${isFlipped ? 'flip-card--flipped' : ''} ${className}`}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Click to flip card"
      id="flip-card"
    >
      <div className="flip-card__inner">
        <div className="flip-card__front">
          {frontContent}
        </div>
        <div className="flip-card__back">
          {backContent}
        </div>
      </div>
    </div>
  );
}
