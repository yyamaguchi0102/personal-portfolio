import React, { createContext, useState, useContext, ReactNode } from "react";
import { languages } from "../languages";
import { LanguageKey, LanguageContent } from "../types/languages";

interface LanguageContextType {
  language: LanguageKey;
  text: LanguageContent;
  toggleLanguage: () => void;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageKey>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<LanguageKey>("en");

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
    <LanguageContext.Provider value={{ 
      language, 
      text: languages[language], 
      toggleLanguage, 
      setLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}; 