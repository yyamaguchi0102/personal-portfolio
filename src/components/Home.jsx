import { useLanguage } from "../contexts/LanguageContext";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const { text } = useLanguage();

  return (
    <section
      id="home"
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          <Typewriter
            words={["Hi, my name is Yutaka."]}
            loop={false}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h1>
        <p className="text-lg mt-4">{text.home.intro}</p>
        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="https://www.linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition dark:bg-gray-800 dark:hover:bg-gray-700 animate-float"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 px-4 py-2 rounded text-white hover:bg-gray-900 transition dark:bg-gray-600 dark:hover:bg-gray-500 animate-float"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/your-twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 px-4 py-2 rounded text-white hover:bg-blue-500 transition dark:bg-gray-700 dark:hover:bg-gray-600 animate-float"
          >
            Twitter
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;