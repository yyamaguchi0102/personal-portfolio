import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const Projects = () => {
  const { theme } = useTheme();

  const projects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio built with React and Tailwind CSS.",
      tech: ["React", "Tailwind CSS", "JavaScript"],
      link: "https://your-portfolio-link.com",
      repo: "https://github.com/your-portfolio-repo",
    },
    {
      title: "Typing Speed Game",
      description: "A game to test typing speed and accuracy.",
      tech: ["React", "JavaScript"],
      link: "https://typing-speed-game.com",
      repo: "https://github.com/typing-speed-repo",
    },
    {
      title: "ML Project",
      description: "A machine learning project focused on predictive analytics.",
      tech: ["Python", "TensorFlow", "Pandas"],
      link: "",
      repo: "https://github.com/ml-project-repo",
    },
  ];

  return (
    <section
      id="projects"
      className={`scroll-offset py-16 px-8 ${
        theme === "light" ? "bg-light-background text-light-text" : "bg-dark-background text-dark-text"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          My <span className={theme === "light" ? "text-light-accent" : "text-dark-accent"}>Projects</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              style={{
                background: theme === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(32, 32, 32, 0.9)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-xs ${
                      theme === "light" ? "bg-gray-200" : "bg-gray-700"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium ${
                      theme === "light" ? "text-light-accent" : "text-dark-accent"
                    } hover:underline`}
                  >
                    Live Demo
                  </a>
                )}
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${
                    theme === "light" ? "text-light-accent" : "text-dark-accent"
                  } hover:underline`}
                >
                  GitHub Repo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;