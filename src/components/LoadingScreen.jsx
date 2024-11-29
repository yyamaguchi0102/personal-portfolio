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
          <div className="text-4xl font-bold mb-6 h-16 flex items-center justify-center">
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
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => handleLanguageSelection("en")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition text-lg"
            >
              <img
                src="https://flagsapi.com/US/flat/32.png"
                alt="US Flag"
                className="w-6 h-6"
              />
              <span>English</span>
            </button>
            <button
              onClick={() => handleLanguageSelection("jp")}
              className="px-6 py-3 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600 transition text-lg"
            >
              <img
                src="https://flagsapi.com/JP/flat/32.png"
                alt="Japanese Flag"
                className="w-6 h-6"
              />
              <span>日本語</span>
            </button>
            <button
              onClick={() => handleLanguageSelection("ko")}
              className="px-6 py-3 bg-yellow-500 text-black rounded-lg flex items-center space-x-2 hover:bg-yellow-600 transition text-lg"
            >
              <img
                src="https://flagsapi.com/KR/flat/32.png"
                alt="Korean Flag"
                className="w-6 h-6"
              />
              <span>한국어</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;