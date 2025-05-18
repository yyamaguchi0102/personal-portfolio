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
import Footer from "./components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";
import './index.css';

// Completely remove the global style targeting projects filter container
// No longer needed as we rebuilt the Projects component

// Scroll progress indicator component
const ScrollProgress = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const currentProgress = scrollTop / scrollHeight;
      setProgress(currentProgress);
      setIsVisible(scrollTop > 0); // Show immediately when scrolling starts
    };
    
    // Initial check
    handleScroll();
    
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 z-[100] origin-left"
      style={{ 
        scaleX: progress,
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

// Mouse-following beam effect component
const MouseFollowingBeam = ({ theme }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get mouse position relative to the viewport
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Outer subtle glow */}
      <motion.div
        className={`absolute rounded-full ${
          theme === "light"
            ? "bg-gradient-to-r from-rose-400/20 via-pink-500/20 to-rose-400/20"
            : "bg-gradient-to-r from-indigo-500/20 via-violet-600/20 to-indigo-500/20"
        }`}
        style={{
          width: '350px',  
          height: '350px',
          filter: 'blur(80px)',
        }}
        animate={{ 
          left: mousePosition.x - 175,
          top: mousePosition.y - 175,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.5
        }}
      />
      
      {/* Core of the beam - softer center */}
      <motion.div
        className={`absolute rounded-full ${
          theme === "light"
            ? "bg-gradient-to-r from-rose-300/20 via-pink-400/20 to-rose-300/20"
            : "bg-gradient-to-r from-indigo-400/20 via-violet-500/20 to-indigo-400/20"
        }`}
        style={{
          width: '120px',
          height: '120px',
          filter: 'blur(30px)',
          opacity: 0.6,
        }}
        animate={{ 
          left: mousePosition.x - 60,
          top: mousePosition.y - 60,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 30,
          mass: 0.2
        }}
      />
    </motion.div>
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
          {/* Main background fixed to viewport - will stay consistent across sections */}
          <div 
            className={`fixed inset-0 w-full h-full transition-colors duration-500 z-0
              ${theme === "light"
                ? "bg-gradient-to-br from-gray-100 via-gray-50 to-stone-100"
                : "bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900"
              }`}
          />
          
          {/* Global background elements - stay fixed on page */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-1">
            <ParticleBackground theme={theme} />
            <AnimatedBackground theme={theme} />
            <div className={`absolute inset-0 ${theme === "light" 
              ? "bg-gradient-to-b from-gray-100/0 via-gray-100/20 to-gray-100/50"
              : "bg-gradient-to-b from-slate-900/0 via-slate-900/20 to-slate-900/50"} 
              pointer-events-none`}
            />
          
            {/* Noise texture overlay */}
            <div 
              className="absolute inset-0 bg-repeat opacity-5 pointer-events-none"
              style={{ 
                backgroundImage: `url("https://www.transparenttextures.com/patterns/asfalt-light.png")` 
              }}
            />
            
            {/* Section transition overlay */}
            {theme === "light" ? (
              <>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50/70 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50/70 to-transparent" />
              </>
            ) : (
              <>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900/70 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900/70 to-transparent" />
              </>
            )}
          </div>
          
          {/* Mouse-following beam needs to be on top of sections */}
          <MouseFollowingBeam theme={theme} />

          {/* Application container with transparent background */}
          <div className={`relative min-h-screen z-[5] ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
            style={{ scrollPaddingTop: '120px' }}
          >
            <ScrollProgress />
            
            <Header />
            <div 
              className="scroll-container relative z-[5]"
              style={{
                scrollBehavior: 'smooth',
                height: '100vh',
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarWidth: 'thin',
                scrollPaddingTop: '130px',  
                scrollbarColor: theme === 'light' 
                  ? '#f43f5e transparent' 
                  : '#6366f1 transparent'
              }}
            >
              <div id="home" className="scroll-section">
                <Home />
              </div>
              <div id="skills" className="scroll-section">
                <Skills />
              </div>
              <div id="projects" className="scroll-section">
               <Projects />
              </div>
              <div id="services" className="scroll-section">
                <Services />
              </div>
              <div id="contact" className="scroll-section">
               <Contact />
              </div>
              <Footer />
            </div>
          </div>
        </PageTransition>
      )}
      <style jsx global>{`
        section {
          scroll-margin-top: 120px; /* Increased from 6rem to 120px */
        }
        #contact {
          scroll-margin-top: 100px; /* Specific offset for contact section */
        }
        #services {
          scroll-margin-top: 130px; /* Additional offset for services section */
        }
        #home {
          scroll-margin-top: 90px; /* Adjusted offset for home section */
        }
        * {
          z-index: auto;
        }
        .z-50, .z-[50], .z-[100] {
          z-index: 50 !important;
        }
      `}</style>
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Empty useEffect - we're only relying on the LoadingScreen in AppContent now
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className="relative">
            <AppContent />
          </div>
        )}
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;