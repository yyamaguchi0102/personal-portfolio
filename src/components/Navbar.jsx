import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const MagneticButton = ({ children, className }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const x = clientX - centerX;
    const y = clientY - centerY;
    
    const magnetStrength = 15;
    const scaledX = x * magnetStrength / width;
    const scaledY = y * magnetStrength / height;
    
    setPosition({ x: scaledX, y: scaledY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, text } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "light"
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-dark-background/90 backdrop-blur-md shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
          : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MagneticButton className="cursor-pointer">
              <div className="relative">
                <span className={theme === "light" ? "text-gray-800" : "text-white"}>
                  Yutaka
                </span>
                <span className={`ml-1 ${
                  theme === "light" ? "text-light-accent" : "text-dark-accent"
                }`}>
                  Y.
                </span>
                <motion.div
                  className={`absolute -bottom-1 left-0 h-0.5 w-0 ${
                    theme === "light" ? "bg-light-accent" : "bg-dark-accent"
                  }`}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </div>
            </MagneticButton>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {[
              { id: "home", label: text.navbar.home },
              { id: "about", label: text.navbar.about },
              { id: "skills", label: text.navbar.skills },
              { id: "projects", label: text.navbar.projects },
              { id: "services", label: text.navbar.services },
              { id: "contact", label: text.navbar.contact },
            ].map((item) => (
              <MagneticButton 
                key={item.id} 
                className="relative px-3 py-2 rounded-lg overflow-hidden"
              >
                <div 
                  onClick={() => scrollToSection(item.id)}
                  className={`relative z-10 font-medium cursor-pointer ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  } hover:${
                    theme === "light" ? "text-gray-900" : "text-white"
                  } transition-colors duration-300`}
                >
                  {item.label}
                </div>
                <motion.div 
                  className={`absolute inset-0 opacity-0 ${
                    theme === "light" ? "bg-gray-100" : "bg-gray-800"
                  } rounded-lg`}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </MagneticButton>
            ))}
          </nav>

          {/* Actions: Language & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <MagneticButton className="cursor-pointer">
              <button
                onClick={toggleLanguage}
                className={`p-2 rounded-full transition-colors ${
                  theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
                }`}
              >
                <motion.span
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-sm font-bold uppercase ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {language === "en" ? "jp" : "en"}
                </motion.span>
              </button>
            </MagneticButton>

            {/* Theme Toggle */}
            <MagneticButton className="cursor-pointer">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
                }`}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: theme === "light" ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {theme === "light" ? (
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </motion.svg>
                  )}
                </motion.div>
              </button>
            </MagneticButton>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
                }`}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`md:hidden ${
              theme === "light"
                ? "bg-white/95 shadow-lg"
                : "bg-dark-background/95 shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
            } backdrop-blur-md`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                {[
                  { id: "home", label: text.navbar.home },
                  { id: "about", label: text.navbar.about },
                  { id: "skills", label: text.navbar.skills },
                  { id: "projects", label: text.navbar.projects },
                  { id: "services", label: text.navbar.services },
                  { id: "contact", label: text.navbar.contact },
                ].map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      onClick={() => scrollToSection(item.id)}
                      className={`block px-4 py-2 rounded-lg font-medium cursor-pointer ${
                        theme === "light"
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-gray-300 hover:bg-gray-800"
                      } hover:${
                        theme === "light" ? "text-gray-900" : "text-white"
                      } transition-colors duration-300`}
                    >
                      {item.label}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar; 