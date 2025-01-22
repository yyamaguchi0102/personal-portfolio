import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";

const Projects = () => {
  const { theme } = useTheme();
  const { text } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1 },
    },
  };

  return (
    <motion.section
      id="projects"
      className={`min-h-screen py-16 px-8 ${
        theme === "light" ? "bg-light-background text-light-text" : "bg-dark-background text-dark-text"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center"
          variants={itemVariants}
        >
          {text.projects.title}
        </motion.h2>
        <motion.p className="text-center mb-12" variants={itemVariants}>
          {text.projects.description}
        </motion.p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
        >
          {text.projects.items.map((project, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: theme === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(32, 32, 32, 0.95)",
                backdropFilter: "blur(8px)",
              }}
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold mb-4">{project.name}</h3>
              <p className="mb-4">{project.description}</p>
              <div className="mt-4">
                <h4 className="text-lg font-medium mb-2">
                  {text.projects.technologiesUsed}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(project.tech || []).map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-sm rounded-full ${
                        theme === "light" ? "bg-gray-200" : "bg-gray-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <a
                  href={project.demoUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    theme === "light"
                      ? "bg-light-accent text-white hover:bg-blue-700"
                      : "bg-dark-accent text-black hover:bg-green-700"
                  }`}
                >
                  {project.demo}
                </a>
                <a
                  href={project.repoUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    theme === "light"
                      ? "bg-light-accent text-white hover:bg-blue-700"
                      : "bg-dark-accent text-black hover:bg-green-700"
                  }`}
                >
                  {project.repo}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;