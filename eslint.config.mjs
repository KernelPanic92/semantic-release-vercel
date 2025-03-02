import simpleImportSort from "eslint-plugin-simple-import-sort";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    plugins: {
        "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
        globals: {},
        ecmaVersion: "latest",
        sourceType: "script",
    },
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
).map(config => ({
    ...config,
    files: ["src/**/*.ts"],
})), {
    files: ["src/**/*.ts"],

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: ["./tsconfig.json", "./tsconfig.spec.json"],
        },
    },

    rules: {
        "@typescript-eslint/ban-ts-comment": 0,
        "no-console": ["error"],

        "max-lines-per-function": [1, {
            max: 40,
        }],

        "max-lines": [1, {
            max: 150,
        }],

        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },
}];