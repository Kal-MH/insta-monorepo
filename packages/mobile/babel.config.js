module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [
            ".native.tsx",
            ".native.ts",
            ".tsx",
            ".ts",
            ".js",
            ".jsx",
            ".json",
          ],
        },
      ],
    ],
  };
};
