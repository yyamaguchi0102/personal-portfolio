import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { languages } from "../languages.ts";
import { icons } from "../constants/icons";

// Skill Tag Component with 3D hover effect
const SkillTag = ({ name, icon, delay, index }) => {
  const { theme } = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-30, 30], [5, -5]);
  const rotateY = useTransform(mouseX, [-30, 30], [-5, 5]);
  
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }
  
  return (
    <motion.div
      className={`group inline-flex items-center px-4 py-2 m-1.5 rounded-full 
        backdrop-blur-sm transition-all duration-300
        ${theme === "light" 
          ? "bg-white/70 hover:bg-white/90 shadow-sm border border-gray-100" 
          : "bg-gray-800/70 hover:bg-gray-800/90 border border-gray-700"
        } cursor-pointer relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.4, 
          delay: delay * 0.05 + (index * 0.02),
          ease: [0.23, 1, 0.32, 1]
        }
      }}
      style={{ 
        rotateX: rotateX, 
        rotateY: rotateY,
        perspective: "1000px",
        transformStyle: "preserve-3d",
        z: 1
      }}
      whileHover={{ 
        scale: 1.05,
        z: 10,
        transition: { duration: 0.2 } 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle glow effect */}
      <div 
        className={`absolute inset-0 z-0 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300
          ${theme === "light" ? "bg-blue-200" : "bg-blue-900"}`}
      ></div>
      
      {icon && (
        <div className={`relative z-10 mr-2.5 p-1 rounded-full flex items-center justify-center
          ${theme === "light" ? "bg-gray-50" : "bg-gray-700"}`}
        >
          <img 
            src={icon} 
            alt={`${name} icon`} 
            className="w-4 h-4 object-contain transform transition-transform duration-300 group-hover:scale-110" 
          />
        </div>
      )}
      <span className={`relative z-10 font-medium ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
        {name}
      </span>
    </motion.div>
  );
};

// Language Card Component
const LanguageCard = ({ language, emoji, level, icon, index }) => {
  const { theme } = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-50, 50], [7, -7]);
  const rotateY = useTransform(mouseX, [-50, 50], [-7, 7]);
  
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      className={`flex items-center p-4 rounded-xl overflow-hidden relative
        backdrop-blur-sm transition-all duration-200
        ${theme === "light" 
          ? "bg-white/80 border border-gray-100/80" 
          : "bg-gray-800/80 border border-gray-700/80"
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
      style={{ 
        rotateX: rotateX, 
        rotateY: rotateY,
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: theme === "light" 
          ? "0 10px 30px -10px rgba(0, 0, 0, 0.1)" 
          : "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.2 } 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center">
        <div className="text-3xl mr-4 transform translate-z-20">{emoji}</div>
        <div>
          <h3 className={`font-medium text-lg mb-1 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
            {language}
          </h3>
          <span 
            className={`text-xs px-3 py-1 rounded-full
            ${theme === "light" 
                ? "bg-rose-100 text-rose-700" 
                : "bg-indigo-900 text-indigo-300"
              }`}
          >
            {level}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Technology icon with animated hover effect
const TechIcon = ({ icon, name }) => {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);
  
  // Fallback icon for missing icons
  const fallbackIcon = "https://img.icons8.com/fluency/48/code--v1.png";
  const [imgSrc, setImgSrc] = useState(icon);
  
  const handleError = () => {
    setImgSrc(fallbackIcon);
  };
  
  return (
    <motion.div
      className="flex flex-col items-center mx-3 my-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div 
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2
          ${theme === "light" 
            ? "bg-white/90 shadow-sm border border-gray-100" 
            : "bg-gray-800/90 shadow-md border border-gray-700"}`}
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
          >
            <img 
          src={imgSrc} 
          alt={name}
              className="w-6 h-6 object-contain"
          onError={handleError}
        />
      </motion.div>
      <span className={`text-xs font-medium ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
        {name}
      </span>
    </motion.div>
  );
};

