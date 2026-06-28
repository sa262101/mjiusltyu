import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Wishes.css';

const initialWishes = [
  { id: 1, text: 'Happy Birthday, my love! May your smile shine brighter than every star in the sky. ❤️', icon: '❤️', color: '#FFD6E0' },

  { id: 2, text: 'Every day with you is a blessing, and today I celebrate the most beautiful person in my life. 🌸', icon: '🌸', color: '#FFF0A0' },

  { id: 3, text: 'May your heart always be filled with the same happiness you bring into my life. ✨', icon: '✨', color: '#D6F0FF' },

  { id: 4, text: 'I hope every dream you hold close to your heart comes true this year and always. 💫', icon: '🦋', color: '#E8D6FF' },

  { id: 5, text: 'You deserve all the love, laughter, and beautiful moments the world has to offer. 🌹', icon: '❤️', color: '#FFE5D0' },

  { id: 6, text: 'Thank you for making my life brighter just by being in it. Happy Birthday, sweetheart! 🥰', icon: '🌸', color: '#FFD6E0' },

  { id: 7, text: 'May today be filled with unforgettable memories, warm hugs, and endless smiles. 🎉', icon: '✨', color: '#D6F0FF' },

  { id: 8, text: 'You are my favorite hello, my sweetest memory, and my forever happiness. 💖', icon: '🦋', color: '#FFF0A0' },

  { id: 9, text: 'I wish I could wrap my heart as your birthday gift because it belongs to you. 🎁', icon: '❤️', color: '#FFD6E0' },

  { id: 10, text: 'No matter how many birthdays pass, you will always be the most beautiful part of my life. 🌷', icon: '🌸', color: '#FFE5D0' },

  { id: 11, text: 'May your days be filled with peace, your nights with sweet dreams, and your heart with endless love. 🌙', icon: '✨', color: '#D6F0FF' },

  { id: 12, text: 'Loving you is the easiest and most beautiful thing I have ever done. ❤️', icon: '🦋', color: '#E8D6FF' },

  { id: 13, text: 'You are my sunshine after every storm and my reason to smile every day. ☀️', icon: '❤️', color: '#FFF0A0' },

  { id: 14, text: 'I pray that life always protects your beautiful heart and blesses you with endless happiness. 🙏', icon: '🌸', color: '#FFD6E0' },

  { id: 15, text: 'May every heartbeat remind you that someone loves you more than words can ever express. 💓', icon: '✨', color: '#FFE5D0' },

  { id: 16, text: 'Your happiness is my favorite wish, today and for every year to come. 🌈', icon: '🦋', color: '#D6F0FF' },

  { id: 17, text: 'Thank you for choosing me, believing in me, and making every day feel magical. ✨', icon: '❤️', color: '#E8D6FF' },

  { id: 18, text: 'If I could make one wish today, it would be to spend every birthday by your side forever. 💍', icon: '🌸', color: '#FFF0A0' },

  { id: 19, text: 'May your laughter always echo through our lives because it is my favorite melody. 🎶', icon: '✨', color: '#FFD6E0' },

  { id: 20, text: 'Happy Birthday to the love of my life. Thank you for making my world more beautiful every single day. I love you endlessly. ❤️', icon: '🦋', color: '#D6F0FF' },
];

const rotations = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2.5];
const colors = ['#FFD6E0', '#FFF0A0', '#D6F0FF', '#E8D6FF', '#FFE5D0'];
const icons = ['❤️', '🌸', '✨', '🦋', '💕'];

export default function Wishes() {
  const [wishes, setWishes] = useState(initialWishes);
  const navigate = useNavigate();

  return (
    <div className="page-wrapper wishes-page">
      <div className="container">
        <h1 className="section-heading">Wishes From The Heart 💌</h1>
        <div className="decorative-divider">♡ ♥ ♡ ♥ ♡</div>
        <p className="section-subtitle">Heartfelt messages filled with love</p>

        <div className="wishes-wall">
          <AnimatePresence>
            {wishes.map((wish, i) => (
              <motion.div
                key={wish.id}
                className="wish-card"
                style={{
                  backgroundColor: wish.color,
                  '--rotation': `${rotations[i % rotations.length]}deg`,
                }}
                initial={{ opacity: 0, scale: 0.6, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: rotations[i % rotations.length] }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: i < initialWishes.length ? i * 0.08 : 0 }}
                layout
              >
                <span className="wish-card__icon">{wish.icon}</span>
                <p className="wish-card__text">{wish.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="page-nav"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.button
            className="pill-button pill-button--glow page-nav__btn"
            onClick={() => navigate('/timeline')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            id="wishes-next-button"
          >
            <span>Next: Timeline ✨</span>
            <span className="page-nav__arrow">→</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}


