/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "edu-sa": ["Edu SA Beginner", "cursive"],
        mono: ["Roboto Mono", "monospace"],
      },

      colors: {
        richblack: {
          5: "#F1F2FF",
          25: "#DBDDEA",
          50: "#C5C7D4",
          100: "#AFB2BF",
          200: "#999DAA",
          300: "#838894",
          400: "#6E727F",
          500: "#585D69",
          600: "#424854",
          700: "#2C333F",
          800: "#161D29",
          900: "#000814",
        },

        richblue: {
          5: "#ECF5FF",
          25: "#C6D6E1",
          50: "#A0B7C3",
          100: "#7A98A6",
          200: "#537988",
          300: "#2C5A6A",
          400: "#073B4C",
          500: "#063544",
          600: "#042E3B",
          700: "#072A35",
          800: "#022B32",
          900: "#001B1D",
        },

        caribbeangreen: {
          5: "#C1FFFD",
          25: "#8F3FDE",
          50: "#44E4BF",
          100: "#06D6A0",
          200: "#05BF8F",
          300: "#05A77B",
          400: "#049069",
          500: "#037957",
          600: "#026144",
          700: "#014A32",
          800: "#01321F",
          900: "#001B0D",
        },

        brown: {
          5: "#FFF4C4",
          25: "#FFE395",
          50: "#FFD166",
          100: "#E7BC5B",
          200: "#CFA64E",
          300: "#B89F44",
          400: "#A07C39",
          500: "#88662D",
          600: "#705122",
          700: "#593C17",
          800: "#41260C",
          900: "#291103",
        },
      },
    },
  },

  plugins: [],
};