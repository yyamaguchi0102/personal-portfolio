import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="App">
          <CustomCursor />
          <Header />
          <Home />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;