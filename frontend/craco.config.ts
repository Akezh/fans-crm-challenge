const config = {
  eslint: {
    enable: true,
    mode: "file",
    configure: {
      parser: "@typescript-eslint/parser",
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ],
      plugins: ["@typescript-eslint", "prettier"],
      rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  },
  babel: {
    presets: ["@babel/preset-typescript"],
  },
  typescript: {
    enableTypeChecking: true,
  },
};

export default config;
