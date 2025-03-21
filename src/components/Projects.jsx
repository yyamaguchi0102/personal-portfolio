import React, { useState, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { languages } from "../languages.js";

const TiltCard = ({ children, speed = 25 }) => {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'all 0.3s cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s',
  });
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    // Calculate cursor position relative to card center
    const cursorX = e.clientX;
    const cursorY = e.clientY;
    
    // Calculate rotation values - reduced intensity
    const rotateY = ((cursorX - cardCenterX) / (cardRect.width / 2)) * (speed / 10);
    const rotateX = -((cursorY - cardCenterY) / (cardRect.height / 2)) * (speed / 10);
    
    // Update glare position based on cursor
    const glareX = ((cursorX - cardRect.left) / cardRect.width) * 100;
    const glareY = ((cursorY - cardRect.top) / cardRect.height) * 100;
    
    setGlarePosition({ x: glareX, y: glareY });
    
    // Apply transformation - smaller scale effect
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
      transition: 'all 0.3s cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s',
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'all 0.3s cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="relative h-full w-full"
    >
      {children}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-20"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)`,
          }}
        />
      )}
    </div>
  );
};

const Projects = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const currentLanguage = languages[language];
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [clickedIndex, setClickedIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, rotateY: 15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: { 
        duration: 0.8,
        type: "spring",
        stiffness: 50,
        damping: 15
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      rotateY: 2,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const handleDemoClick = (project, e) => {
    e.stopPropagation(); // Prevent card click handler from firing
    
    // Check if the project has a demo URL defined
    if (!project.demoUrl || project.demoUrl === "#" || project.demoUrl === "") {
      setAlertMessage("Live demo coming soon!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2500);
      return;
    }
    
    // Make sure URL has proper protocol
    let url = project.demoUrl;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    window.open(url, '_blank');
  };

  const handleRepoClick = (project, e) => {
    e.stopPropagation(); // Prevent card click handler from firing
    
    // Check if the project has a repo URL defined
    if (!project.repoUrl || project.repoUrl === "#" || project.repoUrl === "") {
      setAlertMessage("Repository not available yet!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2500);
      return;
    }
    
    // Make sure URL has proper protocol
    let url = project.repoUrl;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    window.open(url, '_blank');
  };

  const handleProjectClick = (index) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 600);
  };

  return (
    <motion.section
      id="projects"
      className="min-h-screen py-24 px-8 relative perspective"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Alert Notification */}
      <AnimatePresence>
        {showAlert && (
          <motion.div 
            className={`fixed z-50 top-24 left-1/2 -translate-x-1/2 py-3 px-6 rounded-xl shadow-lg
              ${theme === "light" 
                ? "bg-white/90 text-gray-800 border border-rose-500/30" 
                : "bg-gray-800/90 text-white border border-indigo-500/30"
              } backdrop-blur-md flex items-center space-x-3 min-w-[220px] justify-center`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
          >
            <svg className={`w-5 h-5 ${theme === "light" ? "text-rose-500" : "text-indigo-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="font-medium">{alertMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <motion.h2
          className={`text-3xl font-bold mb-6 text-center ${theme === "dark" ? "text-indigo-400" : "text-rose-500"}`}
          variants={itemVariants}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2 }}
        >
          {currentLanguage.projects.title}
        </motion.h2>
        <motion.p 
          className="text-center mb-10 max-w-2xl mx-auto" 
          variants={itemVariants}
        >
          {currentLanguage.projects.description}
        </motion.p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          style={{ perspective: "1500px" }}
        >
          {currentLanguage.projects.items.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 50,
                  rotateY: index % 2 === 0 ? 15 : -15,
                  scale: 0.9
                },
                visible: i => ({ 
                  opacity: 1, 
                  y: 0,
                  rotateY: 0,
                  scale: 1,
                  transition: { 
                    duration: 0.7, 
                    delay: i * 0.1,
                    type: "spring", 
                    damping: 20,
                    stiffness: 70
                  } 
                })
              }}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleProjectClick(index)}
              className={`relative overflow-hidden rounded-2xl h-full transform-gpu
                ${theme === "light" 
                  ? "bg-gradient-to-br from-white to-rose-50/50 shadow-[0_10px_25px_rgba(0,0,0,0.07)]" 
                  : "bg-gradient-to-br from-gray-800/80 to-slate-900/80 shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
                } backdrop-blur-sm border border-opacity-20
                ${theme === "light" ? "border-gray-200/50" : "border-gray-700/50"}`}
              style={{ 
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              <TiltCard>
                {/* Card Content */}
                <div className="p-6 relative z-10">
                  {/* Title with decorative element */}
                  <div className="relative mb-5">
                    <div className={`absolute -left-3 top-0 h-full w-1 rounded-full 
                      ${theme === "light" 
                        ? "bg-gradient-to-b from-rose-500 to-pink-600" 
                        : "bg-gradient-to-b from-indigo-500 to-violet-600"
                      }`} 
                    />
                    <h3 className={`text-xl font-bold ml-1
                      ${theme === "light" ? "text-gray-800" : "text-gray-100"}`}>
                      {project.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className={`mb-5 leading-relaxed text-sm
                    ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                    {project.description}
                  </p>

                  {/* Technology tags */}
                  <div className="mt-6">
                    <h4 className={`text-sm font-medium mb-3 flex items-center
                      ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}>
                      <svg className="w-4 h-4 mr-2 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      {currentLanguage.projects.technologiesUsed}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(project.tech || []).map((tech, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 text-xs rounded-full font-medium inline-flex items-center
                            ${theme === "light" 
                              ? "bg-gray-100 text-gray-700" 
                              : "bg-dark-border/50 text-gray-200"
                            }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                            ${theme === "light" ? "bg-rose-500" : "bg-indigo-400"}`} 
                          />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-between mt-8 pt-4 border-t border-gray-200/30">
                    <button
                      onClick={(e) => handleDemoClick(project, e)}
                      className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2
                        ${theme === "light"
                          ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-lg hover:shadow-rose-500/20"
                          : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/20"
                        }`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span>{project.demo}</span>
                    </button>
                    <button
                      onClick={(e) => handleRepoClick(project, e)}
                      className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2
                        ${theme === "light"
                          ? "bg-gradient-to-r from-gray-100 to-white text-gray-800 hover:shadow-lg hover:shadow-gray-200 border border-gray-200"
                          : "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 hover:shadow-lg hover:shadow-gray-800/20 border border-gray-700"
                        }`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>{project.repo}</span>
                    </button>
                  </div>
                </div>
              </TiltCard>

              {/* Animated Background Gradient on Hover/Click */}
              <motion.div 
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 rounded-2xl
                  ${theme === "light" 
                    ? "bg-gradient-to-br from-rose-100/50 to-pink-100/20" 
                    : "bg-gradient-to-br from-indigo-900/20 to-violet-900/10"
                  }`}
                animate={{
                  opacity: clickedIndex === index ? 1 : 0
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;