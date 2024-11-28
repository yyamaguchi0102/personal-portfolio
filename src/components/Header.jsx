import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage, text } = useLanguage();

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header
      className={`w-full p-4 fixed top-0 left-0 z-50 ${
        theme === "dark"
          ? "bg-dark-background border-b border-dark-accent"
          : "bg-light-background border-b border-light-accent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-dark-accent" : "text-light-accent"
          }`}
        >
          Yutaka Coding
        </h1>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <a href="#home" className="hover:underline">
                {text.header.home}
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:underline">
                {text.header.skills}
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:underline">
                {text.header.projects}
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                {text.header.contact}
              </a>
            </li>
          </ul>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg text-sm ${
              theme === "dark"
                ? "bg-dark-accent text-dark-background hover:bg-dark-text"
                : "bg-light-accent text-light-background hover:bg-light-text"
            } transition`}
          >
            Toggle Mood
          </button>
          <button
            onClick={toggleLanguage}
            className={`px-4 py-2 rounded-lg text-sm ${
              theme === "dark"
                ? "bg-dark-accent text-dark-background hover:bg-dark-text"
                : "bg-light-accent text-light-background hover:bg-light-text"
            } transition`}
          >
            {language === "en" ? "日本語" : "English"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;