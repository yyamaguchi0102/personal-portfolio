import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { languages } from "../languages.js";
import ProjectCard, { ProjectType } from "./ProjectCard";

// Popup component props
interface PopupProps {
  message: string;
  theme: string;
}

// Compact Popup
const Popup: React.FC<PopupProps> = ({ message, theme }) => (
  <div className="fixed top-6 left-1/2 z-50 transform -translate-x-1/2">
    <motion.div
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
  </div>
);

// Project interface for the component
interface ProjectItem {
  name: string;
  description: string;
  tech?: string[];
  repoUrl?: string;
  demoUrl?: string;
  type?: string;
}

// Category type
type CategoryType = "all" | "web" | "ai";

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const currentLanguage = languages[language];
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const popupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Add filter state with stronger typing
  const [activeFilter, setActiveFilter] = useState<CategoryType>("all");

  // Available categories - simplified to just 3
  const categories: CategoryType[] = ["all", "web", "ai"];

  // Helper to determine project category - simplified
  const getCategory = (project: ProjectItem): CategoryType => {
    const type = project.type?.toLowerCase() || '';
    const tech = (project.tech || []).map((t: string) => t.toLowerCase()).join(' ');
    
    if (type.includes('ai') || tech.includes('tensorflow') || tech.includes('pytorch') || 
        tech.includes('machine learning') || tech.includes('ml') || tech.includes('data') ||
        tech.includes('scikit') || tech.includes('pandas') || tech.includes('numpy')) {
      return 'ai';
    } else {
      return 'web';
    }
  };

  // Get the category counts for badges
  const getCategoryCounts = () => {
    const counts: Record<CategoryType, number> = {
      'all': currentLanguage.projects.items.length,
      'web': 0,
      'ai': 0
    };
    
    currentLanguage.projects.items.forEach((project: ProjectItem) => {
      const category = getCategory(project);
      if (category in counts) {
        counts[category]++;
      } else {
        counts['web']++;
      }
    });
    
    return counts;
  };
  
  const categoryCounts = getCategoryCounts();

  // Transform language data into ProjectType format
  const formatProject = (project: ProjectItem): ProjectType => {
    const projectCategory = getCategory(project);
    let projectType: "web" | "mobile" | "ai" | "other" = "other";
    
    if (projectCategory === 'web') projectType = 'web';
    else if (projectCategory === 'ai') projectType = 'ai';
    
    return {
      id: project.name.toLowerCase().replace(/\s+/g, '-'),
      title: project.name,
      description: project.description,
      technologies: project.tech || [],
      githubUrl: project.repoUrl && project.repoUrl !== "#" ? project.repoUrl : undefined,
      liveUrl: project.demoUrl && project.demoUrl !== "#" ? project.demoUrl : undefined,
      type: projectType
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };
  
  const handleDemoClick = (e: React.MouseEvent) => {
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
  
  const handleRepoClick = (project: ProjectItem, e: React.MouseEvent) => {
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
  
  const handleCardClick = (index: number) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
      return;
    }
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 800);
  };

  // Get icon for category - simplified
  const getCategoryIcon = (category: CategoryType) => {
    switch (category) {
      case 'web':
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path>
          </svg>
        );
      case 'ai':
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd"></path>
            <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3z"></path>
          </svg>
        );
      case 'all':
      default:
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
          </svg>
        );
    }
  };
  
  // Use simpler filtering without sorting
  const filteredProjects = currentLanguage.projects.items.filter((project: ProjectItem) => {
    if (activeFilter === 'all') return true;
    return getCategory(project) === activeFilter;
  });

  // Add debugging console.log to check filtered projects
  console.log("Filtered projects count:", filteredProjects.length);

  // Add debug logs for category counts
  // Log the category counts to see how many projects exist in each category
  useEffect(() => {
    console.log("Current language:", language);
    console.log("Active filter:", activeFilter);
    console.log("Category counts:", categoryCounts);
    console.log("All projects count:", currentLanguage.projects.items.length);
    console.log("Filtered projects count:", filteredProjects.length);
    
    // Detailed debug: log each project and its category
    currentLanguage.projects.items.forEach((project, index) => {
      console.log(`Project ${index + 1}: ${project.name} - Category: ${getCategory(project)}`);
    });
    
    // Log the filtered projects list after applying the filter
    console.log("Filtered projects:", filteredProjects.map(p => p.name));
  }, [activeFilter, categoryCounts, currentLanguage.projects.items, language, filteredProjects]);

  return (
    <section className="py-24 w-full relative overflow-hidden">
      {/* Simplified background with backdrop blur */}
      <div className={`absolute inset-0 backdrop-blur-[2px] bg-opacity-10 pointer-events-none ${theme === "light" ? "bg-rose-500/5" : "bg-indigo-500/5"}`} />
      
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
        {/* Header section */}
        <div className="text-center mb-10">
          {/* Use div wrapper for motion components to avoid TypeScript errors */}
          <div className={`text-sm font-semibold uppercase tracking-widest mb-2 ${theme === "light" ? "text-rose-500" : "text-indigo-400"}`}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Portfolio Highlights
            </motion.div>
          </div>
          
          <div className={`text-4xl font-bold mb-4 inline-block ${theme === "light" ? "bg-gradient-to-r from-rose-600 to-pink-600 text-transparent bg-clip-text" : "bg-gradient-to-r from-indigo-400 to-violet-400 text-transparent bg-clip-text"}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {currentLanguage.projects.title}
            </motion.div>
          </div>
          
          <div className="h-1 w-20 mx-auto rounded-full mb-6" style={{
            background: theme === "light" ? "linear-gradient(to right, #f43f5e, #ec4899)" : "linear-gradient(to right, #818cf8, #a78bfa)"
          }} />
          
          <div className={`text-center mb-8 max-w-2xl mx-auto ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {currentLanguage.projects.description}
            </motion.div>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className={`max-w-lg mx-auto mb-12 p-3 rounded-xl ${
          theme === "light" 
            ? "bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-sm" 
            : "bg-gray-900/40 backdrop-blur-sm border border-gray-700/40 shadow-sm"
        }`}>
          <h3 className={`text-center text-sm font-medium mb-4 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}>
            <svg className="w-4 h-4 inline-block mr-1 mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"></path>
            </svg>
            Filter by Category
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.filter(cat => categoryCounts[cat] > 0).map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 
                  flex items-center justify-between gap-2 min-w-[100px]
                  focus:outline-none focus:ring-2 ${
                  activeFilter === category
                    ? theme === "light"
                      ? "bg-rose-500 text-white shadow-md focus:ring-rose-400/40" 
                      : "bg-indigo-500 text-white shadow-md focus:ring-indigo-400/40"
                    : theme === "light"
                      ? "bg-white/60 backdrop-blur-sm text-gray-700 border border-gray-200/40 hover:bg-white/80 focus:ring-gray-300/40" 
                      : "bg-gray-800/60 backdrop-blur-sm text-gray-300 border border-gray-700/40 hover:bg-gray-700/80 focus:ring-gray-600/40"
                  }`}
                aria-label={`Show ${category} projects`}
              >
                <span className="flex items-center">
                  {getCategoryIcon(category)}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                  activeFilter === category
                    ? theme === "light" 
                      ? "bg-white/20 text-white" 
                      : "bg-white/20 text-white"
                    : theme === "light"
                      ? "bg-gray-200/70 text-gray-700" 
                      : "bg-gray-700/70 text-gray-300"
                }`}>
                  {categoryCounts[category]}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Results count */}
        {filteredProjects.length > 0 && (
          <div className={`text-center mb-8 text-sm ${
            theme === "light" ? "text-gray-600" : "text-gray-400"
          }`}>
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            {activeFilter !== 'all' && ` in ${activeFilter}`}
          </div>
        )}
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className={`text-center py-16 ${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}>
            <svg className="w-12 h-12 mx-auto mb-4 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
            </svg>
            <p className="text-lg font-medium mb-2">No projects found</p>
            <p>There are no projects in the {activeFilter} category.</p>
          </div>
        )}
        
        {/* Project Grid */}
        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={project.name} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={formatProject(project)}
                    onClick={() => handleCardClick(index)}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        )}
        
        {/* Popup for notifications */}
        <AnimatePresence>
          {showPopup && <Popup message={popupMessage} theme={theme} />}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;