// npx webpack --config webpack.config.js

const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./static/js/DeidentifyForm.js",
    mode: 'development', // or 'production' if you're ready for deployment
    output: {
        path: path.resolve(__dirname, "static/js"), // Output directory path. Check this
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'images',
                    },
                  },
                ],
              },
        ]
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                // This effects the react lib size
                NODE_ENV: JSON.stringify("development") // or 'production'
            }
        })
    ]
}