/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "namaka-blue": "#CAEBF2",
        "namaka-gray": "#A9A9A9",
        "namaka-red": "#FF3B3F",
        "namaka-white": "#EFEFEF",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".number-input": {
          "-webkit-appearance": "none",
          "-moz-appearance": "textfield",
          "&::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: "0",
          },
          "&::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: "0",
          },
        },
      });
    },
  ],
};
