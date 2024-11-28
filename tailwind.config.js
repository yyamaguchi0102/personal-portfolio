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
          background: "#0d1117", // Terminal-style dark background
          text: "#c9d1d9", // Light gray for text
          accent: "#39ff14", // Neon green for accents
        },
      },
    },
  },
  plugins: [],
};