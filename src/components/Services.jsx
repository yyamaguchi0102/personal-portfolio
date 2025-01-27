import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";

const Services = () => {
  const { theme } = useTheme();
  const { text } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const services = text.services.items;

  return (
    <motion.section
      id="services"
      className={`min-h-screen py-16 px-8 flex flex-col justify-center ${
        theme === "light" ? "bg-light-background text-light-text" : "bg-dark-background text-dark-text"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-5xl font-bold text-center mb-6"
          variants={itemVariants}
        >
          {text.services.title}
        </motion.h2>
        <motion.p
          className={`text-lg text-center mb-12 max-w-3xl mx-auto ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
          variants={itemVariants}
        >
          {text.services.description}
        </motion.p>

        {/* Service Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: theme === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(32, 32, 32, 0.95)",
                backdropFilter: "blur(8px)",
              }}
              variants={itemVariants}
            >
              <h3
                className={`text-2xl font-semibold mb-4 ${
                  theme === "light" ? "text-gray-900" : "text-gray-100"
                }`}
              >
                {service.name}
              </h3>
              <p
                className={`text-base leading-relaxed ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;
  