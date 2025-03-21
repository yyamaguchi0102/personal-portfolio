import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  // Only show the progress bar after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{ 
        scaleX: scrollYProgress,
        opacity: isVisible ? 1 : 0,
        backgroundColor: theme === 'light' ? 'rgb(244, 63, 94)' : 'rgb(99, 102, 241)',
      }}
      transition={{ opacity: { duration: 0.3 } }}
    />
  );
};

export default ScrollProgress; 