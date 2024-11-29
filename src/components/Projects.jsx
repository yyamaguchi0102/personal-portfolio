import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Projects = () => {
  const { theme } = useTheme();
  const { text } = useLanguage();

  const handleButtonClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener noreferrer");
    } else {
      alert("Feature coming soon!");
    }
  };

  return (
    <section
      id="projects"
      className={`py-16 px-8 ${
        theme === "light" ? "bg-light-background text-light-text" : "bg-dark-background text-dark-text"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          {text.projects.title}
        </h2>
        <p className="text-center mb-12">{text.projects.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {text.projects.items.map((project, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
              style={{
                background: theme === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(32, 32, 32, 0.95)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h3 className="text-2xl font-semibold mb-4">{project.name}</h3>
              <p className="mb-4">{project.description}</p>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => handleButtonClick("#")}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    theme === "light"
                      ? "bg-light-accent text-white hover:bg-blue-700"
                      : "bg-dark-accent text-black hover:bg-green-700"
                  }`}
                >
                  {project.demo}
                </button>
                <button
                  onClick={() => handleButtonClick("#")}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    theme === "light"
                      ? "bg-light-accent text-white hover:bg-blue-700"
                      : "bg-dark-accent text-black hover:bg-green-700"
                  }`}
                >
                  {project.repo}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;