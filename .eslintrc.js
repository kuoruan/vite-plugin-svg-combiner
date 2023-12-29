/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:unicorn/recommended", "plugin:prettier/recommended"],
  plugins: ["simple-import-sort", "sort-destructure-keys"],
  rules: {
    // https://github.com/lydell/eslint-plugin-simple-import-sort#usage
    "sort-imports": "off",
    "import/order": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",

    // https://github.com/mthadley/eslint-plugin-sort-destructure-keys
    "sort-destructure-keys/sort-destructure-keys": ["error", { caseSensitive: true }],

    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md
    "unicorn/prefer-module": "off",
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
    "unicorn/filename-case": ["error", { case: "kebabCase", ignore: [] }],
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md
    "unicorn/no-null": "off",
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
    "unicorn/prevent-abbreviations": "off",
  },
  overrides: [
    {
      files: ["*.ts"],
      extends: [
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["**/tsconfig.json"],
        warnOnUnsupportedTypeScriptVersion: false,
      },
      settings: {
        "import/resolver": {
          node: {},
          typescript: {},
        },
      },
    },
    {
      files: ["*.spec.ts"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
      env: {
        "jest/globals": true,
      },
    },
  ],
};
