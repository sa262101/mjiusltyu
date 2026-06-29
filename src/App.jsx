import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import MusicToggle from './components/MusicToggle';
import Hero from './pages/Hero';
import Gifts from './pages/Gifts';
import Wishes from './pages/Wishes';
import Timeline from './pages/Timeline';
import Reasons from './pages/Reasons';
import Finale from './pages/Finale';

const TARGET_DATE = new Date('2026-07-01T00:00:00+05:30');

function isCountdownActive() {
  return new Date() < TARGET_DATE;
}

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: 'easeInOut' },
};

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}

/* Redirect to home if countdown is still active */
function CountdownGuard({ children }) {
  if (isCountdownActive()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
        <Route path="/gifts" element={<CountdownGuard><PageWrapper><Gifts /></PageWrapper></CountdownGuard>} />
        <Route path="/wishes" element={<CountdownGuard><PageWrapper><Wishes /></PageWrapper></CountdownGuard>} />
        <Route path="/timeline" element={<CountdownGuard><PageWrapper><Timeline /></PageWrapper></CountdownGuard>} />
        <Route path="/reasons" element={<CountdownGuard><PageWrapper><Reasons /></PageWrapper></CountdownGuard>} />
        <Route path="/finale" element={<CountdownGuard><PageWrapper><Finale /></PageWrapper></CountdownGuard>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [countdown, setCountdown] = useState(isCountdownActive);

  useEffect(() => {
    if (!countdown) return; // already past the date, no need to poll
    const id = setInterval(() => {
      if (!isCountdownActive()) {
        setCountdown(false);
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [countdown]);

  return (
    <HashRouter>
      {!countdown && <ScrollProgressBar />}
      {!countdown && <Navbar />}
      <AnimatedRoutes />
      {!countdown && <MusicToggle />}
    </HashRouter>
  );
}

