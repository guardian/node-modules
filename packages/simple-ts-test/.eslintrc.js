module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "@guardian/eslint-config-typescript",
  parserOptions: {
    ecmaVersion: 12,
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/no-inferrable-types": 0,
  },
  root: true,
  ignorePatterns: ["**/*.js", "node_modules"],
};
