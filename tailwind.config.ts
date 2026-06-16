import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        moss: "#315941",
        jade: "#0f7a55",
        mint: "#e7f4ed",
        line: "#d9e6de"
      }
    }
  },
  plugins: []
};

export default config;
