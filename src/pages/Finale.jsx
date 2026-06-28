import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiBurst from '../components/ConfettiBurst';
import './Finale.css';

/* Flower petals for the letter background */
const PETAL_EMOJIS = ['🌸', '🌺', '🌷', '🌹', '💐', '🌼', '🪷'];

function LetterFlowers() {
  const petals = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        emoji: PETAL_EMOJIS[i % PETAL_EMOJIS.length],
        left: `${Math.random() * 100}%`,
        size: 16 + Math.random() * 14,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        opacity: 0.3 + Math.random() * 0.4,
      })),
    [],
  );

  return (
    <div className="letter-flowers" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="letter-flower"
          style={{
            left: p.left,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

export default function Finale() {
  const navigate = useNavigate();
  const [envelopeState, setEnvelopeState] = useState('closed'); // closed | opening | open
  const [showLetter, setShowLetter] = useState(false);

  const stars = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 16,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 12,
      opacity: 0.2 + Math.random() * 0.5,
      type: Math.random() > 0.5 ? '✨' : '⭐',
    }));
  }, []);

  const hearts = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 16,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.25,
    }));
  }, []);

  const handleEnvelopeClick = () => {
    if (envelopeState === 'closed') {
      setEnvelopeState('opening');
      setTimeout(() => {
        setEnvelopeState('open');
        setTimeout(() => setShowLetter(true), 400);
      }, 600);
    }
  };

  return (
    <div className="finale-page">
      <ConfettiBurst active={true} duration={60000} pieces={50} />

      {/* Starfield + Hearts Background */}
      <div className="finale-bg" aria-hidden="true">
        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="finale-star"
            style={{
              left: `${star.left}%`,
              fontSize: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              opacity: star.opacity,
            }}
          >
            {star.type}
          </div>
        ))}
        {hearts.map((heart) => (
          <div
            key={`heart-${heart.id}`}
            className="finale-heart"
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

      <motion.div
        className="finale-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="finale-emoji"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', damping: 10 }}
        >
          ✨
        </motion.div>

        <motion.h1
          className="finale-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          You make every day brighter
        </motion.h1>

        <motion.p
          className="finale-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Thank you for being the incredible person you are.
          <br />
          Here's to another amazing year! 🥂
        </motion.p>

        {/* Envelope / Love Letter */}
        <motion.div
          className="envelope-area"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring', damping: 14 }}
        >
          <AnimatePresence mode="wait">
            {!showLetter && (
              <motion.div
                className={`envelope ${envelopeState !== 'closed' ? 'envelope--opened' : ''}`}
                onClick={handleEnvelopeClick}
                whileHover={envelopeState === 'closed' ? { scale: 1.08, y: -8, rotate: [0, -2, 2, -1, 0] } : {}}
                whileTap={envelopeState === 'closed' ? { scale: 0.95 } : {}}
                exit={{ scale: 0, opacity: 0, rotate: 10 }}
                transition={{ exit: { duration: 0.4, ease: 'easeIn' } }}
                role="button"
                tabIndex={0}
                aria-label="Click to open the love letter"
                id="envelope-button"
              >
                {/* Shimmer overlay */}
                <div className="envelope__shimmer" />

                {/* Envelope body */}
                <div className="envelope__body">
                  <motion.div
                    className="envelope__heart"
                    animate={envelopeState === 'closed' ? {
                      scale: [1, 1.15, 1],
                      filter: [
                        'drop-shadow(0 0 8px rgba(255,200,50,0.3))',
                        'drop-shadow(0 0 20px rgba(255,200,50,0.6))',
                        'drop-shadow(0 0 8px rgba(255,200,50,0.3))',
                      ],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    💌
                  </motion.div>
                </div>

                {/* Envelope flap */}
                <div className={`envelope__flap ${envelopeState !== 'closed' ? 'envelope__flap--open' : ''}`} />

                {/* Letter peeking out */}
                <AnimatePresence>
                  {envelopeState === 'open' && (
                    <motion.div
                      className="envelope__letter-peek"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: -90, opacity: 1 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.15 }}
                    >
                      <motion.span
                        className="envelope__letter-peek-text"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: 2 }}
                      >
                        💖
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {envelopeState === 'closed' && (
                  <motion.p
                    className="envelope__hint"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Tap to open your letter 💌
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Expanded Letter Overlay */}
        <AnimatePresence>
          {showLetter && (
            <motion.div
              className="letter-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                setShowLetter(false);
                setEnvelopeState('closed');
              }}
            >
              <LetterFlowers />

              <motion.div
                className="letter"
                initial={{ scale: 0.3, opacity: 0, rotateX: 40 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.3, opacity: 0, rotateX: 40 }}
                transition={{ type: 'spring', damping: 16, stiffness: 100 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="letter__header">
                  <span className="letter__flower-left">🌸</span>
                  <span className="letter__flower-right">🌸</span>
                  <p className="letter__date">June 28, 2026</p>
                </div>

                <div className="letter__body">
                  <p className="letter__greeting">To my Mistu, ❤️</p>

                  <p className="letter__text">
                    I don't even know where to start because there are so many things I feel for you that words will never be enough.
                  </p>

                  <p className="letter__text">
                    Thank you for being my person. for choosing me. for loving me even on the days I'm hard to love. You make my world feel so safe, so warm, and so full of love.
                  </p>

                  <p className="letter__text">
                    You make the little things in life so much better just by being in it. Your kindness, your patience,your smile,your hugs, your kisses, your every touch, I fall in love with you every day. I'm so lucky to have you.
                  </p>

                  <p className="letter__text">
                    I promise to always be by your side, to support your dreams, to celebrate your wins, and to love you through everything. I can't wait to see what our future holds, but even more, I can't wait to continue making memories with you.
                  </p>

                  <p className="letter__text">
                    Thank you for being you and for being mine. ❤️
                  </p>

                  <p className="letter__closing">
                    I love you,
                    <br />
                    <span className="letter__signature">always. ❤️</span>
                  </p>
                </div>

                <div className="letter__footer">
                  <span>🌷</span>
                  <span className="letter__close-hint">Tap outside to close</span>
                  <span>🌷</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="pill-button pill-button--glow finale-restart"
          onClick={() => navigate('/')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          id="finale-restart-button"
        >
          <span>Restart the Magic</span>
          <span>✨</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
