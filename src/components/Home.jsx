import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const { theme } = useTheme();
  const { text } = useLanguage();

  return (
    <section
      id="home"
      className={`relative h-screen flex flex-col items-center justify-center transition-all duration-500 ${
        theme === "light"
          ? "bg-light-background text-light-text"
          : "bg-dark-background text-dark-text"
      }`}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Hi, my name is {text.home.name}</h1>
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
        <p className="mt-4 text-lg">{text.home.intro}</p>
      </div>
    </section>
  );
};

export default Home;