// Domain Section Component - style similar to the image shared
const SkillDomain = ({ title, description, technologies, iconUrl, achievements }) => {
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
      
      <div className="mb-8 pl-16 relative">
        <div className="flex items-center mb-4">
          {iconUrl && (
            <div className={`absolute left-0 h-14 w-14 rounded-xl flex items-center justify-center
              ${theme === "light" 
                ? "bg-white shadow-sm border border-gray-100" 
                : "bg-gray-800 border border-gray-700"}`}>
              <img 
                src={iconUrl} 
                alt={title} 
                className="w-7 h-7 object-contain" 
            />
          </div>
          )}
          <h3 className={`text-3xl font-bold ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}>
            {title}
          </h3>
        </div>
        
        {description && (
          <p className={`text-lg mb-6 max-w-4xl ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}>
            {description}
          </p>
        )}
        
        {/* Achievement Bullet Points */}
        {achievements && achievements.length > 0 && (
          <ul className="mb-6 space-y-2.5 max-w-4xl">
            {achievements.map((achievement, index) => (
              <li 
                key={index}
                className={`flex items-start ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}
              >
                <span className={`mr-2.5 mt-1 text-sm ${
                  theme === "light" ? "text-amber-500" : "text-amber-400"
                }`}>
                  ✦
            </span>
                <span className="text-base">{achievement}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Technologies Section */}
      <div className={`ml-16 p-8 rounded-2xl ${
        theme === "light" 
          ? "bg-gradient-to-br from-white to-gray-50/80 shadow-sm border border-gray-100" 
          : "bg-gradient-to-br from-gray-900/90 to-gray-800/70 border border-gray-800"
      } backdrop-blur-sm`}>
        {technologies.map((category, i) => (
          <div key={i} className={`mb-8 last:mb-0 ${i > 0 ? 'pt-6 border-t border-dashed ' + (theme === 'light' ? 'border-gray-200' : 'border-gray-700') : ''}`}>
            <div className="flex items-center mb-4">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3
                ${theme === "light" 
                  ? "bg-white shadow-sm border border-gray-100" 
                  : "bg-gray-800 shadow-md border border-gray-700"}`}>
                <img 
                  src={category.icon} 
                  alt={category.title} 
                  className="w-5 h-5 object-contain" 
                />
              </div>
              <h4 className={`text-xl font-semibold ${
                theme === "light" ? "text-gray-700" : "text-gray-200"
              }`}>{category.label}</h4>
            </div>
            
            <div className="flex flex-wrap mx-auto">
              {category.skills.map((skill, j) => (
                <TechIcon 
                  key={`${category.title}-${skill.name}`}
                  icon={skill.icon}
                  name={skill.name}
                />
              ))}
    </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// --- New Skill Categories ---
const skillCategories = [
  {
    title: "frontend",
    label: "Frontend",
    icon: icons.frontend,
    skills: [
      { name: "React", icon: icons.react },
      { name: "Next.js", icon: icons.nextjs },
      { name: "TypeScript", icon: icons.typescript },
      { name: "JavaScript", icon: icons.javascript },
      { name: "Tailwind CSS", icon: icons.tailwind },
      { name: "HTML5", icon: icons.html5 },
    ]
  },
  {
    title: "backend",
    label: "Backend",
    icon: icons.backend,
    skills: [
      { name: "Java", icon: icons.java },
      { name: "Spring Boot", icon: icons.spring },
      { name: "Node.js", icon: icons.nodejs },
      { name: "FastAPI", icon: icons.fastapi },
      { name: "Django", icon: icons.django },
      { name: "GraphQL", icon: icons.graphql },
    ]
  },
  {
    title: "devops",
    label: "DevOps",
    icon: icons.devops,
    skills: [
      { name: "Docker", icon: icons.docker },
      { name: "AWS", icon: icons.aws },
      { name: "Vercel", icon: icons.vercel },
      { name: "GitHub Actions", icon: icons.github },
    ]
  },
  {
    title: "ai",
    label: "AI",
    icon: icons.ai,
    skills: [
      { name: "Python", icon: icons.python },
      { name: "TensorFlow", icon: icons.tensorflow },
      { name: "PyTorch", icon: icons.pytorch },
      { name: "scikit-learn", icon: icons.scikit },
    ]
  },
  {
    title: "databases",
    label: "Databases",
    icon: icons.databases,
    skills: [
      { name: "PostgreSQL", icon: icons.postgresql },
      { name: "MySQL", icon: icons.mysql },
      { name: "MongoDB", icon: icons.mongodb },
      { name: "SQLite", icon: icons.sqlite },
    ]
  },
  {
    title: "other",
    label: "Other",
    icon: icons.tools,
    skills: [
      { name: "Git", icon: icons.git },
      { name: "Figma", icon: icons.figma },
      { name: "Linux", icon: icons.linux },
    ]
  }
];

const Skills = () => {
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

  // Languages
  const spokenLanguages = [
    { 
      language: currentLanguage.skills.languages.japanese, 
      level: currentLanguage.skills.proficiency.native, 
      emoji: "🇯🇵",
      icon: icons.japan
    },
    { 
      language: currentLanguage.skills.languages.english, 
      level: currentLanguage.skills.proficiency.native, 
      emoji: "🇺🇸",
      icon: icons.usa
    },
    { 
      language: currentLanguage.skills.languages.korean, 
      level: currentLanguage.skills.proficiency.fluent, 
      emoji: "🇰🇷",
      icon: icons.korea
    }
  ];

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto relative">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        
        {/* Section Header with enhanced animations */}
        <motion.div
          key={`skills-header-${language}`}
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
        >
          <motion.h2 
            className={`text-4xl font-bold mb-5 ${
              theme === "light" 
                ? "bg-gradient-to-r from-rose-600 to-pink-600 text-transparent bg-clip-text" 
                : "bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text"
            }`}
          >
            {currentLanguage.skills.title}
          </motion.h2>
          
          <motion.p
            className={`text-lg max-w-7xl mx-auto
              ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
          >
            {currentLanguage.skills.description}
          </motion.p>
        </motion.div>

        {/* Languages Section */}
        <div className="mb-20 relative">
          <div className={`absolute left-7 top-7 h-0.5 w-16 ${
            theme === "light" ? "bg-gradient-to-r from-rose-300 to-indigo-300" : "bg-gradient-to-r from-rose-600/30 to-indigo-600/30"
          }`}></div>
          
          <motion.h3 
            className={`text-2xl font-semibold mb-6 pl-32 ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {currentLanguage.skills.sections?.spokenLanguages || "Languages"}
          </motion.h3>
          
          <div 
            className={`ml-16 grid grid-cols-1 md:grid-cols-3 gap-6 ${
              theme === "light" 
                ? "bg-gradient-to-br from-white to-gray-50/80 shadow-sm" 
                : "bg-gradient-to-br from-gray-900/90 to-gray-800/70"
            } backdrop-blur-sm p-8 rounded-2xl border ${
              theme === "light" ? "border-gray-100" : "border-gray-800"
            }`}
          >
            {spokenLanguages.map((item, index) => (
              <LanguageCard 
                key={item.language}
                language={item.language}
                level={item.level}
                emoji={item.emoji}
                icon={item.icon}
                index={index}
              />
            ))}
          </div>
        </div>
        
        {/* Skills domains */}
        <div className="relative">
          {skillCategories.map((category, i) => (
            <SkillDomain
              key={category.title}
              title={currentLanguage.skills.domains[category.title].title}
              description={currentLanguage.skills.domains[category.title].description}
              technologies={[category]}
              iconUrl={category.icon} 
              achievements={currentLanguage.skills.domains[category.title].achievements}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;