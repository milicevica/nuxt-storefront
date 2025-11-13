import type { ColorPalette } from "./types";

export default defineAppConfig({
  storefrontUi: {
    theme: {
      primary: {
        50: "#fcffe5",
        100: "#f6ffc7",
        200: "#ecff95",
        300: "#d6ff42",
        400: "#c6f625",
        500: "#a7dd05",
        600: "#81b100",
        700: "#618605",
        800: "#4e690b",
        900: "#41590e",
        950: "#213201",
      },
    },
  },
});

declare module "@nuxt/schema" {
  type AppConfigInput = {
    storefrontUi?: {
      theme?: {
        primary?: ColorPalette;
      };
    };
  };
}
