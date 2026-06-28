import { motion, AnimatePresence } from 'framer-motion';
import './ReasonCounter.css';

export default function ReasonCounter({ current, total }) {
  return (
    <div className="reason-counter">
      <span className="reason-counter__label">Reason </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          className="reason-counter__number"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          #{current}
        </motion.span>
      </AnimatePresence>
      <span className="reason-counter__label"> of {total}</span>
    </div>
  );
}
