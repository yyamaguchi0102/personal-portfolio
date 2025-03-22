import React, { useState, useContext } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { languages } from "../languages";
import { motion, AnimatePresence } from "framer-motion";
import { FaChalkboardTeacher, FaLanguage, FaTrumpet } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';

const Services = () => {
  const { theme } = useTheme();
  const { currentLanguage } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Header animation
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  // Service card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    }
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  // Service icons - keep this part
  const serviceIcons = {
    "Language Tutoring": <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    "Translation Services": <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>,
    "Trumpet Lessons": <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>,
  };

  const openServiceModal = (index) => {
    setActiveModal(index);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const services = currentLanguage.services.items;

  // Map service name to icon key for details lookup
  const getServiceIconKey = (serviceName) => {
    if (serviceName.includes("Tutoring") || serviceName.includes("個別指導") || serviceName.includes("과외")) {
      return "tutoring";
    } else if (serviceName.includes("Translation") || serviceName.includes("翻訳") || serviceName.includes("번역")) {
      return "translation";
    } else if (serviceName.includes("Trumpet") || serviceName.includes("トランペット") || serviceName.includes("트럼펫")) {
      return "trumpet";
    }
    return "tutoring"; // default fallback
  };

  return (
    <motion.section
      className="min-h-screen py-20 px-8 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Background element */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className={`absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl
            ${theme === "light" ? "bg-rose-400" : "bg-indigo-500"}`}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className={`absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl
            ${theme === "light" ? "bg-amber-400" : "bg-purple-500"}`}
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={headerVariants}>
          <motion.h2 
            className={`text-4xl font-bold mb-4 inline-block
              ${theme === "light" ? "text-rose-600" : "text-indigo-400"}`}
            variants={headerVariants}
          >
            {currentLanguage.services.title}
            <motion.div 
              className={`h-1 mt-1 ${theme === "light" ? "bg-rose-500" : "bg-indigo-500"}`}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.h2>
          
          <motion.p 
            className={`text-lg max-w-2xl mx-auto
              ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
            variants={headerVariants}
          >
            {currentLanguage.services.description}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className={`rounded-xl p-8 ${theme === "light" 
                ? hoveredCard === index
                  ? "bg-gradient-to-b from-gray-100 to-white shadow-lg border border-gray-200" 
                  : "bg-white/80 border border-gray-200 shadow-md"
                : hoveredCard === index
                  ? "bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg border border-gray-700" 
                  : "bg-gray-800/60 border border-gray-700 shadow-md"
              } backdrop-blur-sm transition-all duration-300 relative overflow-hidden`}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Animated background element on hover */}
              {hoveredCard === index && (
                <motion.div 
                  className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-20
                    ${theme === "light" ? "bg-rose-400" : "bg-indigo-500"}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              {/* Service icon */}
              <div className={`mb-5 ${theme === "light" 
                ? "text-rose-500" 
                : "text-indigo-400"}`}
              >
                {serviceIcons[service.name] || (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              
              {/* Service title */}
              <h3 className={`text-xl font-bold mb-3 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                {service.name}
              </h3>
              
              {/* Service description */}
              <p className={`${theme === "light" ? "text-gray-600" : "text-gray-300"} relative z-10`}>
                {service.description}
              </p>
              
              {/* Animated learn more button */}
              <motion.button 
                className={`mt-6 inline-flex items-center text-sm font-medium cursor-pointer
                  ${theme === "light" ? "text-rose-600" : "text-indigo-400"}`}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: hoveredCard === index ? 1 : 0.7 }}
                whileHover={{ x: 5 }}
                onClick={() => openServiceModal(index)}
              >
                {currentLanguage.services.learnMore}
                <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>
        
        {/* Service Detail Modals */}
        <AnimatePresence>
          {activeModal !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div 
                className={`relative max-w-lg w-full rounded-2xl p-8 mx-auto overflow-hidden ${
                  theme === "light" 
                    ? "bg-white shadow-xl border border-gray-200" 
                    : "bg-gray-800 shadow-xl border border-gray-700"
                }`}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button 
                  className={`absolute top-4 right-4 p-1 rounded-full ${
                    theme === "light" 
                      ? "text-gray-500 hover:bg-gray-100" 
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                  onClick={closeModal}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Service icon and title */}
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-full mr-4 ${
                    theme === "light" 
                      ? "bg-rose-100 text-rose-500" 
                      : "bg-indigo-900/30 text-indigo-400"
                  }`}>
                    {serviceIcons[services[activeModal].name]}
                  </div>
                  <h3 className={`text-2xl font-bold ${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }`}>
                    {services[activeModal].name}
                  </h3>
                </div>
                
                {/* Service full description */}
                <p className={`mb-6 ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}>
                  {services[activeModal].description}
                </p>
                
                {/* Service bullet points */}
                <div className="mb-6">
                  <h4 className={`text-lg font-semibold mb-3 ${
                    theme === "light" ? "text-gray-800" : "text-gray-200"
                  }`}>
                    {currentLanguage.services.whatIncluded}
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className={`mr-2 mt-1 ${
                        theme === "light" ? "text-rose-500" : "text-indigo-400"
                      }`}>•</span>
                      <span>{currentLanguage.services.details[getServiceIconKey(services[activeModal].name)].point1}</span>
                    </li>
                    <li className="flex items-start">
                      <span className={`mr-2 mt-1 ${
                        theme === "light" ? "text-rose-500" : "text-indigo-400"
                      }`}>•</span>
                      <span>{currentLanguage.services.details[getServiceIconKey(services[activeModal].name)].point2}</span>
                    </li>
                    <li className="flex items-start">
                      <span className={`mr-2 mt-1 ${
                        theme === "light" ? "text-rose-500" : "text-indigo-400"
                      }`}>•</span>
                      <span>{currentLanguage.services.details[getServiceIconKey(services[activeModal].name)].point3}</span>
                    </li>
                  </ul>
                </div>
                
                {/* Pricing */}
                <div className="mb-6">
                  <h4 className={`text-lg font-semibold mb-2 ${
                    theme === "light" ? "text-gray-800" : "text-gray-200"
                  }`}>
                    {currentLanguage.services.pricing}
                  </h4>
                  <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
                    {currentLanguage.services.details[getServiceIconKey(services[activeModal].name)].pricing}
                  </p>
                </div>
                
                {/* Availability */}
                <div className="mb-8">
                  <h4 className={`text-lg font-semibold mb-2 ${
                    theme === "light" ? "text-gray-800" : "text-gray-200"
                  }`}>
                    {currentLanguage.services.availability}
                  </h4>
                  <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
                    {currentLanguage.services.details[getServiceIconKey(services[activeModal].name)].availability}
                  </p>
                </div>
                
                {/* CTA Button */}
                <motion.a 
                  href="#contact"
                  onClick={closeModal}
                  className={`inline-block w-full py-3 px-6 text-center rounded-lg font-medium 
                    ${theme === "light" 
                      ? "bg-rose-500 text-white hover:bg-rose-600" 
                      : "bg-indigo-500 text-white hover:bg-indigo-600"
                    } transition-colors`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentLanguage.services.getStarted}
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Call to action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a
            href="#contact"
            className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-medium 
              ${theme === "light" 
                ? "bg-rose-500 text-white hover:bg-rose-600" 
                : "bg-indigo-500 text-white hover:bg-indigo-600"
              } transition-colors duration-300 shadow-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentLanguage.services.contactButton}
            <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;
  