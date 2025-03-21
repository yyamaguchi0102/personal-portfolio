import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const ResumeButton = () => {
  const { theme } = useTheme();
  const { text } = useLanguage();

  const Title = {
    name: text.header.resume
  }

  return (
    <a
      href="https://docs.google.com/document/d/11GSYyV8riF_J5v3ewUiMieyqCJpkYWa6/edit?usp=sharing&ouid=100239401016507998095&rtpof=true&sd=true" 
      target="_blank"
      rel="noopener noreferrer"
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
        theme === "dark"
          ? "bg-dark-accent text-white hover:bg-gray-200"
          : "bg-light-accent text-white hover:bg-blue-700"
      }`}
    >
        {Title.name}    
    </a>
  );
};

export default ResumeButton;