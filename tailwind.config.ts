import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#102033",
        body: "#475569",
        moss: "#0B3D91",
        jade: "#1264D8",
        mint: "#EEF5FF",
        panel: "#F3F8FF",
        line: "#D8E6FF",
        accent: "#FFC928"
      }
    }
  },
  plugins: []
};

export default config;
