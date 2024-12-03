import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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
          Yutaka Yamaguchi
        </h1>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <a
                href="#home"
                className={`hover:underline ${
                  theme === "dark" ? "text-dark-accent" : "text-light-accent"
                }`}
              >
                {language === "en"
                  ? "Home"
                  : language === "jp"
                  ? "ホーム"
                  : "홈"}
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={`hover:underline ${
                  theme === "dark" ? "text-dark-accent" : "text-light-accent"
                }`}
              >
                {language === "en"
                  ? "Skills"
                  : language === "jp"
                  ? "スキル"
                  : "기술"}
              </a>
            </li>
            <li>
              <a
                href="#services"
                className={`hover:underline ${
                  theme === "dark" ? "text-dark-accent" : "text-light-accent"
                }`}
              >
                {language === "en"
                  ? "Services"
                  : language === "jp"
                  ? "サービス"
                  : "서비스"}
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={`hover:underline ${
                  theme === "dark" ? "text-dark-accent" : "text-light-accent"
                }`}
              >
                {language === "en"
                  ? "Projects"
                  : language === "jp"
                  ? "プロジェクト"
                  : "프로젝트"}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`hover:underline ${
                  theme === "dark" ? "text-dark-accent" : "text-light-accent"
                }`}
              >
                {language === "en"
                  ? "Contact"
                  : language === "jp"
                  ? "お問い合わせ"
                  : "연락처"}
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
            {language === "en"
              ? "Toggle Mood"
              : language === "jp"
              ? "テーマを変更"
              : "테마 변경"}
          </button>
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`px-4 py-2 rounded-lg text-sm ${
                theme === "dark"
                  ? "bg-dark-accent text-dark-background hover:bg-dark-text"
                  : "bg-light-accent text-light-background hover:bg-light-text"
              } transition`}
            >
              {language === "en"
                ? "English"
                : language === "jp"
                ? "日本語"
                : "한국어"}
            </button>
            {dropdownOpen && (
              <div
                className={`absolute right-0 mt-2 py-2 w-40 rounded-lg shadow-lg ${
                  theme === "dark" ? "bg-dark-background" : "bg-light-background"
                }`}
              >
                <button
                  onClick={() => {
                    toggleLanguage("en");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  English
                </button>
                <button
                  onClick={() => {
                    toggleLanguage("jp");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  日本語
                </button>
                <button
                  onClick={() => {
                    toggleLanguage("ko");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  한국어
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;