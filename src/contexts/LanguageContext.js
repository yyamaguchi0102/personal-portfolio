// src/contexts/LanguageContext.js
import { createContext, useState, useContext } from "react";
import { languages } from "../languages";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "jp" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, text: languages[language], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);