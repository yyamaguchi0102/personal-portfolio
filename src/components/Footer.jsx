import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { languages } from "../languages.ts";

const Footer = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const currentLanguage = languages[language];
  const currentYear = new Date().getFullYear();

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1,
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/yutaka-yamaguchi",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.018-2.013-1.227-2.013-1.227 0-1.415.957-1.415 1.947v5.67h-3v-11h2.85v1.634h.042c.494-.936 1.699-1.924 3.5-1.924 3.742 0 4.4 2.464 4.4 5.667v6.623z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/yyamaguchi0102?tab=repositories",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:yyamaguchi0102@gmail.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { name: currentLanguage.header.home, href: "#home" },
    { name: currentLanguage.header.skills, href: "#skills" },
    { name: currentLanguage.header.projects, href: "#projects" },
    { name: currentLanguage.header.contact, href: "#contact" },
  ];

  return (
    <motion.footer
      className={`py-12 ${
        theme === "light" 
          ? "bg-gray-100 text-gray-800" 
          : "bg-gray-900 text-gray-200"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
            <h3 className={`text-xl font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Yutaka Yamaguchi
            </h3>
            <p className={`mb-4 max-w-md ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              {currentLanguage.footer.description}
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full ${
                    theme === "light"
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  } transition-colors duration-200`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              {currentLanguage.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className={`transition-colors duration-200 block py-1 ${
                      theme === "light" 
                        ? "text-gray-600 hover:text-rose-500" 
                        : "text-gray-400 hover:text-indigo-400"
                    }`}
                    whileHover={{ x: 3 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              {currentLanguage.footer.contact}
            </h3>
            <p className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              Tokyo, Japan
            </p>
            <p className={`${theme === "light" ? "text-gray-600" : "text-gray-400"} mt-2`}>
              yyamaguchi0102@gmail.com
            </p>
            
            {/* Resume link */}
            <motion.a
              href="https://docs.google.com/document/d/11GSYyV8riF_J5v3ewUiMieyqCJpkYWa6/edit?usp=sharing&ouid=100239401016507998095&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                theme === "light"
                  ? "bg-rose-500 text-white hover:bg-rose-600"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              } transition-colors duration-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              {currentLanguage.footer.resume}
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className={`border-t ${
            theme === "light" ? "border-gray-200" : "border-gray-800"
          } my-8`}
          variants={itemVariants}
        />

        {/* Copyright */}
        <motion.div className="flex flex-col md:flex-row justify-between items-center" variants={itemVariants}>
          <p className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
            © {currentYear} Yutaka Yamaguchi. {currentLanguage.footer.rights}
          </p>
          <p className={`text-sm mt-2 md:mt-0 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
            {currentLanguage.footer.designed} <span className="font-medium">React & Tailwind CSS</span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer; 