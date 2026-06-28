import { useMemo } from 'react';
import './PetalRain.css';

export default function PetalRain({ count = 25 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 6 + Math.random() * 10,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      opacity: 0.3 + Math.random() * 0.5,
      hue: 340 + Math.random() * 20, // Rose-pink range
    }));
  }, [count]);

  return (
    <div className="petal-rain" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.4}px`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            opacity: petal.opacity,
            background: `hsl(${petal.hue}, 80%, 80%)`,
          }}
        />
      ))}
    </div>
  );
}
