const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || "/";

const config = {
	entry: path.resolve(__dirname, "/public/index.js"),
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "app.bundled.js",
		publicPath: ASSET_PATH,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.css$/,
				use: [ "style-loader", "css-loader" ]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: "file-loader"
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				loader: "svg-react-loader"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			favicon: "./public/favicon.ico"
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": "\"production\"",
			"process.env.REACT_APP_BASE_API_URL": "\"https://mighty-sierra-48879.herokuapp.com\""
		}),
	],
	devServer: {
		historyApiFallback: true,
		publicPath: "/",
		contentBase: "/app",
		hot: true,
		overlay: true,
		port: 4000,
		inline: true,
		proxy: { "/**": { target: "http://mighty-sierra-48879.herokuapp.com", secure: false, changeOrigin: true }},
		open: "http://localhost:4000"
	},
};

module.exports = config;
