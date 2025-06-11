import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { languages } from "../languages.ts";

// Project Card Component with 3D hover effect
const ProjectCard = ({ project, index }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  return (
    <motion.div
      key={`project-card-${language}-${index}`}
      className={`flex flex-col p-6 rounded-xl overflow-hidden relative
        backdrop-blur-sm transition-all duration-300
        ${theme === "light" 
          ? "bg-white/80 border border-gray-100/80 hover:bg-white/90" 
          : "bg-gray-800/80 border border-gray-700/80 hover:bg-gray-800/90"
        }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6, 
          delay: index * 0.1,
          ease: [0.23, 1, 0.32, 1]
        }
      }}
      whileHover={{ 
        y: -5,
        boxShadow: theme === "light" 
          ? "0 20px 40px -15px rgba(0, 0, 0, 0.1)" 
          : "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
        transition: { 
          duration: 0.3,
          ease: "easeOut"
        } 
      }}
    >
      {/* Subtle glow effect on hover */}
      <div 
        className={`absolute inset-0 z-0 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300
          ${theme === "light" ? "bg-blue-200" : "bg-blue-900"}`}
      ></div>

      {/* Project Header */}
      <div className="flex items-start mb-4 relative z-10">
        {project.icon && (
          <div className={`h-12 w-12 rounded-lg flex items-center justify-center mr-4
            ${theme === "light" 
              ? "bg-gray-50 shadow-sm border border-gray-100" 
              : "bg-gray-700 shadow-md border border-gray-600"}`}>
            <img 
              src={project.icon} 
              alt={project.name} 
              className="w-6 h-6 object-contain" 
            />
          </div>
        )}
        <div>
          <h3 className={`text-xl font-bold mb-1 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}>
            {project.name}
          </h3>
          <p className={`text-sm ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}>
            {project.description}
          </p>
        </div>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4 relative z-10">
        {project.tech?.map((tech, index) => (
          <span 
            key={index}
            className={`text-xs px-3 py-1 rounded-full transition-colors duration-300 ${
              theme === "light" 
                ? "bg-rose-100 text-rose-700 hover:bg-rose-200" 
                : "bg-indigo-900 text-indigo-300 hover:bg-indigo-800"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto pt-4 relative z-10">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${theme === "light"
                ? "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-sm" 
                : "bg-gray-700 text-gray-200 hover:bg-gray-600 hover:shadow-md"}`}
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {project.repo}
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${theme === "light"
                ? "bg-gradient-to-r from-rose-600/80 to-pink-600/80 text-white hover:from-pink-500/80 hover:to-rose-500/80 hover:shadow-lg"
                : "bg-indigo-900/30 text-indigo-200 hover:bg-indigo-800/40 hover:shadow-md"}`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {project.demo}
          </a>
        )}
      </div>
    </motion.div>
  );
};

// Project Category Component
const ProjectCategory = ({ title, description, projects, iconUrl }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      className="mb-16 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Visual connector line */}
      <div className={`absolute left-7 top-14 bottom-0 w-0.5 ${
        theme === "light" ? "bg-gradient-to-b from-rose-300 to-indigo-300" : "bg-gradient-to-b from-rose-600/30 to-indigo-600/30"
      }`}></div>
      
      <div className="mb-8 pl-8 sm:pl-16 relative">
        <div className="flex items-center mb-4">
          {iconUrl && (
            <div className={`absolute left-0 h-10 w-10 sm:h-14 sm:w-14 rounded-xl flex items-center justify-center
              ${theme === "light" 
                ? "bg-white shadow-sm border border-gray-100" 
                : "bg-gray-800 border border-gray-700"}`}>
              <img 
                src={iconUrl} 
                alt={title} 
                className="w-5 h-5 sm:w-7 sm:h-7 object-contain" 
              />
            </div>
          )}
          <h3 className={`text-2xl sm:text-3xl font-bold ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}>
            {title}
          </h3>
        </div>
        
        {description && (
          <p className={`text-base sm:text-lg mb-6 max-w-4xl ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}>
            {description}
          </p>
        )}
      </div>
      
      {/* Projects Grid */}
      <div className={`ml-8 sm:ml-16 p-4 sm:p-8 rounded-2xl ${
        theme === "light" 
          ? "bg-gradient-to-br from-white to-gray-50/80 shadow-sm border border-gray-100" 
          : "bg-gradient-to-br from-gray-900/90 to-gray-800/70 border border-gray-800"
      } backdrop-blur-sm`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.name}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main Projects component
const Projects = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const currentLanguage = languages[language];
  const controls = useAnimation();
  
  // Reset animations when language changes
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    });
  }, [controls, language]);

  // Categorize projects
  const mlProjects = currentLanguage.projects.items.filter(project => 
    project.category === 'ml' || project.category === 'both'
  );

  const appProjects = currentLanguage.projects.items.filter(project => 
    project.category === 'app' || project.category === 'both'
  );

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto relative">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -left-20 w-48 sm:w-64 h-48 sm:h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-48 sm:w-64 h-48 sm:h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        
        {/* Section Header */}
        <motion.div
          key={`projects-header-${language}`}
          className="text-center mb-12 sm:mb-16 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
        >
          <motion.h2 
            className={`text-3xl sm:text-4xl font-bold mb-4 sm:mb-5 ${
              theme === "light" 
                ? "bg-gradient-to-r from-rose-600 to-pink-600 text-transparent bg-clip-text" 
                : "bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text"
            }`}
          >
            {currentLanguage.projects.title}
          </motion.h2>
          
          <motion.p
            className={`text-base sm:text-lg max-w-7xl mx-auto px-4
              ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
          >
            {currentLanguage.projects.description}
          </motion.p>
        </motion.div>

        {/* Project Categories */}
        <div className="relative">
          {/* Machine Learning Projects */}
          {mlProjects.length > 0 && (
            <ProjectCategory
              title="Machine Learning Projects"
              description="Explore my work in machine learning, data science, and AI"
              projects={mlProjects}
              iconUrl="https://img.icons8.com/fluency/48/artificial-intelligence.png"
            />
          )}
          
          {/* Application Projects */}
          {appProjects.length > 0 && (
            <ProjectCategory
              title="Application Development"
              description="Check out my web, mobile, and desktop applications"
              projects={appProjects}
              iconUrl="https://img.icons8.com/fluency/48/web-design.png"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects; 