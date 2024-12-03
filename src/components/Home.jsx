import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const { text } = useLanguage();
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.section
      id="home"
      className={`relative h-screen flex flex-col items-center justify-center transition-all duration-500 ${
        theme === "light"
          ? "bg-light-background text-light-text"
          : "bg-dark-background text-dark-text"
      }`}
      initial="hidden"
      viewport={{ once: false }}
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
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
            LinkedIn
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
            GitHub
          </a>
          <a
            href="https://twitter.com/your-twitter"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition ${
              theme === "light"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-400 text-white hover:bg-blue-500"
            }`}
          >
            Twitter
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Home;