import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { languages } from "../languages.js";

// Project Card with no image, just name, description, and category
const ProjectCard = ({ project, index, onClick, theme, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Decide category: 'Machine Learning' if AI/data-related, else 'App'
  const getCategory = () => {
    const type = project.type?.toLowerCase() || '';
    const tech = (project.tech || []).map(t => t.toLowerCase()).join(' ');
    if (
      type.includes('ai') ||
      tech.includes('tensorflow') || tech.includes('pytorch') || tech.includes('machine learning') || tech.includes('ml') || tech.includes('data')
    ) {
      return 'Machine Learning';
    }
    return 'App';
  };
  const category = getCategory();

  // Limit description to 3 lines, expand on hover/click
  const getDescription = () => {
    if (isHovered || isActive) return project.description;
    const maxLen = 120;
    return project.description.length > maxLen ? project.description.slice(0, maxLen) + '…' : project.description;
  };

  return (
    <motion.div
      className={`relative h-full w-full rounded-xl overflow-hidden group shadow-lg border transition-all duration-300 flex flex-col justify-between ${
        theme === "light" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"
      } ${isHovered || isActive ? 'ring-2 ring-rose-400/40 dark:ring-indigo-400/40 scale-[1.025]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      tabIndex={0}
      aria-label={project.name}
      style={{ cursor: 'pointer', minHeight: 180 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
    >
      {/* Category badge */}
      <span className={`absolute top-4 right-4 z-10 px-3 py-1 text-xs font-semibold rounded-full shadow backdrop-blur-sm ${
        category === 'Machine Learning'
          ? (theme === "light" ? "bg-amber-500/90 text-white" : "bg-amber-600/90 text-white")
          : (theme === "light" ? "bg-blue-500/90 text-white" : "bg-blue-600/90 text-white")
      }`}>
        {category}
      </span>
      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className={`text-lg font-bold mb-2 ${theme === "light" ? "text-gray-800" : "text-gray-100"}`}>{project.name}</h3>
        <p className={`mb-3 text-sm leading-relaxed ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>{getDescription()}</p>
      </div>
    </motion.div>
  );
};

// Compact Popup
const Popup = ({ message, theme }) => (
  <motion.div
    className="fixed top-6 left-1/2 z-50 transform -translate-x-1/2"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.25 }}
  >
    <div className={`px-4 py-2 rounded shadow text-sm flex items-center gap-2 ${
      theme === "light"
        ? "bg-white text-gray-800 border border-gray-200" 
        : "bg-gray-800 text-white border border-gray-700"
    }`}>
      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
      </svg>
      <span>{message}</span>
    </div>
  </motion.div>
);

const Projects = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const currentLanguage = languages[language];
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const popupTimeoutRef = useRef(null);
  // Remove category filter state
  // const [activeFilter, setActiveFilter] = useState("all");
  // const [filteredProjects, setFilteredProjects] = useState([]);
  // const categories = ["all", ...new Set(currentLanguage.projects.items.flatMap(project => project.categories || ['uncategorized']))];

  // Always show all projects
  const filteredProjects = currentLanguage.projects.items;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };
  const handleDemoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
    if (!showPopup) {
      setPopupMessage(currentLanguage.projects.demoComingSoon);
      setShowPopup(true);
      popupTimeoutRef.current = setTimeout(() => {
        setShowPopup(false);
        popupTimeoutRef.current = null;
      }, 1800);
    }
  };
  const handleRepoClick = (project, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!project.repoUrl || project.repoUrl === "#" || project.repoUrl === "") {
      if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
      if (!showPopup) {
        setPopupMessage(currentLanguage.projects.repoComingSoon);
        setShowPopup(true);
        popupTimeoutRef.current = setTimeout(() => {
          setShowPopup(false);
          popupTimeoutRef.current = null;
        }, 1800);
      }
      return;
    }
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
    setTimeout(() => setClickedIndex(null), 800);
  };
  return (
    <section className="py-24 px-4 w-full relative overflow-hidden">
      {/* Decorative background */}
      <div className={`absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none ${theme === "light" ? "bg-rose-500" : "bg-indigo-500"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="10" cy="10" r="1.6" fill="currentColor"></circle>
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
        <AnimatePresence>{showPopup && <Popup message={popupMessage} theme={theme} />}</AnimatePresence>
        {/* Section Header with subtitle */}
        <div className="text-center mb-16">
          <motion.p
            className={`text-sm font-semibold uppercase tracking-widest mb-2 ${theme === "light" ? "text-rose-500" : "text-indigo-400"}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Portfolio Highlights
          </motion.p>
          <motion.h2
            className={`text-4xl font-bold mb-4 inline-block ${theme === "light" ? "bg-gradient-to-r from-rose-600 to-pink-600 text-transparent bg-clip-text" : "bg-gradient-to-r from-indigo-400 to-violet-400 text-transparent bg-clip-text"}`}
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
              background: theme === "light" ? "linear-gradient(to right, #f43f5e, #ec4899)" : "linear-gradient(to right, #818cf8, #a78bfa)"
            }}
          />
          <motion.p
            className={`text-center mb-12 max-w-2xl mx-auto ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {currentLanguage.projects.description}
          </motion.p>
        </div>
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
                  theme={theme}
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