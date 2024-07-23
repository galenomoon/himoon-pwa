import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: {
          purple: "#D6CBFF",
          purpleLight: "#EDE8FF",
          black: "#000000",
          gray: "#ECECEC"
        },
        typography: {
          primary: "#000000",
          secondary: "#FFFFFF",
          yellow: "#F9F1B2",
          purple: "#7B62D3",
          purpleDark: "#9747FF",
        }
      }
    },
  },
  plugins: [],
};
export default config;
