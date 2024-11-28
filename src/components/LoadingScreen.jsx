import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const LoadingScreen = ({ onComplete }) => {
  const { toggleLanguage } = useLanguage();
  const [languageSelected, setLanguageSelected] = useState(false);

  const selectLanguage = (language) => {
    toggleLanguage(language);
    setLanguageSelected(true);
    setTimeout(onComplete, 1000);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-green-500 font-mono">
      {!languageSelected ? (
        <>
          <p className="text-lg mb-4">Choose Your Language</p>
          <div className="flex space-x-4">
            <button
              onClick={() => selectLanguage("en")}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              English
            </button>
            <button
              onClick={() => selectLanguage("jp")}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              日本語
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LoadingScreen;