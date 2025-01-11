import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const LoadingScreen = ({ onComplete }) => {
  const { setTheme } = useTheme();
  const { text, toggleLanguage } = useLanguage(); // Use language text and toggle function
  const [loadingStep, setLoadingStep] = useState(0);
  const [showLanguagePrompt, setShowLanguagePrompt] = useState(false);
  const [showMoodPrompt, setShowMoodPrompt] = useState(false);

  const messages = [
    "Initializing systems...",
    "Decrypting passwords...",
    "Access Granted...",
  ];

  const languagePrompts = [
    "Select A Language",
    "言語を選択してください",
    "언어를 선택하세요",
  ];

  const handleLanguageSelection = (language) => {
    toggleLanguage(language); // Set the selected language
    setShowLanguagePrompt(false);
    setShowMoodPrompt(true); // Show mood selection
  };

  const handleMoodSelection = (mood) => {
    setTheme(mood);
    setTimeout(onComplete, 1000); // Proceed to the main app
  };

  useEffect(() => {
    if (loadingStep < messages.length) {
      const timeout = setTimeout(() => {
        setLoadingStep((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timeout);
    } else {
      setShowLanguagePrompt(true);
    }
    // eslint-disable-next-line
  }, [loadingStep]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-green-500 font-mono relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 animate-gradient-blur"></div>

      {!showLanguagePrompt && !showMoodPrompt ? (
        <>
          {/* Typewriter Loading Messages */}
          <div className="text-xl z-10">
            <Typewriter
              words={messages}
              cursor
              loop={false}
              typeSpeed={50}
              deleteSpeed={30}
            />
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-64 h-1 bg-gray-600 z-10">
            <div
              className="h-full bg-green-500"
              style={{
                width: `${(loadingStep / messages.length) * 100}%`,
                transition: "width 2s",
              }}
            />
          </div>
        </>
      ) : showLanguagePrompt ? (
        <div className="text-center z-10">
          {/* Language Selection */}
          <div className="text-4xl font-bold mb-6 h-16 flex items-center justify-center">
            <Typewriter
              words={languagePrompts}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => handleLanguageSelection("en")}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-md"
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
              className="px-6 py-3 bg-gray-700 text-white rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-md"
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
              className="px-6 py-3 bg-gray-700 text-white rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-md"
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
      ) : (
        <div className="text-center z-10">
          {/* Mood Selection */}
          <h1 className="text-4xl font-bold mb-8">{text.loadingScreen.moodPrompt}</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => handleMoodSelection("light")}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              {text.loadingScreen.moodBright}
            </button>
            <button
              onClick={() => handleMoodSelection("dark")}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              {text.loadingScreen.moodDark}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;