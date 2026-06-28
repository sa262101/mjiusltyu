import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './Timeline.css';
import { title } from 'framer-motion/client';

const milestones = [
  { year: '2003', emoji: '👶', title: 'A Star Was Born', description: 'The world became a better place the moment you arrived ✨' },
  { year: '2006', emoji: '🏫', title: 'First Day of School', description: 'Tiny backpack, big dreams — the adventure began!' },
  { year: '2022', emoji: '🎓', title: 'Growing Up', description: 'Finding your passions and becoming who you were meant to be' },
  { year: '2024', emoji: '❤️', title: 'The Statrting of Us', description: 'That special moment when our paths crossed and everything changed' },
  { year: '2025', emoji: '🎂', title: 'My First Birthday With You', description: 'Your first birthday with me ✨, the most special birthday of my life' },
  { year: '2025', emoji: '🥰', title: 'Our First Anniversary', description: 'Our first anniversary together ✨' },
  { year: '2026', emoji: '🧑‍🤝‍🧑', title: 'Completed Our Studies Together', description: 'We completed our studies together' },
  { year: '2026', emoji: '🌍', title: 'That Unforgettable Trip', description: 'Exploring the world and discovering new horizons' },
  { year: '2026', emoji: '💫', title: 'The Best Is Yet to Come', description: 'Every chapter gets better — this is just the beginning!' },
];

function TimelineCard({ milestone, index, side }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className={`timeline-item timeline-item--${side}`} ref={ref}>
      <motion.div
        className="timeline-card glass-card"
        initial={{ opacity: 0, x: side === 'left' ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="timeline-card__year">{milestone.year}</div>
        <div className="timeline-card__emoji">{milestone.emoji}</div>
        <h3 className="timeline-card__title">{milestone.title}</h3>
        <p className="timeline-card__description">{milestone.description}</p>
      </motion.div>
      <div className="timeline-dot">
        <div className="timeline-dot__ring" />
      </div>
    </div>
  );
}

export default function Timeline() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper timeline-page">
      <div className="container">
        <h1 className="section-heading">Your Beautiful Story 🌟</h1>
        <div className="decorative-divider">⋆ ˚ ✦ ˚ ⋆</div>
        <p className="section-subtitle">A journey of incredible moments</p>

        <div className="timeline">
          <div className="timeline__line" />
          {milestones.map((milestone, i) => (
            <TimelineCard
              key={milestone.year}
              milestone={milestone}
              index={i}
              side={i % 2 === 0 ? 'left' : 'right'}
            />
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
            onClick={() => navigate('/reasons')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            id="timeline-next-button"
          >
            <span>Next: Reasons 💖</span>
            <span className="page-nav__arrow">→</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
