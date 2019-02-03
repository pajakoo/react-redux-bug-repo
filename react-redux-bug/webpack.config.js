const webpack = require("webpack");

const path = require("path");

const nodeExternals = require("webpack-node-externals"); // do not include node_modules dependencies in bundle

const libraryName = "react-redux-bug";

const outputFile = libraryName + ".js";

const excludeImportsAndFiles = {};

const config = {
  entry: path.join(__dirname, "/src/index.js"),
  devtool: "inline-sourcemap",
  performance: { hints: false },
  optimization: {
    minimize: false
  },
  externals: [
    excludeImportsAndFiles,
    nodeExternals({
      whitelist: []
    })
  ],
  output: {
    path: path.join(__dirname, "/lib"),
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["env", "react"],
          plugins: [
            "transform-class-properties",
            "transform-object-rest-spread",
            "transform-export-extensions",
            "transform-async-to-generator",
            "transform-regenerator",
            "transform-runtime",
            "babel-plugin-add-module-exports"
          ]
        }
      }
    ]
  },
  resolve: {
    modules: [
      // dont use relative paths for imports
      path.resolve("./src"),
      path.resolve("./node_modules")
    ],
    extensions: [".json", ".js", ".scss"]
  }
};

module.exports = config;
