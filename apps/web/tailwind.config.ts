import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/shared/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#11100d",
        fog: "#e7e1d6",
        ember: "#c16d45",
        oxide: "#8a4a2f",
        steel: "#4f5559",
        dune: "#ccc3b7"
      },
      boxShadow: {
        shell: "0 20px 80px rgba(12, 12, 10, 0.22)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.08)"
      },
      fontFamily: {
        display: ["Iowan Old Style", "Palatino", "Book Antiqua", "Georgia", "serif"],
        body: ["Avenir Next", "Segoe UI", "Helvetica Neue", "sans-serif"]
      },
      animation: {
        "float-slow": "floatSlow 10s ease-in-out infinite",
        "pulse-grid": "pulseGrid 8s ease-in-out infinite"
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" }
        },
        pulseGrid: {
          "0%, 100%": { opacity: "0.22" },
          "50%": { opacity: "0.4" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
