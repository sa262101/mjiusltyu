import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PetalRain from '../components/PetalRain';
import ConfettiBurst from '../components/ConfettiBurst';
import './Hero.css';

// Target: July 1, 2026 00:00:00 IST (UTC+5:30)
const TARGET_DATE = new Date('2026-07-01T00:00:00+05:30');

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/* ---- Floating particles for countdown background ---- */
function CountdownParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 8,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [],
  );

  return (
    <div className="countdown-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="countdown-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ---- Single countdown unit (days / hours / mins / secs) ---- */
const digitVariants = {
  initial: { opacity: 0, y: 30, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

function CountdownUnit({ value, label, index }) {
  return (
    <motion.div
      className="countdown-unit"
      variants={digitVariants}
      initial="initial"
      animate="animate"
      transition={{ delay: 0.15 * index, type: 'spring', damping: 14 }}
    >
      <div className="countdown-value-wrapper">
        <AnimatePresence mode="popLayout">
          <motion.span
            className="countdown-value"
            key={value}
            initial={{ opacity: 0, y: -20, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.7 }}
            transition={{ type: 'spring', damping: 18, stiffness: 200 }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="countdown-label">{label}</span>
    </motion.div>
  );
}

/* ---- Main Hero component ---- */
export default function Hero() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [showConfetti, setShowConfetti] = useState(true);
  const [cakeClicks, setCakeClicks] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [surpriseConfetti, setSurpriseConfetti] = useState(false);

  /* countdown tick */
  useEffect(() => {
    if (!timeLeft) return;
    const id = setInterval(() => {
      const t = getTimeLeft();
      if (!t) {
        clearInterval(id);
        setShowConfetti(true); // burst confetti when countdown ends!
      }
      setTimeLeft(t);
    }, 1000);
    return () => clearInterval(id);
  }, [timeLeft === null]); // only re-subscribe when null-ness changes

  const handleCakeClick = useCallback(() => {
    const newCount = cakeClicks + 1;
    setCakeClicks(newCount);
    if (newCount >= 5) {
      setShowSurprise(true);
      setSurpriseConfetti(true);
      setCakeClicks(0);
    }
  }, [cakeClicks]);

  /* ===== COUNTDOWN SCREEN ===== */
  if (timeLeft) {
    return (
      <div className="countdown-page">
        <CountdownParticles />

        <motion.div
          className="countdown-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="countdown-emoji"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 10 }}
          >
            🎁
          </motion.div>

          <motion.h1
            className="countdown-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Something Special is Coming…
          </motion.h1>

          <motion.p
            className="countdown-sub"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            The celebration begins on <strong>July 1st</strong> 🎂
          </motion.p>

          <div className="countdown-timer">
            <CountdownUnit value={timeLeft.days} label="Days" index={0} />
            <span className="countdown-colon">:</span>
            <CountdownUnit value={timeLeft.hours} label="Hours" index={1} />
            <span className="countdown-colon">:</span>
            <CountdownUnit value={timeLeft.minutes} label="Minutes" index={2} />
            <span className="countdown-colon">:</span>
            <CountdownUnit value={timeLeft.seconds} label="Seconds" index={3} />
          </div>

          <motion.p
            className="countdown-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            ✨ Stay tuned — it'll be worth the wait! ✨
          </motion.p>
        </motion.div>
      </div>
    );
  }

  /* ===== NORMAL HERO (after countdown) ===== */
  return (
    <div className="hero-page">
      <PetalRain count={30} />
      <ConfettiBurst active={showConfetti} duration={5000} pieces={250} />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="hero-cake"
          onClick={handleCakeClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          role="button"
          tabIndex={0}
          aria-label="Birthday cake — click 5 times for a surprise!"
          id="hero-cake"
        >
          🎂
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Happy Birthday Mistu<span className="hero-title__emoji">🥰</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Wishing you a day as magical as you are 🌸
        </motion.p>

        <motion.button
          className="hero-cta pill-button pill-button--glow"
          onClick={() => navigate('/gifts')}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          id="hero-enter-button"
        >
          <span>Enter</span>
          <span className="hero-cta__arrow">→</span>
        </motion.button>
      </motion.div>

      {/* Easter Egg Surprise Overlay */}
      {showSurprise && (
        <motion.div
          className="surprise-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            setShowSurprise(false);
            setSurpriseConfetti(false);
          }}
        >
          <ConfettiBurst active={surpriseConfetti} duration={8000} pieces={400} />
          <motion.div
            className="surprise-content"
            initial={{ scale: 0.3, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12 }}
          >
            <div className="surprise-emoji">🎉</div>
            <h2 className="surprise-title">SURPRISE!</h2>
            <p className="surprise-message">
              You found the secret! You're even more special than you know! 💖✨
            </p>
            <p className="surprise-hint">Click anywhere to close</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
