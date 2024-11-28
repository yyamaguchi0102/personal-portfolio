import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Contact = () => {
  const { theme } = useTheme();
  const { text } = useLanguage();

  return (
    <section
      id="contact"
      className={`scroll-offset py-16 px-8 ${
        theme === "light" ? "bg-light-background text-light-text" : "bg-dark-background text-dark-text"
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Title */}
        <h2 className={`text-3xl font-bold text-center mb-8 ${
          theme === "light" ? "text-light-accent" : "text-dark-accent"
        }`}>
          {text.contact.title}
        </h2>
        
        {/* Description */}
        <p className="text-center mb-8">{text.contact.description}</p>
        
        {/* Form */}
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className={`w-full p-4 rounded-lg border ${
              theme === "light" ? "bg-white border-gray-300" : "bg-gray-800 border-gray-600 text-gray-100"
            }`}
          />
          <input
            type="email"
            placeholder="Your Email"
            className={`w-full p-4 rounded-lg border ${
              theme === "light" ? "bg-white border-gray-300" : "bg-gray-800 border-gray-600 text-gray-100"
            }`}
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className={`w-full p-4 rounded-lg border ${
              theme === "light" ? "bg-white border-gray-300" : "bg-gray-800 border-gray-600 text-gray-100"
            }`}
          ></textarea>
          <button
            type="submit"
            className={`w-full p-4 rounded-lg font-bold ${
              theme === "light"
                ? "bg-light-accent text-white hover:bg-orange-600"
                : "bg-dark-accent text-black hover:bg-green-700"
            } transition`}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;