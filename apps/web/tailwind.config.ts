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
        forge: {
          bg: "#04050E",
          surface: "#0A0B18",
          elevated: "#0F1024",
          border: "rgba(99,102,241,0.15)",
          "border-strong": "rgba(99,102,241,0.35)",
          "border-subtle": "rgba(255,255,255,0.06)"
        },
        accent: {
          DEFAULT: "#6366F1",
          light: "#818CF8",
          dim: "#4338CA",
          glow: "rgba(99,102,241,0.2)"
        },
        live: {
          DEFAULT: "#10D9A0",
          dim: "rgba(16,217,160,0.12)",
          text: "#10D9A0"
        },
        payment: {
          DEFAULT: "#F59E0B",
          dim: "rgba(245,158,11,0.12)",
          text: "#FBB547"
        },
        danger: {
          DEFAULT: "#F43F5E",
          dim: "rgba(244,63,94,0.12)"
        }
      },
      fontFamily: {
        display: ["var(--font-outfit)", "sans-serif"],
        sans: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        "forge-sm": "0 2px 8px rgba(0,0,0,0.4)",
        "forge-md": "0 8px 32px rgba(0,0,0,0.5)",
        "forge-lg": "0 20px 60px rgba(0,0,0,0.6)",
        "forge-glow": "0 0 0 1px rgba(99,102,241,0.2), 0 8px 32px rgba(99,102,241,0.12)",
        "forge-glow-strong": "0 0 0 1px rgba(99,102,241,0.4), 0 12px 48px rgba(99,102,241,0.2)"
      },
      animation: {
        "forge-up": "forgeUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
        "forge-in": "forgeFadeIn 0.4s ease forwards",
        "forge-pulse": "forgePulse 2.5s ease-in-out infinite",
        "forge-scan": "forgeScan 3s linear infinite",
        "forge-blink": "forgeBlink 1.2s step-end infinite"
      },
      keyframes: {
        forgeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        forgeFadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        forgePulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" }
        },
        forgeScan: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(200%)" }
        },
        forgeBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
