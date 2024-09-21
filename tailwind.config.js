/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      keyframes: {
        "spin-logo": {
          "0%": { transform: "rotate(0deg)" },
          "85%": { transform: "rotate(720deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "spin-logo-90": {
          "0%": { transform: "rotate(0deg)" },
          "22%": { transform: "rotate(90deg)" },
          "44%": { transform: "rotate(180deg)" },
          "66%": { transform: "rotate(270deg)" },
          "88%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "spin-logo-back-360": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "spin-logo-back": {
          "0%": { transform: "rotate(var(--current-rotation))" },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
      },
      animation: {
        "spin-logo": "spin-logo-90 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "spin-logo-click": "spin-logo-back 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "spin-logo-90": "spin-logo-90 5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.1)",
        DEFAULT: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        lg: "4px 4px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    import("tailwindcss-animate"),
    function ({ addUtilities, theme, variants }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: theme("textShadow.DEFAULT"),
        },
        ".text-shadow-sm": {
          textShadow: theme("textShadow.sm"),
        },
        ".text-shadow-lg": {
          textShadow: theme("textShadow.lg"),
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      };
      addUtilities(newUtilities, variants("textShadow"));
    },
  ],
};
