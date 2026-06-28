import { useState, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import ConfettiBurst from '../components/ConfettiBurst';
import ReasonCounter from '../components/ReasonCounter';
import { reasons, shuffleReasons } from '../data/reasons';
import './Reasons.css';

export default function Reasons() {
  const [shuffledReasons, setShuffledReasons] = useState(() => shuffleReasons(reasons));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiKey = useRef(0);

  const currentReason = shuffledReasons[currentIndex];

  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 18,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.3,
    }));
  }, []);

  const handleFlip = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped(true);
    confettiKey.current += 1;
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setIsAnimating(false);
    }, 600);
  }, [isAnimating]);

  const handleNextReason = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Flip back first
    setIsFlipped(false);

    setTimeout(() => {
      // Move to next reason
      let nextIndex = currentIndex + 1;
      if (nextIndex >= shuffledReasons.length) {
        // Reshuffle and reset
        setShuffledReasons(shuffleReasons(reasons));
        nextIndex = 0;
      }
      setCurrentIndex(nextIndex);

      // Flip to front briefly then auto-flip to back
      setTimeout(() => {
        setIsFlipped(true);
        confettiKey.current += 1;
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          setIsAnimating(false);
        }, 600);
      }, 200);
    }, 400);
  }, [isAnimating, currentIndex, shuffledReasons.length]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isFlipped) {
        handleFlip();
      } else {
        handleNextReason();
      }
    }
  }, [isFlipped, handleFlip, handleNextReason]);

  return (
    <motion.div
      className="page-wrapper reasons-page"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating Hearts Background */}
      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              opacity: heart.opacity,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="container reasons-container">
        <h1 className="section-heading">Reasons Why You're Awesome 💖</h1>
        <p className="section-subtitle">Click the card and discover why you're so loved...</p>

        {/* Counter */}
        <div className="reasons-counter-wrapper">
          <ReasonCounter current={currentIndex + 1} total={reasons.length} />
        </div>

        {/* Flip Card */}
        <div
          className={`reasons-flip-card ${isFlipped ? 'reasons-flip-card--flipped' : ''}`}
          onClick={isFlipped ? handleNextReason : handleFlip}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={isFlipped ? currentReason : 'Click to reveal a reason'}
          id="reasons-flip-card"
        >
          <ConfettiBurst key={confettiKey.current} active={showConfetti} duration={2500} pieces={60} />
          <div className="reasons-flip-card__inner">
            <div className="reasons-flip-card__front">
              <div className="reasons-flip-card__sparkle">✨</div>
              <p className="reasons-flip-card__prompt">Click to reveal a reason...</p>
            </div>
            <div className="reasons-flip-card__back">
              <p className="reasons-flip-card__reason">{currentReason}</p>
            </div>
          </div>
        </div>

        {/* Another Reason Button */}
        <motion.button
          className="pill-button pill-button--primary reasons-next-btn"
          onClick={handleNextReason}
          disabled={isAnimating}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          id="reasons-next-button"
        >
          Another Reason 💕
        </motion.button>
      </div>
    </motion.div>
  );
}
