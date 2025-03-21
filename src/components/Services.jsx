import React, { useState, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
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

const Services = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const currentLanguage = languages[language];
  
  const [clickedIndex, setClickedIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
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

  const handleServiceClick = (index) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 600);
  };

  const services = currentLanguage.services.items;

  return (
    <motion.section
      id="services"
      className="min-h-screen py-24 px-8 flex flex-col justify-center relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className={`text-3xl font-bold text-center mb-5
            ${theme === "dark" ? "text-indigo-400" : "text-rose-500"}`}
          variants={itemVariants}
        >
          {currentLanguage.services.title}
        </motion.h2>
        <motion.p
          className={`text-base text-center mb-10 max-w-3xl mx-auto
            ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
          variants={itemVariants}
        >
          {currentLanguage.services.description}
        </motion.p>

        {/* Service Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`relative rounded-2xl overflow-hidden h-full
                ${theme === "light" 
                  ? "bg-white/80 shadow-[0_10px_25px_rgba(0,0,0,0.07)]" 
                  : "bg-dark-card/80 shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
                } backdrop-blur-sm border border-opacity-20
                ${theme === "light" ? "border-gray-200/50" : "border-gray-700/50"}`}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleServiceClick(index)}
            >
              <TiltCard>
                <div className="p-6 relative z-10">
                  <div className="relative mb-4">
                    <div className={`absolute -left-3 top-0 h-full w-1 rounded-full 
                      ${theme === "light" 
                        ? "bg-gradient-to-b from-rose-500 to-pink-600" 
                        : "bg-gradient-to-b from-indigo-500 to-violet-600"
                      }`} 
                    />
                    <h3
                      className={`text-xl font-semibold ml-1
                        ${theme === "light" ? "text-gray-800" : "text-gray-100"}`}
                    >
                      {service.name}
                    </h3>
                  </div>
                  <p
                    className={`text-sm leading-relaxed
                      ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
                  >
                    {service.description}
                  </p>
                </div>
              </TiltCard>
              <motion.div 
                className={`absolute inset-0 rounded-xl opacity-0 transition-all duration-300
                  ${theme === "dark" 
                    ? "bg-gradient-to-br from-indigo-500/5 to-violet-500/5" 
                    : "bg-gradient-to-br from-rose-500/5 to-pink-500/5"
                  }`}
                animate={{
                  opacity: clickedIndex === index ? 1 : 0
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;
  