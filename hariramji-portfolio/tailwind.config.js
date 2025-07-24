/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        float: "float 6s ease-in-out infinite",
        flicker: "flicker 1.5s infinite alternate",
        typing: "typing 3.5s steps(40, end)",
        blink: "blink 1s infinite",
        wave: "wave 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        typing: {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        blink: {
          "from, to": { "border-color": "transparent" },
          "50%": { "border-color": "#268bd2" }, // Blue instead of green
        },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10deg)" },
          "60%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      colors: {
        terminal: {
          bg: '#1a1a1a',
          text: '#d8dee9',
          prompt: '#268bd2', // Blue
          error: '#dc322f', // Red
          directory: '#859900', // Green (for paths)
          accent: '#b58900', // Yellow
        },
      },
    },
  },
  plugins: [],
};