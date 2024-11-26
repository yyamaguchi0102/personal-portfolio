import { useLanguage } from "../contexts/LanguageContext";

const Projects = () => {
  const { text } = useLanguage();

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">{text.projects.title}</h2>
        <p className="text-center mb-4">{text.projects.description}</p>
        {/* Project content goes here */}
      </div>
    </section>
  );
};

export default Projects;