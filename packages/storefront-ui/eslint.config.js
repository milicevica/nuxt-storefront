import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import base from "../../eslint.config.mjs";

const nuxtPath = path.resolve("./.playground/.nuxt/eslint.config.mjs");

let withNuxt = c => c;

if (fs.existsSync(nuxtPath)) {
  const url = pathToFileURL(nuxtPath).href;
  const nuxtModule = await import(url);
  withNuxt = nuxtModule.default;
}

export default withNuxt(base);
