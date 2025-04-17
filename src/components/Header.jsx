import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import ResumeButton from "./ResumeButton";
import { motion, AnimatePresence } from "framer-motion";
import { languages } from "../languages.js";

// Define the navigation items with subtle hover animation
const NavItem = ({ name, href, onClick, isActive, isMobileMenuOpen }) => {
  const { theme } = useTheme();
  
  return (
    <motion.li
      className="relative"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      <a 
        href={href} 
        onClick={onClick}
        className={`relative block py-2 px-3 text-base font-medium transition-colors duration-200
          ${isActive 
            ? theme === "light" 
              ? "text-rose-600" 
              : "text-indigo-400" 
            : theme === "light" 
              ? "text-gray-800 hover:text-rose-600" 
              : "text-gray-200 hover:text-indigo-400"
          }
          ${isMobileMenuOpen ? "text-lg" : ""}
        `}
      >
        {name}
        {isActive && (
          <motion.span
            className={`absolute inset-x-0 bottom-0 h-0.5 ${
              theme === "light" ? "bg-rose-500" : "bg-indigo-500"
            }`}
            layoutId="navbar-indicator-desktop"
            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
          />
        )}
      </a>
    </motion.li>
  );
};

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  // Get current language data
  const currentLanguage = languages[language];
  
  const navItems = [
    { id: 'home', name: currentLanguage.header.home, href: '#home' },
    { id: 'skills', name: currentLanguage.header.skills, href: '#skills' },
    { id: 'services', name: currentLanguage.header.services, href: '#services' },
    { id: 'projects', name: currentLanguage.header.projects, href: '#projects' },
    { id: 'contact', name: currentLanguage.header.contact, href: '#contact' },
  ];

  // Add intersection observer to track which section is currently visible
  useEffect(() => {
    const sectionIds = navItems.map(item => item.id);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: "-100px 0px -50% 0px", 
        threshold: 0.1 
      }
    );
    
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [navItems]);

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    if (!scrollContainer) return;

    const handleScroll = () => {
      const currentScrollPos = scrollContainer.scrollTop;
      
      // Set scrolled state for styling
      setScrolled(currentScrollPos > 10);
      
      // Always show header
      setVisible(true);
    };
    
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Get the target's position and adjust for header height
      const headerHeight = 120; // Same as scroll-margin-top
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      // Scroll to the adjusted position
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed w-full z-30 transition-all duration-300
        ${theme === "light" 
          ? "bg-white/80 backdrop-blur-sm shadow-xs" 
          : "bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Name */}
          <a 
            href="#home" 
            className="flex items-center space-x-2"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <motion.span 
              className={`font-bold text-xl ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              {currentLanguage.header.name}
            </motion.span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.name}
                  name={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  isActive={activeSection === item.id}
                  isMobileMenuOpen={false}
                />
              ))}
            </ul>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Resume Button - Moved to the left of theme toggle */}
            <motion.a
              href="https://docs.google.com/document/d/11GSYyV8riF_J5v3ewUiMieyqCJpkYWa6/edit?usp=sharing&ouid=100239401016507998095&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden md:flex items-center px-3 py-1.5 rounded-lg font-medium transition-colors duration-200 ${
                theme === "light"
                  ? "bg-rose-500 text-white hover:bg-rose-600"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 8a1 1 0 10-2 0v6.5a.5.5 0 01-.5.5H3.5a.5.5 0 01-.5-.5V8a1 1 0 10-2 0v6.5A2.5 2.5 0 003.5 17h10a2.5 2.5 0 002.5-2.5V8z" />
              </svg>
              {currentLanguage.header.resume}
            </motion.a>
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "light" 
                  ? "bg-gray-100 hover:bg-gray-200" 
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </motion.button>
            
            {/* Language Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={`p-2 rounded-full ${
                  theme === "light" 
                    ? "bg-gray-100 hover:bg-gray-200" 
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
                aria-label="Language Menu"
              >
                <span className="font-medium text-sm">
                  {language === "en" ? "EN" : language === "jp" ? "JP" : "KO"}
                </span>
              </motion.button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-36 rounded-lg shadow-lg overflow-hidden z-50 
                      ${theme === "light" 
                        ? "bg-white ring-1 ring-gray-200" 
                        : "bg-gray-800 ring-1 ring-gray-700"
                      }`}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setLanguage("en");
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          language === "en"
                            ? theme === "light" 
                              ? "bg-gray-100 text-gray-900 font-medium" 
                              : "bg-gray-700 text-white font-medium"
                            : theme === "light" 
                              ? "text-gray-700 hover:bg-gray-100" 
                              : "text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center">
                          <img src="https://img.icons8.com/color/24/usa.png" alt="USA" className="w-5 h-5 mr-2" />
                          English
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setLanguage("jp");
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          language === "jp"
                            ? theme === "light" 
                              ? "bg-gray-100 text-gray-900 font-medium" 
                              : "bg-gray-700 text-white font-medium"
                            : theme === "light" 
                              ? "text-gray-700 hover:bg-gray-100" 
                              : "text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center">
                          <img src="https://img.icons8.com/color/24/japan.png" alt="Japan" className="w-5 h-5 mr-2" />
                          日本語
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setLanguage("ko");
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          language === "ko"
                            ? theme === "light" 
                              ? "bg-gray-100 text-gray-900 font-medium" 
                              : "bg-gray-700 text-white font-medium"
                            : theme === "light" 
                              ? "text-gray-700 hover:bg-gray-100" 
                              : "text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center">
                          <img src="https://img.icons8.com/color/24/south-korea.png" alt="South Korea" className="w-5 h-5 mr-2" />
                          한국어
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 rounded-full ${
                theme === "light" 
                  ? "bg-gray-100 hover:bg-gray-200" 
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <motion.ul 
                className="py-3 space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {navItems.map((item) => (
                  <NavItem
                    key={item.name}
                    name={item.name}
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    isActive={activeSection === item.id}
                    isMobileMenuOpen={true}
                  />
                ))}
                
                {/* Resume Button (Mobile) */}
                <motion.li
                  className="relative mt-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href="https://docs.google.com/document/d/11GSYyV8riF_J5v3ewUiMieyqCJpkYWa6/edit?usp=sharing&ouid=100239401016507998095&rtpof=true&sd=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center py-2 px-3 text-base font-medium ${
                      theme === "light" 
                        ? "text-rose-600"
                        : "text-indigo-400"
                    }`}
                  >
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 8a1 1 0 10-2 0v6.5a.5.5 0 01-.5.5H3.5a.5.5 0 01-.5-.5V8a1 1 0 10-2 0v6.5A2.5 2.5 0 003.5 17h10a2.5 2.5 0 002.5-2.5V8z" />
                    </svg>
                    {currentLanguage.header.resume}
                  </a>
                </motion.li>
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;