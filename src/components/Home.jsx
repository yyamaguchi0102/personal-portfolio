import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const { text } = useLanguage();
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section
      id="home"
      className={`relative h-screen flex flex-col items-center justify-center ${
        theme === "light"
          ? "bg-light-background text-light-text"
          : "bg-dark-background text-dark-text"
      }`}
      style={{ transition: "background-color 0.5s, color 0.5s" }}
    >
      <div className="text-center relative z-10">
        {/* Static Greeting */}
        <h1 className="text-5xl font-bold mb-4">{text.home.name}</h1>

        {/* Typewriter "I am a ..." */}
        <h2 className="text-3xl font-medium mt-2">
          {text.home.staticPhrase}{" "}
          <span
            className={`font-bold ${
              theme === "light" ? "text-light-accent" : "text-dark-accent"
            }`}
          >
            <Typewriter
              words={text.home.typewriter}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h2>

        {/* Intro Paragraph */}
        <p className="text-lg mt-4">{text.home.intro}</p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center space-x-4">
          <a
            href="https://www.linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition ${
              theme === "light"
                ? "bg-light-accent text-white hover:bg-orange-600"
                : "bg-dark-accent text-black hover:bg-green-700"
            }`}
          >
            {text.home.buttons.linkedin}
          </a>
          <a
            href="https://github.com/yyamaguchi0102"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition ${
              theme === "light"
                ? "bg-gray-700 text-white hover:bg-gray-800"
                : "bg-gray-800 text-white hover:bg-gray-900"
            }`}
          >
            {text.home.buttons.github}
          </a>
          <button
            onClick={toggleModal}
            className={`px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition ${
              theme === "light"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-400 text-white hover:bg-blue-500"
            }`}
          >
            {text.home.buttons.aboutMe}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={toggleModal} // Close modal when clicking outside
        >
          <div
            className={`p-8 rounded-lg shadow-lg max-w-2xl text-center transition ${
              theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            style={{ fontSize: "1.25rem" }} // Increase font size
          >
            <h2 className="text-3xl font-bold mb-4">{text.home.about.title}</h2>
            <p className="leading-relaxed">{text.home.about.content}</p>
            <button
              onClick={toggleModal}
              className={`mt-6 px-4 py-2 rounded-lg text-sm font-medium ${
                theme === "light"
                  ? "bg-light-accent text-white hover:bg-orange-600"
                  : "bg-dark-accent text-black hover:bg-blue-700"
              }`}
            >
              {text.home.about.close}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;