module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#fef9e7", // Bright, cheerful background
          text: "#222222", // Dark gray for text
          accent: "#ff8c42", // Vibrant orange for buttons/accents
        },
        dark: {
          background: "#2a2a2a", // Softer black, slightly warmer tone
          text: "#f0f0f0", // Brighter gray for better readability
          accent: "#3b82f6", // Soft blue accent for a clean modern look
          card: "#242424", // Darker gray for cards to subtly stand out
          border: "#3a3a3a", // Slightly darker gray for subtle borders
          hover: "#2563eb", // Rich blue for hover states
          muted: "#bbbbbb", // Softer gray for less prominent text
        },
      },
    },
  },
  plugins: [],
};