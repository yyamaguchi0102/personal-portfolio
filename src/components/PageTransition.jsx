import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  
  useEffect(() => {
    // Make loading time shorter for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Hexagon clip paths for the transition
  const hexagonPaths = [
    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
    "polygon(25% 0%, 75% 0%, 100% 40%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 0% 40%)",
  ];
  
  // Create masks for reveal animation - reduced number for faster transition
  const masks = Array.from({ length: 5 }, (_, i) => i);
  
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          className={`fixed inset-0 z-50 overflow-hidden
            ${theme === 'light' 
              ? 'bg-gradient-to-br from-rose-50 via-white to-amber-50' 
              : 'bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900'}`}
          exit={{ 
            opacity: 1,
            transition: { duration: 0.6 }
          }}
        >
          {/* Masked Transition */}
          <div className="absolute inset-0 flex items-center justify-center">
            {masks.map((_, i) => (
              <motion.div
                key={i}
                className={`absolute inset-0 ${theme === 'light' 
                  ? 'bg-rose-500' 
                  : 'bg-indigo-500'}`}
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                exit={{
                  clipPath: 'inset(0% 0% 0% 0%)',
                  transition: {
                    duration: 0.6,
                    delay: i * 0.08, // faster delay
                    ease: [0.645, 0.045, 0.355, 1.000]
                  }
                }}
                style={{
                  clipPath: 'inset(100% 0% 0% 0%)',
                  opacity: 0.9 - (i * 0.15),
                  zIndex: 50 - i
                }}
              />
            ))}
          </div>
          
          {/* Animated Hexagons - reduced number for better performance */}
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 12 }).map((_, i) => {
              const size = Math.random() * 100 + 50;
              const initialX = (Math.random() - 0.5) * window.innerWidth * 0.8;
              const initialY = (Math.random() - 0.5) * window.innerHeight * 0.8;
              
              return (
                <motion.div
                  key={i}
                  className={`absolute ${theme === 'light' 
                    ? 'bg-white/30 border border-rose-200' 
                    : 'bg-indigo-500/10 border border-indigo-700/30'}`}
                  style={{
                    width: size,
                    height: size,
                    x: initialX,
                    y: initialY,
                    clipPath: hexagonPaths[i % hexagonPaths.length],
                  }}
                  animate={{ 
                    rotate: [0, 360],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + (i % 3),
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              );
            })}
          </div>
          
          {/* Animated Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="relative"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.2, delay: 0.3 }
              }}
            >
              {/* Animated Logo - Language Neutral */}
              <motion.div 
                className="relative flex items-center justify-center"
                initial={{ filter: "blur(8px)", opacity: 0, scale: 1.5 }}
                animate={{ 
                  filter: "blur(0px)", 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.4, ease: "easeOut" } 
                }}
                exit={{ 
                  filter: "blur(8px)", 
                  opacity: 0, 
                  scale: 0.8,
                  transition: { duration: 0.3 } 
                }}
              >
                <motion.div 
                  className={`w-24 h-24 rounded-full flex items-center justify-center
                    ${theme === 'light'
                      ? 'bg-gradient-to-br from-rose-400 to-pink-500'
                      : 'bg-gradient-to-br from-indigo-500 to-violet-600'
                    }`}
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 0.95, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div 
                    className={`text-4xl font-bold ${
                      theme === 'light' ? 'text-white' : 'text-white'
                    }`}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotateY: [0, 180, 360],
                    }}
                    transition={{ 
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                  >
                    YY
                  </motion.div>
                </motion.div>
                
                {/* Orbiting Elements */}
                <motion.div
                  className={`absolute w-6 h-6 rounded-full
                    ${theme === 'light' ? 'bg-amber-400' : 'bg-blue-400'}`}
                  animate={{
                    x: [0, 50, 0, -50, 0],
                    y: [50, 0, -50, 0, 50],
                    scale: [1, 1.2, 1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <motion.div
                  className={`absolute w-4 h-4 rounded-full
                    ${theme === 'light' ? 'bg-rose-300' : 'bg-violet-400'}`}
                  animate={{
                    x: [0, -40, 0, 40, 0],
                    y: [-40, 0, 40, 0, -40],
                    scale: [1, 0.8, 1, 0.8, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.5
                  }}
                />
                
                <motion.div
                  className={`absolute w-3 h-3 rounded-full
                    ${theme === 'light' ? 'bg-blue-400' : 'bg-indigo-300'}`}
                  animate={{
                    x: [30, 0, -30, 0, 30],
                    y: [0, 30, 0, -30, 0],
                    scale: [0.8, 1, 0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1
                  }}
                />
              </motion.div>
              
              {/* Pulsing Glow Effect */}
              <motion.div
                className={`absolute inset-0 rounded-full blur-xl -z-10 ${
                  theme === 'light' ? 'bg-rose-500/20' : 'bg-indigo-500/30'
                }`}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.9, 1.3, 0.9],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: "easeOut"
            }
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition; 