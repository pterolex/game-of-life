const { resolve } = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "dist"),
    library: {
      type: "commonjs2",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_module/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "source-map",
  target: "node",
  mode: "development",
};
