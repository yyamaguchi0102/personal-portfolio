import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useLanguage } from "../contexts/LanguageContext";

const LoadingScreen = ({ onComplete }) => {
  const { toggleLanguage } = useLanguage();
  const [loadingStep, setLoadingStep] = useState(0);
  const [showLanguagePrompt, setShowLanguagePrompt] = useState(false);

  const messages = [
    "Connecting to the mainframe...",
    "Initializing systems...",
    "Decrypting passwords...",
    "Access Granted...",
  ];

  const languagePrompts = [
    "Choose Your Language",
    "言語を選択してください",
    "언어를 선택하세요",
  ];

  useEffect(() => {
    if (loadingStep < messages.length) {
      const timeout = setTimeout(() => {
        setLoadingStep((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      setShowLanguagePrompt(true);
    }
  }, [loadingStep, messages.length]);

  const handleLanguageSelection = (language) => {
    toggleLanguage(language);
    setTimeout(onComplete, 1000);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-green-500 font-mono">
      {!showLanguagePrompt ? (
        <>
          {/* Loading Messages */}
          <div className="text-xl">
            {loadingStep < messages.length ? (
              <p>{messages[loadingStep]}</p>
            ) : null}
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-64 h-1 bg-gray-600">
              <div
                className="h-full bg-green-500"
                style={{
                  width: `${(loadingStep / messages.length) * 100}%`,
                  transition: "width 2s",
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          {/* Typewriter Language Prompt */}
          <div className="text-4xl font-bold mb-6"> {/* Adjust size here */}
            <Typewriter
              words={languagePrompts}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={1000}
            />
          </div>

          {/* Language Selection Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => handleLanguageSelection("en")}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-lg"
            >
              English
            </button>
            <button
              onClick={() => handleLanguageSelection("jp")}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-lg"
            >
              日本語
            </button>
            <button
              onClick={() => handleLanguageSelection("ko")}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-lg"
            >
              한국어
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;