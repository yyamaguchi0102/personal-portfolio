import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";
import Services from "./components/Services";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="font-sans relative">
          {isLoading ? (
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          ) : (
            <>
              <Header />
              <div className="scroll-container">
                <div className="scroll-section">
                  <Home />
                </div>
                <div className="scroll-section">
                  <Skills />
                </div>
                <div className="scroll-section">
                  <Services />
                </div>
                <div className="scroll-section">
                  <Projects />
                </div>
                <div className="scroll-section">
                  <Contact />
                </div>
              </div>
            </>
          )}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;