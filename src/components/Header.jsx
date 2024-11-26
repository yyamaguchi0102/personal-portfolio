import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage, language } = useLanguage();

  const flagUrls = {
    en: "https://flagsapi.com/US/flat/64.png",
    jp: "https://flagsapi.com/JP/flat/64.png",
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold dark:text-white">My Portfolio</h1>
        <ul className="flex space-x-4">
          <li>
            <a href="#home" className="hover:text-blue-500 dark:hover:text-blue-400">
              Home
            </a>
          </li>
          <li>
            <a href="#skills" className="hover:text-blue-500 dark:hover:text-blue-400">
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-blue-500 dark:hover:text-blue-400">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-500 dark:hover:text-blue-400">
              Contact
            </a>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            <img
              src={flagUrls[language]}
              alt="Language Flag"
              className="w-5 h-5 mr-2"
            />
            {language === "en" ? "English" : "日本語"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
          >
            {theme === "light" ? (
              <span className="material-icons text-gray-900">Dark Mode</span>
            ) : (
              <span className="material-icons text-gray-100">Light Mode</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;