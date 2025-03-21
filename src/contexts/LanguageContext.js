import { createContext, useState, useContext } from "react";
import { languages } from "../languages";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    // Cycle through available languages: en -> jp -> ko -> en
    if (language === "en") {
      setLanguage("jp");
    } else if (language === "jp") {
      setLanguage("ko");
    } else {
      setLanguage("en");
    }
  };

  return (
    <LanguageContext.Provider value={{ language, text: languages[language], toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);