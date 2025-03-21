import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useTheme } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";
import Services from "./components/Services";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import { motion, useScroll, useSpring } from "framer-motion";

// Scroll progress indicator component
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 z-50 origin-left"
      style={{ 
        scaleX,
        opacity: isVisible ? 1 : 0,
        background: theme === "light" 
          ? "linear-gradient(to right, #f43f5e, #ec4899)" 
          : "linear-gradient(to right, #6366f1, #8b5cf6)",
        boxShadow: theme === "light"
          ? "0 0 10px rgba(244, 63, 94, 0.5)"
          : "0 0 10px rgba(99, 102, 241, 0.5)"
      }}
      transition={{ opacity: { duration: 0.3 } }}
    />
  );
};

// Particle Background component
const ParticleBackground = ({ theme }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      const count = window.innerWidth < 768 ? 20 : 40;
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          duration: Math.random() * 15 + 15
        });
      }
      
      setParticles(newParticles);
    };
    
    createParticles();
    
    window.addEventListener('resize', createParticles);
    return () => window.removeEventListener('resize', createParticles);
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${theme === "light" ? "bg-rose-500" : "bg-indigo-500"}`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            filter: `blur(${particle.size > 2 ? '1px' : '0'})`,
          }}
          animate={{
            x: [0, particle.speedX * 50, 0],
            y: [0, particle.speedY * 50, 0],
            scale: [1, particle.size > 2 ? 1.1 : 1, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated background gradients
const AnimatedBackground = ({ theme }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className={`absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-20
          ${theme === "light" ? "bg-rose-400" : "bg-indigo-500"}
          -top-64 -right-64`}
        animate={{ 
          y: [0, 30, -20, 0],
          x: [0, -20, 10, 0],
          scale: [1, 1.05, 0.95, 1],
          rotate: [0, 3, -3, 0],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className={`absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-20
          ${theme === "light" ? "bg-amber-400" : "bg-violet-500"}
          -bottom-64 -left-64`}
        animate={{ 
          y: [0, -30, 20, 0],
          x: [0, 20, -10, 0],
          scale: [1, 0.95, 1.05, 1],
          rotate: [0, -3, 3, 0],
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className={`absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-10
          ${theme === "light" ? "bg-sky-300" : "bg-violet-300"}
          top-1/4 left-1/3`}
        animate={{ 
          y: [0, 25, -15, 0],
          x: [0, -15, 20, 0],
          scale: [1, 1.02, 0.98, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div 
        className={`absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-10
          ${theme === "light" ? "bg-purple-300" : "bg-blue-300"}
          bottom-1/4 right-1/4`}
        animate={{ 
          y: [0, -20, 30, 0],
          x: [0, 25, -15, 0],
          scale: [1, 1.03, 0.97, 1],
          rotate: [0, -8, 5, 0],
        }}
        transition={{ 
          duration: 22, 
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 3
        }}
      />
    </div>
  );
};

// Wrapper component to apply theme
const AppContent = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [pageMounted, setPageMounted] = useState(false);

  useEffect(() => {
    setPageMounted(true);
    
    // Apply theme class for scrollbar styling
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  return (
    <div className="font-sans relative">
      <ScrollToTop />
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <PageTransition>
          <div className={`min-h-screen relative overflow-hidden transition-colors duration-500
            ${theme === "light"
              ? "bg-gradient-to-br from-rose-50 via-white to-amber-50 text-gray-900"
              : "bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900 text-white"
            }`}
            style={{ scrollPaddingTop: '80px' }}
          >
            <ScrollProgress />
            <ParticleBackground theme={theme} />
            <AnimatedBackground theme={theme} />
            
            <div className={`absolute inset-0 ${theme === "light" 
              ? "bg-gradient-to-b from-white/0 via-white/20 to-white/50"
              : "bg-gradient-to-b from-slate-900/0 via-slate-900/20 to-slate-900/50"} 
              pointer-events-none z-[1]`}
            />
            
            <Header />
            <div className="scroll-container relative z-10">
              <div className="scroll-section">
                <Home />
              </div>
              <div className="scroll-section">
                <Skills />
              </div>
              <div className="scroll-section">
                <Services />
              </div>
              <div className="scroll-section">
                <Projects />
              </div>
              <div className="scroll-section">
                <Contact />
              </div>
            </div>
          </div>
        </PageTransition>
      )}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;