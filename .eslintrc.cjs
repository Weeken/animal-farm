module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  globals: {
    window: true,
    document: true
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto", "usePrettierrc": false }],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "space-before-function-paren": 0,
    "prefer-rest-params": "off", // 允许方法中使用 arguments参数
    "@typescript-eslint/no-explicit-any": "off", // 关闭 ts any类型警告
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-var-requires": 0
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
}
