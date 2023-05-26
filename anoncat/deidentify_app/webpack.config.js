const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./components/anoncat/deidentify_app/src/components/DeidentifyForm.js",
    output: {
        path: path.resolve(__dirname, "components/anoncat/deidentify_app/static/js"),
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
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                // This effects the react lib size
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
}