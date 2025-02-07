module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2024: true,
    node: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
  files: ["**/*.ts"],
  ignore: ["node_modules/, dist/"],
};
