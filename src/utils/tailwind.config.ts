/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#F8FAFC",
          card: "#FFFFFF",
          text: "#0F172A",
          subtext: "#64748B",
          border: "#E2E8F0",
        },
        dark: {
          bg: "#090D16",
          card: "#111827",
          text: "#F3F4F6",
          subtext: "#9CA3AF",
          border: "#1F2937",
        },
        brand: {
          primary: "#6366F1",
          secondary: "#10B981",
          accent: "#F59E0B",
        },
        priority: {
          high: "#EF4444",
          medium: "#F59E0B",
          low: "#3B82F6",
          none: "#9CA3AF",
        },
        matrix: {
          doFirst: "#EF4444",
          schedule: "#3B82F6",
          delegate: "#F59E0B",
          eliminate: "#6B7280",
        }
      },
      spacing: {
        safe: "24px",
      },
    },
  },
  plugins: [],
};
