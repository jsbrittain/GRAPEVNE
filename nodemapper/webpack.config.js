const path = require("path");
const production = process.env.NODE_ENV === "production";
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: production ? "production" : "development",
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    modules: ["src/", "node_modules"],
    alias: {
      components: path.resolve(__dirname, "src", "scripts", "components"),
      utils: path.resolve(__dirname, "src", "scripts", "utils"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  devServer: {
    client: {
      overlay: true,
    },
    port: 5001,
    hot: false,
    compress: true,
  },
};
