import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { Typewriter } from "react-simple-typewriter";
import { motion, useAnimation, AnimatePresence, useSpring } from "framer-motion";
import { languages } from "../languages.js";
import ReactDOM from "react-dom";

const FloatingElement = ({ children, delay = 0, duration = 4, y = 15 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -y, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// 3D Text with floating interaction and parallax effect
const Perspective3DText = ({ children }) => {
  // Simplified component that doesn't respond to cursor movement
  return (
    <div className="py-2 inline-block overflow-hidden">
      {children}
    </div>
  );
};

// Modal Portal to render content to document.body
const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

const Home = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const currentLanguage = languages[language];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const controls = useAnimation();
  
  // Reset animations when language changes
  useEffect(() => {
    // Reset and restart animations
    controls.stop();
    controls.set({ opacity: 0, y: -50 });
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    });
  }, [controls, language]); // Add language as a dependency

  // Manage scroll lock when modal is open
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    if (isModalOpen) {
      // Disable scrolling
      if (scrollContainer) scrollContainer.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      if (scrollContainer) scrollContainer.style.overflow = 'auto';
    }
    
    // Cleanup function to ensure scrolling is re-enabled
    return () => {
      if (scrollContainer) scrollContainer.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    
    // If opening the modal, scroll to top of the home section
    if (!isModalOpen) {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        const scrollContainer = document.querySelector('.scroll-container');
        if (scrollContainer) {
          setTimeout(() => {
            scrollContainer.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-visible pt-28 pb-32"
    >
      <div className="container mx-auto px-4 relative flex items-center justify-center min-h-[80vh]">
        {/* Main content - centered with wider max-width */}
        <motion.div
          key={`home-content-${language}`} // Add key based on language to force remount
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
        >
          <FloatingElement delay={0.2} duration={6} y={8}>
            <motion.div 
              key={`home-title-${language}`} // Add key to force remount when language changes
              className="text-5xl sm:text-6xl font-bold mb-6 leading-tight inline-block"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.7, 
                type: "spring", 
                stiffness: 50 
              }}
            >
              <Perspective3DText>
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  theme === "light" 
                    ? "from-rose-600 to-pink-600" 
                    : "from-indigo-400 to-violet-400"
                }`}>
                  {currentLanguage.home.name}
                </span>
              </Perspective3DText>
            </motion.div>
          </FloatingElement>

          <motion.h2 
            key={`home-subtitle-${language}`} // Add key to force remount when language changes
            className={`text-2xl sm:text-3xl font-medium mb-6
              ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ 
              duration: 0.7,
              delay: 0.4,
              ease: "easeOut"
            }}
          >
            <span className="flex items-center justify-center space-x-2 flex-wrap">
              <span>{currentLanguage.home.staticPhrase}</span>{" "}
              <Perspective3DText>
                <span className={`font-bold ${
                  theme === "light" ? "text-rose-500" : "text-indigo-400"
                }`}>
                  <Typewriter
                    words={currentLanguage.home.typewriter}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </span>
              </Perspective3DText>
            </span>
          </motion.h2>

          <motion.p 
            key={`home-intro-${language}`} // Add key to force remount when language changes
            className={`text-lg mb-8 leading-relaxed max-w-2xl mx-auto
              ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.6,
              ease: "easeOut" 
            }}
          >
            {currentLanguage.home.intro}
          </motion.p>

          <motion.div 
            key={`home-buttons-${language}`} // Add key to force remount when language changes
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.8
            }}
          >
            <motion.a
              href="https://www.linkedin.com/in/yutaka-yamaguchi" 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              whileHover={{ scale: 1.03, rotate: 0 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative px-8 py-4 rounded-xl font-semibold overflow-hidden shadow-lg
                ${theme === "light"
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-500/10"
                  : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-indigo-500/10"
                }`}
            >
              <motion.div 
                className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300" 
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: 1,
                  background: "radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--x', `${x}px`);
                  e.currentTarget.style.setProperty('--y', `${y}px`);
                }}
              />
              <span className="relative flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.018-2.013-1.227-2.013-1.227 0-1.415.957-1.415 1.947v5.67h-3v-11h2.85v1.634h.042c.494-.936 1.699-1.924 3.5-1.924 3.742 0 4.4 2.464 4.4 5.667v6.623z"/>
                </svg>
                {currentLanguage.home.buttons.linkedin}
              </span>
            </motion.a>

            <motion.a
              href="https://github.com/yyamaguchi0102?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ scale: 1.03, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative px-8 py-4 rounded-xl font-semibold overflow-hidden shadow-lg
                ${theme === "light"
                  ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-gray-800/10"
                  : "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-gray-900/10"
                }`}
            >
              <motion.div 
                className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300" 
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: 1,
                  background: "radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--x', `${x}px`);
                  e.currentTarget.style.setProperty('--y', `${y}px`);
                }}
              />
              <span className="relative flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {currentLanguage.home.buttons.github}
              </span>
            </motion.a>

            <motion.button
              onClick={toggleModal}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              whileHover={{ scale: 1.03, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative px-8 py-4 rounded-xl font-semibold overflow-hidden shadow-lg
                ${theme === "light"
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-blue-600/10"
                  : "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-blue-500/10"
                }`}
            >
              <motion.div 
                className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300" 
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: 1,
                  background: "radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--x', `${x}px`);
                  e.currentTarget.style.setProperty('--y', `${y}px`);
                }}
              />
              <span className="relative flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 6h2v8h-2v-8zm0 2h2v6h-2v-6z"/>
                </svg>
                {currentLanguage.home.buttons.aboutMe}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Portal>
            {/* Fullscreen backdrop with high z-index */}
            <div 
              className="fixed inset-0 w-screen h-screen bg-black/80 backdrop-blur-md"
              style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999 
              }}
              onClick={toggleModal}
            />
            
            {/* Modal Content */}
            <div
              className="fixed inset-0 w-screen h-screen flex items-center justify-center"
              style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10000 
              }}
              onClick={toggleModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`p-8 rounded-2xl shadow-xl max-w-2xl w-full mx-4 my-auto max-h-[80vh] overflow-y-auto
                  ${theme === "light" 
                    ? "bg-white border border-gray-200/50" 
                    : "bg-gray-800 border border-gray-700/50"
                  }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <div className={`absolute -left-3 top-0 h-full w-1 rounded-full 
                    ${theme === "light" 
                      ? "bg-gradient-to-b from-rose-500 to-pink-600" 
                      : "bg-gradient-to-b from-indigo-500 to-violet-600"
                    }`} 
                  />
                  <h2 className={`text-3xl font-bold mb-6 ml-2
                    ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {currentLanguage.home.about.title}
                  </h2>
                </div>
                <p className={`leading-relaxed mb-6
                  ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                  {currentLanguage.home.about.content}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={toggleModal}
                  className={`px-6 py-3 rounded-xl font-medium
                    ${theme === "light"
                      ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                      : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white"
                    }`}
                >
                  {currentLanguage.home.about.close}
                </motion.button>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Home;