import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { languages } from "../languages.js";

const Contact = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const currentLanguage = languages[language];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, duration: 0.8 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      className="py-24 px-8 w-full mx-auto max-w-7xl flex flex-col items-center justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="w-full max-w-4xl mx-auto">
        {/* Title */}
        <motion.h2
          className={`text-3xl font-bold text-center mb-6 ${
            theme === "light" ? "text-rose-500" : "text-indigo-400"
          }`}
          variants={itemVariants}
        >
          {currentLanguage.contact.title}
        </motion.h2>

        {/* Description */}
        <motion.p className="text-center mb-8 max-w-2xl mx-auto" variants={itemVariants}>
          {currentLanguage.contact.description}
        </motion.p>

        {/* Form */}
        <motion.form className="space-y-6" variants={containerVariants}>
          <motion.input
            type="text"
            placeholder={currentLanguage.contact.namePlaceholder}
            className={`w-full p-4 rounded-lg border ${
              theme === "light" ? "bg-white border-gray-300" : "bg-gray-800 border-gray-600 text-gray-100"
            }`}
            variants={itemVariants}
          />
          <motion.input
            type="email"
            placeholder={currentLanguage.contact.emailPlaceholder}
            className={`w-full p-4 rounded-lg border ${
              theme === "light" ? "bg-white border-gray-300" : "bg-gray-800 border-gray-600 text-gray-100"
            }`}
            variants={itemVariants}
          />
          <motion.textarea
            placeholder={currentLanguage.contact.messagePlaceholder}
            rows="5"
            className={`w-full p-4 rounded-lg border ${
              theme === "light" ? "bg-white border-gray-300" : "bg-gray-800 border-gray-600 text-gray-100"
            }`}
            variants={itemVariants}
          ></motion.textarea>
          <motion.button
            type="submit"
            className={`w-full p-4 rounded-lg font-bold ${
              theme === "light"
                ? "bg-rose-500 text-white hover:bg-rose-600"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            } transition`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentLanguage.contact.sendButton}
          </motion.button>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default Contact;