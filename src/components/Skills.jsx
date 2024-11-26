import { useLanguage } from "../contexts/LanguageContext";

const Skills = () => {
  const { text } = useLanguage();

  return (
    <section id="skills" className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">{text.skills.title}</h2>
        <p className="text-center mb-4">{text.skills.description}</p>
        {/* Skill content goes here */}
      </div>
    </section>
  );
};

export default Skills;