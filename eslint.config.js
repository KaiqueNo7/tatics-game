import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Phaser: "readonly",
        process: "readonly",
      },
    },
    rules: {
      indent: ["error", 2],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    },
  },
]);
