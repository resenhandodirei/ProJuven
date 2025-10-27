/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 🔹 cobre tudo dentro de /src
    "./components/**/*.{js,ts,jsx,tsx}", // 🔹 caso use componentes fora de /src
    "./app/**/*.{js,ts,jsx,tsx}", // 🔹 cobre estrutura app/ do Next.js 13+
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // azul do ProJuven
        secondary: "#1e293b", // cinza escuro usado em dashboards
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // fonte clean moderna
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
