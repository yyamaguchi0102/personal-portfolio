import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import React, { useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Skills = () => {
  const { theme } = useTheme();
  const { text } = useLanguage();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const spokenLanguages = [
    { name: text.skills.languages.japanese, level: text.skills.proficiency.native, icon: "https://img.icons8.com/color/48/japan.png" },
    { name: text.skills.languages.english, level: text.skills.proficiency.native, icon: "https://img.icons8.com/color/48/usa.png" },
    { name: text.skills.languages.korean, level: text.skills.proficiency.fluent, icon: "https://img.icons8.com/color/48/south-korea.png" },
  ];

  const programmingLanguages = [
    { name: "Java", icon: "https://img.icons8.com/color/48/java-coffee-cup-logo.png", tools: ["SpringBoot", "Maven"] },
    { name: "Python", icon: "https://img.icons8.com/color/48/python.png", tools: ["Pandas", "NumPy", "MongoDB", "TensorFlow", "PyCharm"] },
    { name: "Kotlin", icon: "https://img.icons8.com/color/48/kotlin.png", tools: ["Ktor"] },
    { name: "SQL", icon: "https://img.icons8.com/color/48/sql.png", tools: ["MySQL", "NoSQL"] },
    { name: "JavaScript", icon: "https://img.icons8.com/color/48/javascript.png", tools: ["React.js", "Node.js"] },
    { name: "TypeScript", icon: "https://img.icons8.com/color/48/typescript.png", tools: ["Angular"] },
  ];

  return (
    <motion.section
      id="skills"
      ref={ref}
      className={`scroll-offset py-16 px-8 ${
        theme === "light" ? "bg-light-background text-light-text" : "bg-dark-background text-dark-text dark-mode"
      } relative`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} 
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-6"
          variants={itemVariants}
        >
          <h2 className={`text-4xl font-bold inline ${theme === "dark" ? "neon-text" : "text-light-accent"}`}>
            {text.skills.title}
          </h2>
          <span className={`text-4xl font-bold ${theme === "dark" ? "neon-text" : "text-light-accent"}`}>
           
          </span>
        </motion.div>
        <motion.p
          className="text-lg text-center mb-12"
          variants={itemVariants}
        >
          {text.skills.description}
        </motion.p>

        {/* Spoken Languages */}
        <motion.div
          className="mb-12"
          variants={containerVariants}
        >
          <motion.h3
            className={`text-3xl font-semibold mb-6 ${theme === "dark" ? "neon-text" : "text-light-accent"}`}
            variants={itemVariants}
          >
            Spoken Languages
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {spokenLanguages.map((lang, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105`}
                style={{
                  background: theme === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(32, 32, 32, 0.9)",
                  backdropFilter: "blur(8px)",
                }}
                variants={itemVariants}
              >
                <img src={lang.icon} alt={`${lang.name} icon`} className="w-12 h-12 mx-auto mb-2" />
                <h4 className="text-xl font-semibold">{lang.name}</h4>
                <p className="text-sm">{lang.level}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Programming Stack */}
        <motion.div variants={containerVariants}>
          <motion.h3
            className={`text-3xl font-semibold mb-6 ${theme === "dark" ? "neon-text" : "text-light-accent"}`}
            variants={itemVariants}
          >
            Programming Stack
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4"
            variants={containerVariants}
          >
            {programmingLanguages.map((lang, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105`}
                style={{
                  background: theme === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(32, 32, 32, 0.9)",
                  backdropFilter: "blur(8px)",
                }}
                variants={itemVariants}
              >
                <img src={lang.icon} alt={`${lang.name} icon`} className="w-10 h-10 mx-auto mb-2" />
                <h4 className="text-lg font-semibold">{lang.name}</h4>
                {lang.tools.length > 0 && (
                  <p className="text-sm mt-2">
                    {lang.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className={`inline-block px-2 py-1 mr-1 rounded-full neon-text-inner`}
                      >
                        {tool}
                      </span>
                    ))}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Closing Bracket */}
        <motion.div
          className={`absolute bottom-4 right-4 text-4xl font-bold ${
            theme === "dark" ? "neon-text" : "text-light-accent"
          }`}
          variants={itemVariants}
        >
          
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;