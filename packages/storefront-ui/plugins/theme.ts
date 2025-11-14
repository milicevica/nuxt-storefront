import type { ColorPalette, Key, Level, ThemePalette } from "../types";

function paletteToStyle(level: Level, palette: ColorPalette) {
  if (palette) {
    return Object.keys(palette).map((key) => {
      return `--${level}-${key}: ${palette[key as Key]}`;
    }).join(`;\r\n`);
  }
}

function individualPalette(themePalette: ThemePalette) {
  if (themePalette) {
    return Object.entries(themePalette).map(([key, value]) => {
      return paletteToStyle(key as Level, value);
    });
  }
}

export default defineNuxtPlugin(() => {
  const theme = useAppConfig()?.storefrontUi?.theme;
  const style = individualPalette(theme);

  if (style) {
    useHead({
      style: [
        {
          key: "storefront-ui-theme",
          textContent: `:root, body { ${style}} `,
        },
      ],
    });
  }
});
