const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "app_container",
            remotes: {
                images_remote: "images_remote@https://microfrontendimageremote.netlify.app/remoteEntry.js",
                videos_remote: "videos_remote@https://microfrontendvideoremote.netlify.app//remoteEntry.js"
            },
            shared: ['react', 'react-dom']
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
}
