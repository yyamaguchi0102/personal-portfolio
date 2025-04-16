import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";
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

const Skills = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const currentLanguage = languages[language];
  
  const [clickedLanguageIndex, setClickedLanguageIndex] = useState(null);
  const [clickedProgrammingIndex, setClickedProgrammingIndex] = useState(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.3,
        delayChildren: 0.2,
        ease: "easeOut" 
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.7,
        type: "spring",
        stiffness: 50,
        damping: 15
      } 
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const spokenLanguages = [
    { name: currentLanguage.skills.languages.japanese, level: currentLanguage.skills.proficiency.native, icon: "https://img.icons8.com/color/48/japan.png" },
    { name: currentLanguage.skills.languages.english, level: currentLanguage.skills.proficiency.native, icon: "https://img.icons8.com/color/48/usa.png" },
    { name: currentLanguage.skills.languages.korean, level: currentLanguage.skills.proficiency.fluent, icon: "https://img.icons8.com/color/48/south-korea.png" },
  ];

  const programmingLanguages = [
    { name: "Java", icon: "https://img.icons8.com/color/48/java-coffee-cup-logo.png", tools: ["SpringBoot", "Maven"] },
    { name: "Python", icon: "https://img.icons8.com/color/48/python.png", tools: ["Pandas", "FastAPI", "NumPy", "TensorFlow", "PyCharm"] },
    { name: "Dart", icon: "https://img.icons8.com/?size=100&id=7AFcZ2zirX6Y&format=png&color=000000", tools: ["Flutter", "AngularDart"] },
    { name: "Kotlin", icon: "https://img.icons8.com/color/48/kotlin.png", tools: ["Ktor", "SpringBoot"] },
    { name: "Databases", icon: "https://img.icons8.com/color/48/sql.png", tools: ["MySQL", "PostgreSQL", "MongoDB"] },
    { name: "JavaScript", icon: "https://img.icons8.com/color/48/javascript.png", tools: ["React.js", "Node.js", "React Native"] },
    { name: "TypeScript", icon: "https://img.icons8.com/color/48/typescript.png", tools: ["Angular", "React.ts"] },
    { name: "C", icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg", tools: [""] },
  ];

  const handleLanguageTileClick = (index) => {
    setClickedLanguageIndex(index);
    setTimeout(() => setClickedLanguageIndex(null), 600);
  };

  const handleProgrammingTileClick = (index) => {
    setClickedProgrammingIndex(index);
    setTimeout(() => setClickedProgrammingIndex(null), 600);
  };

  const SkillTile = ({ item, index, isLanguage = false }) => (
    <motion.div
      className={`relative rounded-2xl cursor-pointer overflow-hidden h-full
        ${theme === "light" 
          ? "bg-white/80 shadow-[0_10px_25px_rgba(0,0,0,0.07)]" 
          : "bg-dark-card/80 shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
        } backdrop-blur-sm border border-opacity-20
        ${theme === "light" ? "border-gray-200/50" : "border-gray-700/50"}`}
      variants={itemVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={() => isLanguage ? handleLanguageTileClick(index) : handleProgrammingTileClick(index)}
    >
      <TiltCard>
        <div className="p-6 relative z-10">
          <div className={`w-12 h-12 mx-auto mb-3 rounded-full p-2 
            ${theme === "light" 
              ? "bg-gradient-to-br from-gray-50 to-white shadow-inner" 
              : "bg-gradient-to-br from-dark-card to-dark-background shadow-inner"
            }`}>
            <img 
              src={item.icon} 
              alt={`${item.name} icon`} 
              className={`w-full h-full object-contain transition-transform duration-300
                ${(isLanguage ? clickedLanguageIndex === index : clickedProgrammingIndex === index) ? "scale-105" : ""}`}
            />
          </div>
          <h4 className={`text-lg font-semibold mb-2 text-center
            ${theme === "dark" ? "text-dark-text" : "text-gray-800"}`}>
            {item.name}
          </h4>
          {isLanguage ? (
            <p className={`text-xs font-medium text-center
              ${theme === "dark" ? "text-dark-muted" : "text-gray-600"}`}>
              {item.level}
            </p>
          ) : (
            item.tools && (
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {item.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 text-xs rounded-full font-medium
                      ${theme === "dark" 
                        ? "bg-dark-border/50 text-dark-text" 
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            )
          )}
        </div>
      </TiltCard>
      <motion.div 
        className={`absolute inset-0 rounded-xl opacity-0 transition-all duration-300
          ${theme === "dark" 
            ? "bg-gradient-to-br from-indigo-500/5 to-violet-500/5" 
            : "bg-gradient-to-br from-rose-500/5 to-pink-500/5"
          }`}
        animate={{
          opacity: (isLanguage ? clickedLanguageIndex === index : clickedProgrammingIndex === index) ? 1 : 0
        }}
      />
    </motion.div>
  );

  return (
    <motion.section
      ref={ref}
      className="scroll-offset py-24 pt-16 px-8 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} 
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-4"
          variants={itemVariants}
        >
          <motion.h2 
            className={`text-3xl font-bold inline ${theme === "dark" ? "text-indigo-400" : "text-rose-500"}`}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {currentLanguage.skills.title}
          </motion.h2>
        </motion.div>
        <motion.p
          className="text-base text-center mb-8"
          variants={itemVariants}
        >
          {currentLanguage.skills.description}
        </motion.p>

        {/* Spoken Languages */}
        <motion.div
          className="mb-8"
          variants={containerVariants}
        >
          <motion.h3
            className={`text-2xl font-semibold mb-4 ${theme === "dark" ? "text-indigo-400" : "text-rose-500"}`}
            variants={itemVariants}
          >
            {currentLanguage.skills.sections.spokenLanguages}
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            variants={containerVariants}
          >
            {spokenLanguages.map((lang, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 50,
                    scale: 0.9
                  },
                  visible: i => ({ 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    transition: { 
                      duration: 0.8, 
                      delay: i * 0.2,
                      type: "spring", 
                      damping: 12
                    } 
                  })
                }}
              >
                <SkillTile item={lang} index={index} isLanguage={true} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Programming Stack */}
        <motion.div variants={containerVariants}>
          <motion.h3
            className={`text-2xl font-semibold mb-4 ${theme === "dark" ? "text-indigo-400" : "text-rose-500"}`}
            variants={itemVariants}
          >
            {currentLanguage.skills.sections.programmingStack}
          </motion.h3>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            variants={containerVariants}
          >
            {programmingLanguages.map((lang, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 50,
                    scale: 0.9
                  },
                  visible: i => ({ 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    transition: { 
                      duration: 0.8, 
                      delay: i * 0.1,
                      type: "spring", 
                      damping: 12
                    } 
                  })
                }}
              >
                <SkillTile item={lang} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;