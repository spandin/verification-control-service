import { nextui } from "@nextui-org/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/feauters/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Jost, sans-serif"],
        mono: ["Jost, sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: "light",

      layout: {
        disabledOpacity: "0.3",
      },

      themes: {
        light: {
          colors: {
            background: "white",
            foreground: "black",
            primary: {
              DEFAULT: "#006fee",
              foreground: "white",
            },
            focus: "#006fee",
            divider: "black",
          },
        },
        dark: {
          colors: {
            background: "#020202",
            foreground: "white",
            primary: {
              DEFAULT: "#006fee",
              foreground: "black",
            },
            focus: "#006fee",
            divider: "black",
          },
        },
      },
    }),
  ],
}
