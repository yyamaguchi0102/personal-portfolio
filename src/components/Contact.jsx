import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";

const Contact = () => {
  const { theme } = useTheme();
  const { text } = useLanguage();

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
      id="contact"
      className={`scroll-offset py-16 px-8 ${
        theme === "light" ? "bg-light-background text-light-text" : "bg-dark-background text-dark-text"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Title */}
        <motion.h2
          className={`text-3xl font-bold text-center mb-8 ${
            theme === "light" ? "text-light-accent" : "text-dark-accent"
          }`}
          variants={itemVariants}
        >
          {text.contact.title}
        </motion.h2>

        {/* Description */}
        <motion.p className="text-center mb-8" variants={itemVariants}>
          {text.contact.description}
        </motion.p>

        {/* Form */}
        <motion.form className="space-y-6" variants={containerVariants}>
          <motion.input
            type="text"
            placeholder="Your Name"
            className={`w-full p-4 rounded-lg border ${
              theme === "light" ? "bg-white border-gray-300" : "bg-gray-800 border-gray-600 text-gray-100"
            }`}
            variants={itemVariants}
          />
          <motion.input
            type="email"
            placeholder="Your Email"
            className={`w-full p-4 rounded-lg border ${
              theme === "light" ? "bg-white border-gray-300" : "bg-gray-800 border-gray-600 text-gray-100"
            }`}
            variants={itemVariants}
          />
          <motion.textarea
            placeholder="Your Message"
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
                ? "bg-light-accent text-white hover:bg-orange-600"
                : "bg-dark-accent text-black hover:bg-green-700"
            } transition`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default Contact;