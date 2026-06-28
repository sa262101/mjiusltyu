import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Memories.css';

const photos = [
  { id: 1, seed: 'birthday1', caption: 'That one summer... 🌊' },
  { id: 2, seed: 'birthday2', caption: 'Laughing until we cried 😂' },
  { id: 3, seed: 'birthday3', caption: 'Golden hour magic ✨' },
  { id: 4, seed: 'birthday4', caption: 'Adventures together 🗺️' },
  { id: 5, seed: 'birthday5', caption: 'The best surprise ever 🎉' },
  { id: 6, seed: 'birthday6', caption: 'Just being us 💕' },
  { id: 7, seed: 'birthday7', caption: 'Chasing sunsets 🌅' },
  { id: 8, seed: 'birthday8', caption: 'Cozy days in ☕' },
  { id: 9, seed: 'birthday9', caption: 'Dancing in the rain 🌧️' },
  { id: 10, seed: 'birthday10', caption: 'Forever grateful 🙏' },
];

function PhotoCard({ photo, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const rotation = index % 2 === 0 ? -2 : 2;

  return (
    <motion.div
      ref={ref}
      className="photo-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      style={{ '--rotation': `${rotation}deg` }}
    >
      <div className="photo-card__frame">
        <div className="photo-card__image-wrapper">
          <img
            src={`https://picsum.photos/seed/${photo.seed}/400/500`}
            alt={photo.caption}
            className="photo-card__image"
            loading="lazy"
          />
          <div className="photo-card__overlay">
            <p className="photo-card__caption">{photo.caption}</p>
          </div>
        </div>
        <div className="photo-card__label">
          <p>{photo.caption}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Memories() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper memories-page">
      <div className="container">
        <h1 className="section-heading">Our Beautiful Memories 📸</h1>
        <div className="decorative-divider">✿ ❀ ✿ ❀ ✿</div>
        <p className="section-subtitle">Every picture tells a story of joy and love</p>

        <div className="photo-grid">
          {photos.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>

        <motion.div
          className="memories-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button
            className="pill-button pill-button--primary memories-nav__btn"
            onClick={() => navigate('/gifts')}
            id="memories-next-button"
          >
            <span>Open Your Gifts</span>
            <span className="memories-nav__arrow">→</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
