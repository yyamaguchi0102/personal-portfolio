import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Skills = () => {
  const { theme } = useTheme();
  const { text } = useLanguage();

  const spokenLanguages = [
    { name: "Japanese", level: text.skills.proficiency.native, icon: "https://img.icons8.com/color/48/japan.png" },
    { name: "English", level: text.skills.proficiency.native, icon: "https://img.icons8.com/color/48/usa.png" },
    { name: "Korean", level: text.skills.proficiency.fluent, icon: "https://img.icons8.com/color/48/south-korea.png" },
  ];

  const programmingLanguages = [
    { name: "Java", icon: "https://img.icons8.com/color/48/java-coffee-cup-logo.png", tools: ["SpringBoot", "Maven"] },
    { name: "Python", icon: "https://img.icons8.com/color/48/python.png", tools: ["Pandas", "NumPy", "MongoDB", "TensorFlow", "PyCharm"] },
    { name: "Kotlin", icon: "https://img.icons8.com/color/48/kotlin.png", tools: [] },
    { name: "SQL", icon: "https://img.icons8.com/color/48/sql.png", tools: ["MySQL", "NoSQL"] },
    { name: "JavaScript", icon: "https://img.icons8.com/color/48/javascript.png", tools: ["React.js", "Node.js"] },
    { name: "TypeScript", icon: "https://img.icons8.com/color/48/typescript.png", tools: ["Angular"] },
  ];

  return (
    <section
      id="skills"
      className={`scroll-offset py-16 px-8 ${
        theme === "light" ? "bg-light-background text-light-text" : "bg-dark-background text-dark-text dark-mode"
      } relative`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className={`text-4xl font-bold inline ${theme === "dark" ? "neon-text" : "text-light-accent"}`}>
            {text.skills.title}
          </h2>
          <span className={`text-4xl font-bold ${theme === "dark" ? "neon-text" : "text-light-accent"}`}>
            {" {"}
          </span>
        </div>
        <p className="text-lg text-center mb-12">{text.skills.description}</p>

        <div className="mb-12">
          <h3 className={`text-3xl font-semibold mb-6 ${theme === "dark" ? "neon-text" : "text-light-accent"}`}>
            Spoken Languages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {spokenLanguages.map((lang, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105`}
                style={{
                  background: theme === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(32, 32, 32, 0.9)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <img src={lang.icon} alt={`${lang.name} icon`} className="w-12 h-12 mx-auto mb-2" />
                <h4 className="text-xl font-semibold">{lang.name}</h4>
                <p className="text-sm">{lang.level}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-3xl font-semibold mb-6 ${theme === "dark" ? "neon-text" : "text-light-accent"}`}>
            Programming Stack
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {programmingLanguages.map((lang, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105`}
                style={{
                  background: theme === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(32, 32, 32, 0.9)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <img src={lang.icon} alt={`${lang.name} icon`} className="w-10 h-10 mx-auto mb-2" />
                <h4 className="text-lg font-semibold">{lang.name}</h4>
                {lang.tools.length > 0 && (
                  <p className="text-sm mt-2">
                    {lang.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className={`inline-block px-2 py-1 mr-1 rounded-full neon-text-inner`}
                      >
                        {tool}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`absolute bottom-4 right-4 text-4xl font-bold ${
            theme === "dark" ? "neon-text" : "text-light-accent"
          }`}
        >
          {" }"}
        </div>
      </div>
    </section>
  );
};

export default Skills;