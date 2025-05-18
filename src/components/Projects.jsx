import React, { useState, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { languages } from "../languages.js";

// Project Card component
const ProjectCard = ({ project, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get category based on project type and tech
  const getCategory = () => {
    const type = project.type?.toLowerCase() || '';
    const tech = (project.tech || []).map(t => t.toLowerCase()).join(' ');
    
    if (type.includes('ai') || tech.includes('tensorflow') || tech.includes('pytorch') || 
        tech.includes('machine learning') || tech.includes('ml') || tech.includes('data')) {
      return 'AI';
    } else if (type.includes('web') || tech.includes('react') || tech.includes('javascript') || 
               tech.includes('html') || tech.includes('css')) {
      return 'Web';
    }
    return 'Other';
  };
  
  // Open repository URL in new tab
  const handleRepoClick = (e) => {
    e.stopPropagation();
    if (project.repoUrl) {
      window.open(project.repoUrl, '_blank');
    }
  };
  
  // Open demo URL in new tab
  const handleDemoClick = (e) => {
    e.stopPropagation();
    if (project.demoUrl) {
      window.open(project.demoUrl, '_blank');
    }
  };
  
  return (
    <motion.div
      className={`w-full h-full rounded-xl overflow-hidden shadow-lg flex flex-col relative ${
        theme === "light" ? "bg-white" : "bg-gray-900/90"
      } border ${
        theme === "light" ? "border-gray-200" : "border-gray-700"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -5,
        boxShadow: theme === "light" 
          ? "0 15px 30px rgba(0, 0, 0, 0.1)" 
          : "0 15px 30px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Tag */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          getCategory() === 'AI' 
            ? theme === "light" ? "bg-amber-100 text-amber-800" : "bg-amber-900/40 text-amber-200" 
            : getCategory() === 'Web'
              ? theme === "light" ? "bg-blue-100 text-blue-800" : "bg-blue-900/40 text-blue-200"
              : theme === "light" ? "bg-gray-100 text-gray-800" : "bg-gray-800 text-gray-200"
        }`}>
          {getCategory()}
        </span>
      </div>
      
      {/* Project Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className={`text-xl font-bold mb-2 ${
          theme === "light" ? "text-gray-800" : "text-white"
        }`}>
          {project.name}
        </h3>
        <p className={`text-sm mb-6 flex-grow ${
          theme === "light" ? "text-gray-600" : "text-gray-300"
        }`}>
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech?.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className={`text-xs px-2 py-1 rounded-full ${
                theme === "light" 
                  ? "bg-gray-100 text-gray-800" 
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              {tech}
            </span>
          ))}
          {project.tech?.length > 3 && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              theme === "light" 
                ? "bg-gray-100 text-gray-800" 
                : "bg-gray-800 text-gray-200"
            }`}>
              +{project.tech.length - 3}
            </span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex justify-between mt-auto space-x-2">
          {project.repoUrl && (
            <button
              onClick={handleRepoClick}
              className={`flex items-center px-3 py-1.5 rounded text-sm ${
                theme === "light"
                  ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          )}
          {project.demoUrl && (
            <button
              onClick={handleDemoClick}
              className={`flex items-center px-3 py-1.5 rounded text-sm ${
                theme === "light"
                  ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                  : "bg-indigo-900/30 text-indigo-200 hover:bg-indigo-800/40"
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Live Demo
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Filter button component
const FilterButton = ({ active, children, onClick, theme, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
      active
        ? theme === "light"
          ? "bg-indigo-500 text-white font-medium shadow-md"
          : "bg-indigo-600 text-white font-medium shadow-md"
        : theme === "light"
          ? "bg-white/70 hover:bg-white text-gray-700 border border-gray-200"
          : "bg-gray-800/50 hover:bg-gray-800/80 text-gray-300 border border-gray-700"
    }`}
  >
    {children}
    {count !== undefined && (
      <span className={`ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full ${
        active
          ? "bg-white/20 text-white"
          : theme === "light" 
            ? "bg-gray-200 text-gray-600" 
            : "bg-gray-700 text-gray-300"
      }`}>
        {count}
      </span>
    )}
  </button>
);

// Main Projects component
const Projects = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const currentLanguage = languages[language];
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  // Get filtered projects based on selected filter
  const getFilteredProjects = () => {
    if (selectedFilter === "all") {
      return currentLanguage.projects.items;
    }
    
    return currentLanguage.projects.items.filter(project => {
      const type = project.type?.toLowerCase() || '';
      const tech = (project.tech || []).map(t => t.toLowerCase()).join(' ');
      
      if (selectedFilter === "ai" && (
        type.includes('ai') || tech.includes('tensorflow') || 
        tech.includes('pytorch') || tech.includes('machine learning') || 
        tech.includes('ml') || tech.includes('data')
      )) {
        return true;
      }
      
      if (selectedFilter === "web" && (
        type.includes('web') || tech.includes('react') || 
        tech.includes('javascript') || tech.includes('html')
      )) {
        return true;
      }
      
      return false;
    });
  };
  
  const filteredProjects = getFilteredProjects();
  
  // Count projects by category
  const projectCounts = {
    all: currentLanguage.projects.items.length,
    web: currentLanguage.projects.items.filter(project => {
      const type = project.type?.toLowerCase() || '';
      const tech = (project.tech || []).map(t => t.toLowerCase()).join(' ');
      return type.includes('web') || tech.includes('react') || tech.includes('javascript') || tech.includes('html');
    }).length,
    ai: currentLanguage.projects.items.filter(project => {
      const type = project.type?.toLowerCase() || '';
      const tech = (project.tech || []).map(t => t.toLowerCase()).join(' ');
      return type.includes('ai') || tech.includes('tensorflow') || tech.includes('pytorch') || tech.includes('machine learning') || tech.includes('ml');
    }).length
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="w-full py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.p
            className={`text-sm font-semibold uppercase tracking-widest mb-2 ${
              theme === "light" ? "text-indigo-600" : "text-indigo-400"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Portfolio Highlights
          </motion.p>
          
          <motion.h2
            className={`text-4xl font-bold mb-4 ${
              theme === "light" 
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text" 
                : "bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {currentLanguage.projects.title}
          </motion.h2>
          
          <motion.div
            className="h-1 w-20 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: theme === "light" 
                ? "linear-gradient(to right, #4f46e5, #9333ea)" 
                : "linear-gradient(to right, #6366f1, #a855f7)"
            }}
          />
          
          <motion.p
            className={`max-w-2xl mx-auto text-base ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {currentLanguage.projects.description}
          </motion.p>
        </div>
        
        {/* Filter buttons */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-3 mb-10 relative z-[5]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center mr-2">
            <svg className="w-5 h-5 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"></path>
            </svg>
            <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              Filter by Category
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={selectedFilter === "all"}
              onClick={() => setSelectedFilter("all")}
              theme={theme}
              count={projectCounts.all}
            >
              All
            </FilterButton>
            
            <FilterButton
              active={selectedFilter === "web"}
              onClick={() => setSelectedFilter("web")}
              theme={theme}
              count={projectCounts.web}
            >
              Web
            </FilterButton>
            
            <FilterButton
              active={selectedFilter === "ai"}
              onClick={() => setSelectedFilter("ai")}
              theme={theme}
              count={projectCounts.ai}
            >
              AI
            </FilterButton>
          </div>
        </motion.div>
        
        {/* Project count indicator */}
        <motion.div
          className={`text-center mb-8 text-sm ${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Showing {filteredProjects.length} projects
        </motion.div>
        
        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-[1]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                className="h-full"
                variants={itemVariants}
                layout
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <ProjectCard project={project} theme={theme} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg 
              className={`w-16 h-16 mx-auto mb-4 ${
                theme === "light" ? "text-gray-400" : "text-gray-600"
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h3 className={`text-lg font-medium mb-1 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}>
              No projects found
            </h3>
            <p className={`text-sm ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}>
              Try changing your filter selection
            </p>
            <button
              className={`mt-4 px-4 py-2 rounded-md text-sm font-medium ${
                theme === "light"
                  ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  : "bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40"
              }`}
              onClick={() => setSelectedFilter("all")}
            >
              Show all projects
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects; 