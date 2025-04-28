import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaChalkboardTeacher, FaLanguage, FaTrumpet } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import ReactDOM from "react-dom";

// Modal Portal to render content to document.body
const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

const Services = () => {
  const { theme } = useTheme();
  const { language, text } = useLanguage();
  
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  // Manage scroll lock when modal is open
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    if (activeModal !== null) {
      // Disable scrolling
      if (scrollContainer) scrollContainer.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      if (scrollContainer) scrollContainer.style.overflow = 'auto';
    }
    
    // Cleanup function to ensure scrolling is re-enabled
    return () => {
      if (scrollContainer) scrollContainer.style.overflow = 'auto';
    };
  }, [activeModal]);

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

  // Enhanced modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Enhanced backdrop animation
  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { 
      opacity: 1, 
      backdropFilter: "blur(8px)",
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { duration: 0.3 }
    }
  };

  // Inner content animation
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2,
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  // List item animation
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
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
    
    // When opening modal, scroll to top of services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const scrollContainer = document.querySelector('.scroll-container');
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTo({
            top: servicesSection.offsetTop - 100,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Ensure services exists with a fallback empty array
  const services = text?.services?.items || [];

  // Map service name to icon key for details lookup
  const getServiceIconKey = (serviceName) => {
    if (!serviceName) return "tutoring"; // Default fallback
    
    if (serviceName.includes("Tutoring") || serviceName.includes("個別指導") || serviceName.includes("과외")) {
      return "tutoring";
    } else if (serviceName.includes("Translation") || serviceName.includes("翻訳") || serviceName.includes("번역")) {
      return "translation";
    } else if (serviceName.includes("Trumpet") || serviceName.includes("トランペット") || serviceName.includes("트럼펫")) {
      return "trumpet";
    }
    return "tutoring"; // default fallback
  };

  // Get service icon
  const getServiceIcon = (serviceName) => {
    const key = getServiceIconKey(serviceName);
    return serviceIcons[key] || serviceIcons.tutoring;
  };
  
  // Service features animation
  const featureIcons = {
    checkmark: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    price: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    time: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <motion.section
      className="min-h-screen py-20 px-8 relative mt-10"
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
            {text?.services?.title}
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
            {text?.services?.description}
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
                {text?.services?.learnMore}
                <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>
        
        {/* Service Detail Modals */}
        <AnimatePresence>
          {activeModal !== null && services[activeModal] && (
            <Portal>
              {/* Fullscreen backdrop with high z-index */}
              <div 
                className="fixed inset-0 w-screen h-screen bg-black/80 backdrop-blur-md"
                style={{ 
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 9999 
                }}
                onClick={closeModal}
              />
              
              {/* Modal Content */}
              <div
                className="fixed inset-0 w-screen h-screen flex items-center justify-center p-4"
                style={{ 
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 10000 
                }}
                onClick={closeModal}
              >
                {/* Modal container with enhanced styling */}
                <motion.div 
                  className={`relative max-w-2xl w-full rounded-xl p-0 mx-auto overflow-hidden
                    ${theme === "light" 
                      ? "bg-white shadow-xl border border-gray-200/50" 
                      : "bg-slate-800 shadow-xl border border-gray-700/30"
                    }`}
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal header with improved gradient and better integration */}
                  <div className={`p-6 relative overflow-hidden ${
                    theme === "light" 
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white" 
                      : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                  }`}>
                    {/* Background grain texture for header */}
                    <div 
                      className="absolute inset-0 bg-repeat mix-blend-overlay opacity-10"
                      style={{ 
                        backgroundImage: `url("https://www.transparenttextures.com/patterns/asfalt-light.png")` 
                      }}
                    />
                    
                    {/* Decorative circles */}
                    <motion.div 
                      className="absolute right-0 top-0 w-32 h-32 rounded-full bg-white/10 -mt-10 -mr-10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />
                    <motion.div 
                      className="absolute left-20 bottom-0 w-16 h-16 rounded-full bg-white/5 -mb-8"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    />
                    
                    <div className="flex items-center relative z-10">
                      <motion.div 
                        className="p-3 bg-white/20 rounded-lg mr-4"
                        initial={{ rotate: -10, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        {getServiceIcon(services[activeModal].name)}
                      </motion.div>
                      <motion.h3 
                        className="text-2xl font-bold"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        {services[activeModal].name}
                      </motion.h3>
                    </div>
                    
                    {/* Close button with improved hover effect */}
                    <motion.button 
                      className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10"
                      onClick={closeModal}
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  {/* Modal content with animations */}
                  <motion.div 
                    className="p-6"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Service full description */}
                    <motion.p 
                      className={`mb-6 ${
                        theme === "light" ? "text-slate-600" : "text-slate-300"
                      }`}
                      variants={listItemVariants}
                    >
                      {services[activeModal].description}
                    </motion.p>
                    
                    {/* Service features */}
                    <motion.div 
                      className="mb-6"
                      variants={listItemVariants}
                    >
                      <h4 className={`text-lg font-semibold mb-4 ${
                        theme === "light" ? "text-slate-800" : "text-white"
                      }`}>
                        {text?.services?.whatIncluded}
                      </h4>
                      <div className="space-y-3">
                        {text?.services?.details[getServiceIconKey(services[activeModal].name)] && (
                          <>
                            <motion.div 
                              className={`flex items-start p-3 rounded-lg ${
                                theme === "light" ? "bg-slate-50" : "bg-slate-700/30"
                              }`}
                              variants={listItemVariants}
                              whileHover={{ scale: 1.01, x: 3 }}
                            >
                              <span className={`mr-3 ${
                                theme === "light" ? "text-indigo-600" : "text-indigo-400"
                              }`}>
                                {featureIcons.checkmark}
                              </span>
                              <span className={theme === "light" ? "text-slate-700" : "text-slate-200"}>
                                {text?.services?.details[getServiceIconKey(services[activeModal].name)].point1}
                              </span>
                            </motion.div>
                            
                            <motion.div 
                              className={`flex items-start p-3 rounded-lg ${
                                theme === "light" ? "bg-slate-50" : "bg-slate-700/30"
                              }`}
                              variants={listItemVariants}
                              whileHover={{ scale: 1.01, x: 3 }}
                            >
                              <span className={`mr-3 ${
                                theme === "light" ? "text-indigo-600" : "text-indigo-400"
                              }`}>
                                {featureIcons.checkmark}
                              </span>
                              <span className={theme === "light" ? "text-slate-700" : "text-slate-200"}>
                                {text?.services?.details[getServiceIconKey(services[activeModal].name)].point2}
                              </span>
                            </motion.div>
                            
                            <motion.div 
                              className={`flex items-start p-3 rounded-lg ${
                                theme === "light" ? "bg-slate-50" : "bg-slate-700/30"
                              }`}
                              variants={listItemVariants}
                              whileHover={{ scale: 1.01, x: 3 }}
                            >
                              <span className={`mr-3 ${
                                theme === "light" ? "text-indigo-600" : "text-indigo-400"
                              }`}>
                                {featureIcons.checkmark}
                              </span>
                              <span className={theme === "light" ? "text-slate-700" : "text-slate-200"}>
                                {text?.services?.details[getServiceIconKey(services[activeModal].name)].point3}
                              </span>
                            </motion.div>
                          </>
                        )}
                      </div>
                    </motion.div>
                    
                    {/* Service details with fluid animation */}
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                      variants={listItemVariants}
                    >
                      {/* Pricing */}
                      <motion.div 
                        className={`p-4 rounded-lg relative overflow-hidden group ${
                          theme === "light" ? "bg-indigo-50" : "bg-indigo-900/20"
                        }`}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-indigo-200/0 to-indigo-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ 
                            backgroundImage: theme === "light" 
                              ? ["linear-gradient(to right, rgba(199,210,254,0), rgba(199,210,254,0))", "linear-gradient(to right, rgba(199,210,254,0), rgba(199,210,254,0.3))", "linear-gradient(to right, rgba(199,210,254,0), rgba(199,210,254,0))"]
                              : ["linear-gradient(to right, rgba(79,70,229,0), rgba(79,70,229,0))", "linear-gradient(to right, rgba(79,70,229,0), rgba(79,70,229,0.1))", "linear-gradient(to right, rgba(79,70,229,0), rgba(79,70,229,0))"]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <h4 className={`text-lg font-semibold mb-2 flex items-center relative z-10 ${
                          theme === "light" ? "text-slate-800" : "text-white"
                        }`}>
                          {featureIcons.price}
                          <span className="ml-2">{text?.services?.pricing}</span>
                        </h4>
                        <p className={`relative z-10 ${theme === "light" ? "text-slate-600" : "text-slate-300"}`}>
                          {text?.services?.details[getServiceIconKey(services[activeModal].name)]?.pricing}
                        </p>
                      </motion.div>
                      
                      {/* Availability */}
                      <motion.div 
                        className={`p-4 rounded-lg relative overflow-hidden group ${
                          theme === "light" ? "bg-violet-50" : "bg-violet-900/20"
                        }`}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-violet-200/0 to-violet-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ 
                            backgroundImage: theme === "light" 
                              ? ["linear-gradient(to right, rgba(221,214,254,0), rgba(221,214,254,0))", "linear-gradient(to right, rgba(221,214,254,0), rgba(221,214,254,0.3))", "linear-gradient(to right, rgba(221,214,254,0), rgba(221,214,254,0))"]
                              : ["linear-gradient(to right, rgba(124,58,237,0), rgba(124,58,237,0))", "linear-gradient(to right, rgba(124,58,237,0), rgba(124,58,237,0.1))", "linear-gradient(to right, rgba(124,58,237,0), rgba(124,58,237,0))"]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <h4 className={`text-lg font-semibold mb-2 flex items-center relative z-10 ${
                          theme === "light" ? "text-slate-800" : "text-white"
                        }`}>
                          {featureIcons.time}
                          <span className="ml-2">{text?.services?.availability}</span>
                        </h4>
                        <p className={`relative z-10 ${theme === "light" ? "text-slate-600" : "text-slate-300"}`}>
                          {text?.services?.details[getServiceIconKey(services[activeModal].name)]?.availability}
                        </p>
                      </motion.div>
                    </motion.div>
                    
                    {/* CTA Button with enhanced hover effect */}
                    <motion.a 
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        closeModal();
                        // This gives time for the modal to close before scrolling
                        setTimeout(() => {
                          const contactSection = document.getElementById('contact');
                          const scrollContainer = document.querySelector('.scroll-container');
                          if (contactSection && scrollContainer) {
                            scrollContainer.scrollTo({
                              top: contactSection.offsetTop - 50,
                              behavior: 'smooth'
                            });
                          }
                        }, 100);
                      }}
                      className={`relative inline-block w-full py-3.5 px-6 text-center rounded-lg font-medium overflow-hidden
                        ${theme === "light" 
                          ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                          : "bg-indigo-500 text-white hover:bg-indigo-600"
                        } transition-colors duration-200 shadow-md`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="absolute inset-0 w-full h-full bg-white/0"
                        whileHover={{
                          background: [
                            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
                            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
                            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
                          ]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="relative z-10">{text?.services?.getStarted}</span>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </Portal>
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
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              const scrollContainer = document.querySelector('.scroll-container');
              if (contactSection && scrollContainer) {
                scrollContainer.scrollTo({
                  top: contactSection.offsetTop,
                  behavior: 'smooth'
                });
              }
            }}
            className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-medium 
              ${theme === "light" 
                ? "bg-rose-500 text-white hover:bg-rose-600" 
                : "bg-indigo-500 text-white hover:bg-indigo-600"
              } transition-colors duration-300 shadow-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {text?.services?.contactButton}
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
  