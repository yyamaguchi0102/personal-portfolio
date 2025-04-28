import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { languages } from "../languages.js";

// Improved project card with 3D effect and image display
const ProjectCard = ({ project, index, onClick, onDemoClick, onRepoClick, theme, currentLanguage, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get project-specific image or generate based on project type
  const getProjectImage = () => {
    if (project.image) return project.image;
    
    // Determine project type and return appropriate placeholder
    const type = project.type?.toLowerCase() || '';
    
    if (type.includes('web') || project.tech?.some(t => 
      ['react', 'javascript', 'typescript', 'html', 'css', 'frontend'].some(tech => t.toLowerCase().includes(tech)))) {
      return theme === "light"
        ? "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=800"
        : "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800";
    }
    
    if (type.includes('mobile') || project.tech?.some(t => 
      ['flutter', 'react native', 'swift', 'kotlin', 'android', 'ios'].some(tech => t.toLowerCase().includes(tech)))) {
      return theme === "light"
        ? "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=800"
        : "https://images.unsplash.com/photo-1596558450268-9c27524ba856?q=80&w=800";
    }
    
    if (type.includes('ai') || project.tech?.some(t => 
      ['tensorflow', 'pytorch', 'python', 'machine learning', 'ml', 'data'].some(tech => t.toLowerCase().includes(tech)))) {
      return theme === "light"
        ? "https://images.unsplash.com/photo-1677442135960-347a4129be42?q=80&w=800"
        : "https://images.unsplash.com/photo-1675187409865-0a216aa6ade8?q=80&w=800";
    }
    
    // Default images
    return theme === "light" 
      ? "https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?q=80&w=800" 
      : "https://images.unsplash.com/photo-1595675424556-5cffbf201ec0?q=80&w=800";
  };
  
  // Get project image
  const projectImage = getProjectImage();
  
  // Determine project background overlay based on tech used
  const getProjectOverlay = () => {
    if (project.tech?.some(t => t.toLowerCase().includes('react'))) {
      return theme === "light" 
        ? "bg-gradient-to-br from-blue-400/10 to-cyan-400/10"
        : "bg-gradient-to-br from-blue-500/20 to-cyan-500/10";
    }
    
    if (project.tech?.some(t => t.toLowerCase().includes('python') || t.toLowerCase().includes('tensorflow'))) {
      return theme === "light" 
        ? "bg-gradient-to-br from-blue-400/10 to-yellow-400/10"
        : "bg-gradient-to-br from-blue-500/20 to-yellow-500/10";
    }
    
    if (project.tech?.some(t => t.toLowerCase().includes('java'))) {
      return theme === "light" 
        ? "bg-gradient-to-br from-orange-400/10 to-red-400/10"
        : "bg-gradient-to-br from-orange-500/20 to-red-500/10";
    }
    
    return theme === "light" 
      ? "bg-gradient-to-br from-gray-200/20 to-gray-300/10"
      : "bg-gradient-to-br from-gray-700/20 to-gray-800/10";
  };
  
  return (
    <motion.div
      className="relative h-full w-full rounded-xl overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Card Content */}
      <div className={`h-full flex flex-col ${
        theme === "light" 
          ? "bg-gradient-to-br from-white to-gray-50 shadow-lg" 
          : "bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg"
        } backdrop-blur-md border rounded-xl overflow-hidden
        ${theme === "light" ? "border-gray-200/50" : "border-gray-700/50"}`}
      >
        {/* Project Image */}
        <div className="relative w-full h-60 overflow-hidden">
          <div className={`absolute inset-0 backdrop-blur-[1px] mix-blend-overlay z-10 ${getProjectOverlay()}`}></div>
          <img 
            src={projectImage} 
            alt={project.name}
            className="w-full h-full object-cover transition-all duration-500"
            style={{ 
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              filter: isHovered ? "brightness(1.1)" : "brightness(1)"
            }}
          />
          
          {/* Project badge/label */}
          <div className={`absolute top-4 right-4 z-20 px-3 py-1 text-xs font-semibold rounded-full 
            ${theme === "light" 
              ? "bg-rose-500/90 text-white backdrop-blur-sm" 
              : "bg-indigo-500/90 text-white backdrop-blur-sm"
            }`}>
            {project.type || "Project"}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-grow flex flex-col relative z-10">
          {/* Title with decorative element */}
          <div className="relative mb-4">
            <div className={`absolute -left-3 top-0 h-full w-1 rounded-full 
              ${theme === "light" 
                ? "bg-gradient-to-b from-rose-500 to-pink-600" 
                : "bg-gradient-to-b from-indigo-500 to-violet-600"
              }`} 
            />
            <h3 className={`text-xl font-bold ml-1 mb-1
              ${theme === "light" ? "text-gray-800" : "text-gray-100"}`}>
              {project.name}
            </h3>
          </div>

          {/* Description */}
          <p className={`mb-5 leading-relaxed text-sm flex-grow
            ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            {project.description}
          </p>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech && project.tech.map((tech, i) => (
              <span
                key={i}
                className={`px-2 py-1 text-xs rounded-md inline-flex items-center ${
                  theme === "light"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex justify-between pt-4 border-t border-gray-200/30">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onDemoClick(e);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg mr-2 transition-colors duration-300 flex items-center gap-2 ${
                theme === "light"
                  ? "bg-rose-500 text-white hover:bg-rose-600"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              {currentLanguage.projects.demo}
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onRepoClick(project, e);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              {currentLanguage.projects.repo}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Shimmer effect on hover */}
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
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }
          }}
        />
      )}
      
      {/* Highlight effect on click */}
      <motion.div 
        className={`absolute inset-0 opacity-0 rounded-xl z-0
          ${theme === "light" 
            ? "bg-gradient-to-br from-rose-100/50 to-pink-100/20" 
            : "bg-gradient-to-br from-indigo-900/20 to-violet-900/10"
          }`}
        animate={{
          opacity: isActive ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Improved Popup component
const Popup = ({ message, theme }) => {
  return (
    <motion.div
      className="fixed top-6 left-1/2 z-50 transform -translate-x-1/2"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`px-6 py-3 rounded-lg shadow-lg ${
        theme === "light" 
          ? "bg-white text-gray-800 border border-gray-200" 
          : "bg-gray-800 text-white border border-gray-700"
      }`}>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
          <span>{message}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const currentLanguage = languages[language];
  
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const popupTimeoutRef = useRef(null);
  
  // Filter state
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Get unique categories from all projects
  const categories = ["all", ...new Set(currentLanguage.projects.items.flatMap(project => 
    project.categories || ['uncategorized']
  ))];
  
  // Update filtered projects when filter changes
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(currentLanguage.projects.items);
    } else {
      setFilteredProjects(
        currentLanguage.projects.items.filter(project => 
          project.categories && project.categories.includes(activeFilter)
        )
      );
    }
  }, [activeFilter, currentLanguage.projects.items]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
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
      setPopupMessage(currentLanguage.projects.demoComingSoon);
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
        setPopupMessage(currentLanguage.projects.repoComingSoon);
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
  
  return (
    <section className="py-24 px-8 w-full relative overflow-hidden">
      {/* Background decorative elements */}
      <div className={`absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none ${
        theme === "light" ? "bg-rose-500" : "bg-indigo-500"
      }`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="currentColor"></circle>
            </pattern>
          </defs>
          <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>
      
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Popup for coming soon features */}
        <AnimatePresence>
          {showPopup && <Popup message={popupMessage} theme={theme} />}
        </AnimatePresence>

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className={`text-4xl font-bold mb-4 inline-block ${
              theme === "light" 
                ? "bg-gradient-to-r from-rose-600 to-pink-600 text-transparent bg-clip-text" 
                : "bg-gradient-to-r from-indigo-400 to-violet-400 text-transparent bg-clip-text"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {currentLanguage.projects.title}
          </motion.h2>
          <motion.div
            className="h-1 w-20 mx-auto rounded-full mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: theme === "light" 
                ? "linear-gradient(to right, #f43f5e, #ec4899)" 
                : "linear-gradient(to right, #818cf8, #a78bfa)"
            }}
          />
          <motion.p 
            className={`text-center mb-12 max-w-2xl mx-auto ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {currentLanguage.projects.description}
          </motion.p>
        </div>
        
        {/* Category Filter Pills */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? theme === "light" 
                    ? "bg-rose-500 text-white shadow-md" 
                    : "bg-indigo-500 text-white shadow-md"
                  : theme === "light"
                    ? "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50" 
                    : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Project Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                layout
                className="h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onClick={() => handleCardClick(index)}
                  onDemoClick={handleDemoClick}
                  onRepoClick={handleRepoClick}
                  theme={theme}
                  currentLanguage={currentLanguage}
                  isActive={clickedIndex === index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;