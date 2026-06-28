import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiBurst from '../components/ConfettiBurst';
import './Gifts.css';

const gifts = [
  { id: 1, emoji: '❤️', message: 'My greatest gift is having you by my side—today and always.', gradient: 'pink' },
  { id: 2, emoji: '🌹', message: 'May your smile never fade, because it lights up my entire world.', gradient: 'lavender' },

  { id: 3, emoji: '💍', message: 'Every moment with you feels like a promise of forever.', gradient: 'peach' },

  { id: 4, emoji: '🧸', message: 'Whenever you need a hug, remember my heart is always wrapped around you.', gradient: 'mint' },

  { id: 5, emoji: '🌙', message: 'May every night bring you peace, and every morning remind you how deeply you are loved.', gradient: 'pink' },

  { id: 6, emoji: '✨', message: 'You deserve every beautiful thing this world has to offer.', gradient: 'lavender' },

  { id: 7, emoji: '💖', message: 'Thank you for filling my life with love, laughter, and endless happiness.', gradient: 'peach' },

  { id: 8, emoji: '🎀', message: 'I wish I could gift you the world, but for now, I give you all my love.', gradient: 'mint' },

  { id: 9, emoji: '🌸', message: 'May your heart always bloom with happiness, just as you make mine bloom every day.', gradient: 'pink' },

  { id: 10, emoji: '🫶', message: 'No matter where life takes us, my heart will always choose you.', gradient: 'lavender' },

  { id: 11, emoji: '⭐', message: 'You are the brightest star in my life, and I will never stop cherishing you.', gradient: 'peach' },

  { id: 12, emoji: '🎂', message: 'Happy Birthday, my love. May this year be as beautiful and extraordinary as you are.', gradient: 'mint' },
];

const gradientMap = {
  pink: 'linear-gradient(135deg, #FFD6E0, #FFF0F3)',
  lavender: 'linear-gradient(135deg, #E8D6FF, #F5EEFF)',
  peach: 'linear-gradient(135deg, #FFE5D0, #FFF5ED)',
  mint: 'linear-gradient(135deg, #D6FFE8, #F0FFF5)',
};

function GiftCard({ gift, index }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleReveal = () => {
    if (isRevealed) {
      setIsRevealed(false);
      return;
    }
    setIsRevealed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 100);
  };

  return (
    <motion.div
      className={`gift-card ${isRevealed ? 'gift-card--revealed' : ''}`}
      style={{ background: gradientMap[gift.gradient] }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={handleReveal}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleReveal(); } }}
      aria-label={isRevealed ? gift.message : 'Click to reveal gift'}
      id={`gift-card-${gift.id}`}
    >
      <ConfettiBurst active={showConfetti} duration={3000} pieces={80} />
      <div className="gift-card__shimmer" />

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            className="gift-card__front"
            key="front"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            transition={{ duration: 0.3 }}
          >
            <span className="gift-card__emoji">{gift.emoji}</span>
            <p className="gift-card__hint">Tap to unwrap!</p>
          </motion.div>
        ) : (
          <motion.div
            className="gift-card__back"
            key="back"
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          >
            <span className="gift-card__revealed-emoji">{gift.emoji}</span>
            <p className="gift-card__message">{gift.message}</p>
            <p className="gift-card__close-hint">Tap to wrap again</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Gifts() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper gifts-page">
      <div className="container">
        <h1 className="section-heading">Gifts Just For You 🎁</h1>
        <div className="decorative-divider">✦ ✧ ✦ ✧ ✦</div>
        <p className="section-subtitle">Click each gift to unwrap your surprise!</p>

        <div className="gifts-grid">
          {gifts.map((gift, i) => (
            <GiftCard key={gift.id} gift={gift} index={i} />
          ))}
        </div>

        <motion.div
          className="page-nav"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.button
            className="pill-button pill-button--glow page-nav__btn"
            onClick={() => navigate('/wishes')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            id="gifts-next-button"
          >
            <span>Next: Wishes 💌</span>
            <span className="page-nav__arrow">→</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}


