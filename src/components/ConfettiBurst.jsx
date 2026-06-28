import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

export default function ConfettiBurst({ active = false, duration = 5000, pieces = 200, colors }) {
  const [showConfetti, setShowConfetti] = useState(active);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (active) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!showConfetti) return null;

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={pieces}
      recycle={false}
      colors={colors || ['#E0527A', '#F5C842', '#F28DA8', '#FFD6E0', '#FFF5F7', '#C43A60', '#FAEAB0']}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 'var(--z-confetti)', pointerEvents: 'none' }}
    />
  );
}
