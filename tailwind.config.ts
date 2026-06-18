import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
      },
      colors: {
        ink: "#0C0C0C",
        mist: "#D7E2EA",
        graphite: "#646973",
        frost: "#BBCCD7",
      },
      boxShadow: {
        "contact-inner":
          "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
      },
    },
  },
  plugins: [],
} satisfies Config;
