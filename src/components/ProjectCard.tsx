import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

// Define the structure of a project
export interface ProjectType {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  type?: "web" | "mobile" | "ai" | "other";
}

// Define the props for the ProjectCard component
interface ProjectCardProps {
  project: ProjectType;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { text } = useLanguage();

  // Determine background color based on project type
  const getBgOverlay = (): string => {
    if (project.type === "web") {
      return "bg-gradient-to-br from-blue-500/70 to-purple-500/70 backdrop-blur-sm";
    } else if (project.type === "mobile") {
      return "bg-gradient-to-br from-green-500/70 to-teal-500/70 backdrop-blur-sm";
    } else if (project.type === "ai") {
      return "bg-gradient-to-br from-amber-500/70 to-red-500/70 backdrop-blur-sm";
    } else {
      return "bg-gradient-to-br from-gray-500/70 to-gray-700/70 backdrop-blur-sm";
    }
  };

  // Determine image based on technology/type if no specific image is provided
  const getProjectImage = (): string => {
    if (project.imageUrl) {
      return project.imageUrl;
    }

    // Use placeholder images without text
    const techLower = project.technologies.map(tech => tech.toLowerCase());

    if (techLower.includes("react")) {
      return "https://via.placeholder.com/800x600/61DAFB/FFFFFF";
    } else if (techLower.includes("vue")) {
      return "https://via.placeholder.com/800x600/42B883/FFFFFF";
    } else if (techLower.includes("angular")) {
      return "https://via.placeholder.com/800x600/DD0031/FFFFFF";
    } else if (techLower.includes("node")) {
      return "https://via.placeholder.com/800x600/539E43/FFFFFF";
    } else if (techLower.includes("python")) {
      return "https://via.placeholder.com/800x600/3776AB/FFFFFF";
    } else if (techLower.includes("tensorflow") || techLower.includes("pytorch")) {
      return "https://via.placeholder.com/800x600/FF6F00/FFFFFF";
    } else if (techLower.includes("flutter") || techLower.includes("react native")) {
      return "https://via.placeholder.com/800x600/0175C2/FFFFFF";
    } else {
      return "https://via.placeholder.com/800x600/333333/FFFFFF";
    }
  };

  // Get tech tag colors based on technology name
  const getTechColor = (tech: string): string => {
    const techLower = tech.toLowerCase();
    
    if (techLower.includes("react")) {
      return "bg-blue-100/80 text-blue-800 backdrop-blur-sm";
    } else if (techLower.includes("vue")) {
      return "bg-green-100/80 text-green-800 backdrop-blur-sm";
    } else if (techLower.includes("angular")) {
      return "bg-red-100/80 text-red-800 backdrop-blur-sm";
    } else if (techLower.includes("node")) {
      return "bg-green-100/80 text-green-800 backdrop-blur-sm";
    } else if (techLower.includes("python")) {
      return "bg-blue-100/80 text-blue-800 backdrop-blur-sm";
    } else if (techLower.includes("javascript") || techLower.includes("js")) {
      return "bg-yellow-100/80 text-yellow-800 backdrop-blur-sm";
    } else if (techLower.includes("typescript") || techLower.includes("ts")) {
      return "bg-blue-100/80 text-blue-800 backdrop-blur-sm";
    } else if (techLower.includes("css") || techLower.includes("tailwind")) {
      return "bg-cyan-100/80 text-cyan-800 backdrop-blur-sm";
    } else if (techLower.includes("html")) {
      return "bg-orange-100/80 text-orange-800 backdrop-blur-sm";
    } else if (techLower.includes("ai") || techLower.includes("ml") || techLower.includes("tensorflow") || techLower.includes("pytorch")) {
      return "bg-purple-100/80 text-purple-800 backdrop-blur-sm";
    } else {
      return "bg-gray-100/80 text-gray-800 backdrop-blur-sm";
    }
  };

  return (
    <div 
      className="relative h-full w-full rounded-xl overflow-hidden cursor-pointer border border-white/5"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? "0 15px 30px -10px rgba(0, 0, 0, 0.15), 0 10px 20px -10px rgba(0, 0, 0, 0.1)"
          : "0 8px 20px -8px rgba(0, 0, 0, 0.1), 0 6px 12px -10px rgba(0, 0, 0, 0.06)",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out"
      }}
    >
      {/* Project Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={getProjectImage()}
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 ${getBgOverlay()} transition-all duration-300 ${
            isHovered ? "opacity-95" : "opacity-85"
          }`}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
        <div>
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-sm text-white/90 mb-4">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded-full ${getTechColor(tech)}`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-lg text-sm font-medium transform hover:scale-105 transition-transform backdrop-blur-sm"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-lg text-sm font-medium transform hover:scale-105 transition-transform backdrop-blur-sm"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              View Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 