import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { languages } from "../languages";

const LoadingScreen = ({ onComplete }) => {
  const { setTheme } = useTheme();
  const { setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showLanguagePrompt, setShowLanguagePrompt] = useState(true);
  const [showMoodPrompt, setShowMoodPrompt] = useState(false);

  // Get text for the current selected language
  const currentLanguageText = languages[selectedLanguage];

  const languagePrompts = [
    "Select A Language",
    "言語を選択してください",
    "언어를 선택하세요",
  ];
  
  // Generate random particles for background
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const count = 60; // Increased particle count for more visual impact
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.3 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15
    }));
    
    setParticles(newParticles);
  }, []);

  const handleLanguageSelection = (lang) => {
    setSelectedLanguage(lang);
    setLanguage(lang);
    
    // Increased transition timing
    setTimeout(() => {
      setShowLanguagePrompt(false);
      // Give more time for exit animation
      setTimeout(() => {
        setShowMoodPrompt(true);
      }, 600); // Increased from 400 to 600
    }, 200); // Increased from 100 to 200
  };

  const handleMoodSelection = (mood) => {
    setTheme(mood);
    
    // Add slide-out animation before completing
    setShowMoodPrompt(false);
    
    // Wait for the exit animation to complete before calling onComplete
    setTimeout(() => {
      onComplete();
    }, 800); // Increased from 500 to 800 to allow for the slide animation
  };

  // Button hover variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.97 }
  };
  
  // Card variants for staggered entrance
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }),
    exit: (i) => ({
      opacity: 0,
      y: -50,
      x: -100,
      scale: 0.8,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }
    })
  };

  // Clean, simple transition variants
  const transitionVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      rotateY: 15
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateY: 0,
      transition: { 
        duration: 1,
        ease: [0.4, 0.0, 0.2, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.05,
      x: -100,
      rotateY: -15,
      transition: { 
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-indigo-500"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              filter: `blur(${particle.size > 3 ? '1px' : '0'})`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: particle.opacity,
              scale: 1,
              x: [0, particle.speedX * 100, 0],
              y: [0, particle.speedY * 100, 0],
              scale: [1, particle.size > 3 ? 1.2 : 1, 1],
            }}
            transition={{
              opacity: { duration: 1, delay: particle.delay },
              scale: { duration: 1, delay: particle.delay },
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-10 bg-indigo-500 -top-64 -right-64"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.1,
            scale: 1,
            y: [0, 50, -30, 0],
            x: [0, -30, 20, 0],
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            opacity: { duration: 1.5 },
            scale: { duration: 1.5 },
            duration: 20, 
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-10 bg-violet-500 -bottom-64 -left-64"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.1,
            scale: 1,
            y: [0, -50, 30, 0],
            x: [0, 30, -20, 0],
            scale: [1, 0.9, 1.1, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ 
            opacity: { duration: 1.5, delay: 0.5 },
            scale: { duration: 1.5, delay: 0.5 },
            duration: 25, 
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {showLanguagePrompt ? (
          <motion.div 
            key="language-prompt"
            className="text-center z-10 px-6 w-full"
            variants={transitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Language Selection */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0,
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: 0.3
                }
              }}
            >
              <div className="relative text-4xl font-bold mb-12 h-16 flex items-center justify-center">
                <motion.div 
                  className="absolute inset-0 -z-10 blur-lg opacity-20 bg-indigo-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity
                  }}
                />
                <Typewriter
                  words={languagePrompts}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mt-8"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                custom={0}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleLanguageSelection("en")}
                className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-500/20 transition-all duration-300"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-violet-500/0 rounded-2xl -z-10"
                  animate={{
                    background: ["linear-gradient(to right, rgba(99, 102, 241, 0.0), rgba(139, 92, 246, 0.0))", 
                                  "linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))",
                                  "linear-gradient(to right, rgba(99, 102, 241, 0.0), rgba(139, 92, 246, 0.0))"]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                />
                <div className="relative flex items-center space-x-3">
                  <motion.img
                    src="https://flagsapi.com/US/flat/32.png"
                    alt="US Flag"
                    className="w-8 h-8"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="text-lg font-medium">English</span>
                </div>
              </motion.button>
              
              <motion.button
                custom={1}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleLanguageSelection("jp")}
                className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-500/20 transition-all duration-300"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-rose-500/0 to-pink-500/0 rounded-2xl -z-10"
                  animate={{
                    background: ["linear-gradient(to right, rgba(244, 63, 94, 0.0), rgba(219, 39, 119, 0.0))", 
                                  "linear-gradient(to right, rgba(244, 63, 94, 0.1), rgba(219, 39, 119, 0.1))",
                                  "linear-gradient(to right, rgba(244, 63, 94, 0.0), rgba(219, 39, 119, 0.0))"]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.3
                  }}
                />
                <div className="relative flex items-center space-x-3">
                  <motion.img
                    src="https://flagsapi.com/JP/flat/32.png"
                    alt="Japanese Flag"
                    className="w-8 h-8"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="text-lg font-medium">日本語</span>
                </div>
              </motion.button>
              
              <motion.button
                custom={2}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleLanguageSelection("ko")}
                className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-500/20 transition-all duration-300"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-sky-500/0 to-blue-500/0 rounded-2xl -z-10"
                  animate={{
                    background: ["linear-gradient(to right, rgba(14, 165, 233, 0.0), rgba(59, 130, 246, 0.0))", 
                                  "linear-gradient(to right, rgba(14, 165, 233, 0.1), rgba(59, 130, 246, 0.1))",
                                  "linear-gradient(to right, rgba(14, 165, 233, 0.0), rgba(59, 130, 246, 0.0))"]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.6
                  }}
                />
                <div className="relative flex items-center space-x-3">
                  <motion.img
                    src="https://flagsapi.com/KR/flat/32.png"
                    alt="Korean Flag"
                    className="w-8 h-8"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="text-lg font-medium">한국어</span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : showMoodPrompt ? (
          <motion.div 
            key="mood-prompt"
            className="text-center z-10 px-6 w-full"
            variants={transitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Theme Selection */}
            <motion.h1 
              className="text-4xl font-bold mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.2,
                  duration: 0.6,
                  type: "spring"
                }
              }}
            >
              <motion.span
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-violet-300"
                animate={{ 
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
              >
                {currentLanguageText.loadingScreen.moodPrompt}
              </motion.span>
            </motion.h1>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { 
                    staggerChildren: 0.2,
                    delayChildren: 0.3
                  } 
                },
                exit: {
                  opacity: 0,
                  transition: {
                    staggerChildren: 0.1,
                    staggerDirection: -1
                  }
                }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                variants={cardVariants}
                custom={0}
              >
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleMoodSelection("light")}
                  className="group relative px-10 py-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg shadow-rose-900/10 hover:shadow-rose-500/20 transition-all duration-300"
                >
                  <motion.div 
                    className="absolute inset-0 rounded-2xl overflow-hidden -z-10"
                    animate={{ 
                      background: ["linear-gradient(120deg, rgba(244,63,94,0.05) 0%, rgba(238,164,16,0.05) 100%)", 
                                  "linear-gradient(120deg, rgba(244,63,94,0.1) 0%, rgba(238,164,16,0.1) 100%)",
                                  "linear-gradient(120deg, rgba(244,63,94,0.05) 0%, rgba(238,164,16,0.05) 100%)"]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  />
                  <div className="relative flex flex-col items-center space-y-3">
                    <motion.span 
                      className="text-4xl"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity,
                        repeatType: "loop" 
                      }}
                    >
                      ☀️
                    </motion.span>
                    <span className="text-lg font-medium">{currentLanguageText.loadingScreen.moodBright}</span>
                  </div>
                </motion.button>
              </motion.div>
              
              <motion.div
                variants={cardVariants}
                custom={1}
              >
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleMoodSelection("dark")}
                  className="group relative px-10 py-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg shadow-indigo-900/10 hover:shadow-indigo-500/20 transition-all duration-300"
                >
                  <motion.div 
                    className="absolute inset-0 rounded-2xl overflow-hidden -z-10"
                    animate={{ 
                      background: ["linear-gradient(120deg, rgba(99,102,241,0.05) 0%, rgba(139,92,246,0.05) 100%)", 
                                  "linear-gradient(120deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)",
                                  "linear-gradient(120deg, rgba(99,102,241,0.05) 0%, rgba(139,92,246,0.05) 100%)"]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  />
                  <div className="relative flex flex-col items-center space-y-3">
                    <motion.span 
                      className="text-4xl"
                      animate={{ 
                        rotate: [0, -5, 5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: 0.3
                      }}
                    >
                      🌙
                    </motion.span>
                    <span className="text-lg font-medium">{currentLanguageText.loadingScreen.moodDark}</span>
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default LoadingScreen;