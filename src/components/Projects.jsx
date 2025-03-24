import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { languages } from "../languages.js";

// Simpler card component with optimized hover effects
const ProjectCard = ({ children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative h-full w-full rounded-2xl overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ 
        y: -6,
        transition: { duration: 0.5, ease: "easeOut" }
      }}
    >
      {children}
      
      {/* Shimmer effect only visible on hover */}
      {isHovered && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            backgroundPosition: ["200% 0%", "-200% 0%"]
          }}
          style={{
            background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)",
            backgroundSize: "400% 100%",
          }}
          transition={{
            backgroundPosition: {
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }
          }}
        />
      )}
    </motion.div>
  );
};

const Projects = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const currentLanguage = languages[language];
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const popupTimeoutRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3, // Faster staggering
        delayChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      },
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  };

  const handleDemoClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation to prevent card click
    
    // Clear any existing timeout and prevent showing popup if already visible
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }
    
    // Only show the popup if it's not already visible
    if (!showPopup) {
      setPopupMessage("Live Demo Coming Soon!");
      setShowPopup(true);
      popupTimeoutRef.current = setTimeout(() => {
        setShowPopup(false);
        popupTimeoutRef.current = null;
      }, 2000);
    }
  };

  const handleRepoClick = (project, e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation to prevent card click
    
    // Check if the project has a repo URL defined
    if (!project.repoUrl || project.repoUrl === "#" || project.repoUrl === "") {
      // Clear any existing timeout and prevent showing popup if already visible
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
      
      // Only show the popup if it's not already visible
      if (!showPopup) {
        setPopupMessage("Repository Coming Soon!");
        setShowPopup(true);
        popupTimeoutRef.current = setTimeout(() => {
          setShowPopup(false);
          popupTimeoutRef.current = null;
        }, 2000);
      }
      return;
    }
    
    // Make sure URL has proper protocol
    let url = project.repoUrl;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    window.open(url, '_blank');
  };

  const handleCardClick = (index) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
      return;
    }
    
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 600);
  };

  // Improved Popup component
  const Popup = () => (
    <motion.div 
      className="fixed top-0 left-0 right-0 flex justify-center items-start z-50 mt-24 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div 
        className={`px-6 py-3 rounded-lg shadow-xl backdrop-blur-sm ${
          theme === "light" 
            ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white" 
            : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white"
        }`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="font-medium">{popupMessage}</p>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.section
      className="min-h-screen py-24 px-8 relative"
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

      {/* Popup for coming soon features */}
      <AnimatePresence>
        {showPopup && <Popup />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <motion.h2
          className={`text-3xl font-bold mb-6 text-center ${theme === "dark" ? "text-indigo-400" : "text-rose-500"}`}
          variants={itemVariants}
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
        >
          {currentLanguage.projects.items.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              whileTap="tap"
              className={`overflow-hidden rounded-2xl h-full transform-gpu
                ${theme === "light" 
                  ? "bg-gradient-to-br from-white to-rose-50/50 shadow-[0_8px_20px_rgba(0,0,0,0.06)]" 
                  : "bg-gradient-to-br from-gray-800/80 to-slate-900/80 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                } backdrop-blur-sm border border-opacity-20
                ${theme === "light" ? "border-gray-200/50" : "border-gray-700/50"}`}
            >
              <ProjectCard onClick={() => handleCardClick(index)}>
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

                  {/* Action buttons with updated hover colors */}
                  <div className="flex justify-between mt-8 pt-4 border-t border-gray-200/30">
                    <motion.button
                      onClick={(e) => handleDemoClick(e)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg mr-2 transition-colors duration-300 ${
                        theme === "light"
                          ? "bg-rose-500 text-white hover:bg-rose-600"
                          : "bg-indigo-500 text-white hover:bg-indigo-600"
                      }`}
                    >
                      {currentLanguage.projects.demo}
                    </motion.button>
                    <motion.button
                      onClick={(e) => handleRepoClick(project, e)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-300"
                    >
                      {currentLanguage.projects.repo}
                    </motion.button>
                  </div>
                </div>

                {/* Highlight effect on click */}
                <motion.div 
                  className={`absolute inset-0 opacity-0 rounded-2xl z-0
                    ${theme === "light" 
                      ? "bg-gradient-to-br from-rose-100/50 to-pink-100/20" 
                      : "bg-gradient-to-br from-indigo-900/20 to-violet-900/10"
                    }`}
                  animate={{
                    opacity: clickedIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </ProjectCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;