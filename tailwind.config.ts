import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Deep Navy & Charcoal
        navy: {
          50: "#E8EDF2",
          100: "#D1DBE5",
          200: "#A3B7CB",
          300: "#7593B1",
          400: "#476F97",
          500: "#3D5A80", // Main navy
          600: "#2E4366",
          700: "#24334C",
          800: "#1A2332",
          900: "#0F1419", // Deepest navy
          950: "#0A0D12",
        },
        // Secondary - Muted Teal
        teal: {
          50: "#E8F5F3",
          100: "#D1EBE7",
          200: "#A3D7CF",
          300: "#75C3B7",
          400: "#47AF9F",
          500: "#3DB3A3", // Bright teal
          600: "#2A9D8F", // Main teal
          700: "#208074",
          800: "#176358",
          900: "#0D463C",
        },
        // Secondary - Electric Slate Blue
        slate: {
          50: "#EBF4F7",
          100: "#D7E9EF",
          200: "#AFD3DF",
          300: "#8DC1D1", // Light slate
          400: "#6BA5B8", // Medium slate
          500: "#4A90A4", // Main slate
          600: "#3A7689",
          700: "#2B5C6D",
          800: "#1D3D4A",
          900: "#0E1F26",
        },
        // Neutral - Crisp Backgrounds
        pearl: {
          50: "#FFFFFF", // Pure white
          100: "#F8FAFB", // Off-white
          200: "#EFF2F5", // Very light gray
          300: "#E1E6EA", // Light gray
          400: "#CBD3DA", // Medium gray
          500: "#9BA5B0", // Neutral gray
          600: "#6B7580",
          700: "#495059",
          800: "#2D3339",
          900: "#181B1F",
        },
        // Accent - Warm Gold
        gold: {
          50: "#FEF7ED",
          100: "#FDEEDB",
          200: "#FBDDB7",
          300: "#F9CC93",
          400: "#F7BB6F",
          500: "#F2A154", // Main gold
          600: "#E89240",
          700: "#C77527",
          800: "#8F541C",
          900: "#573310",
        },
        // Accent - Coral Orange
        coral: {
          50: "#FFF0EB",
          100: "#FFE1D7",
          200: "#FFC3AF",
          300: "#FFA587",
          400: "#FF875F",
          500: "#FF7F50", // Main coral
          600: "#F76D3C",
          700: "#E05428",
          800: "#B8431F",
          900: "#7A2C15",
        },
        // Keep old electric colors for gradual migration if needed
        electric: {
          blue: "#4A90A4",
          cyan: "#3DB3A3",
          purple: "#3D5A80",
          dark: "#1A2332",
          darker: "#0F1419",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-orbitron)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // New sophisticated gradients
        "premium-gradient": "linear-gradient(135deg, #3D5A80 0%, #2A9D8F 50%, #4A90A4 100%)",
        "gold-gradient": "linear-gradient(135deg, #F2A154 0%, #E89240 100%)",
        "coral-gradient": "linear-gradient(135deg, #FF7F50 0%, #F76D3C 100%)",
        "navy-gradient": "linear-gradient(180deg, #0F1419 0%, #1A2332 100%)",
        "teal-glow": "radial-gradient(circle, rgba(42, 157, 143, 0.2) 0%, transparent 70%)",
        // Legacy gradient (updated)
        "electric-gradient": "linear-gradient(135deg, #3D5A80 0%, #2A9D8F 100%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.8", filter: "brightness(1.2)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
