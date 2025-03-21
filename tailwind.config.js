module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#fff1f2", // Rose tinted background
          text: "#1f2937", // Dark gray for text
          accent: "#f43f5e", // Rose/pink for buttons/accents
        },
        dark: {
          background: "#0f172a", // Deep navy blue for a modern dark theme
          text: "#e2e8f0", // Soft white for excellent readability
          accent: "#6366f1", // Indigo for vibrant accents
          card: "#1e293b", // Slightly lighter navy for card backgrounds
          border: "#334155", // Subtle border color
          hover: "#818cf8", // Bright indigo for interactive elements
          muted: "#94a3b8", // Muted slate for secondary text
        },
      },
    },
  },
  plugins: [],
};