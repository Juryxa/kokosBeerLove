const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.tsx', // Entry point for your app
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // Ensures routing is handled properly
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // Resolves TypeScript and JavaScript files
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // HTML template file
            filename: 'index.html' // Output file in dist/
        }),
    ],
    devServer: {
        historyApiFallback: true, // Для работы SPA
        proxy: {
            '/api': {
                target: 'http://localhost:8000/',
                changeOrigin: true
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // TypeScript and TSX files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // CSS files
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/, // Images
                type: 'asset/resource', // Uses Webpack's asset modules for bundling images
                generator: {
                    filename: 'images/[name][ext]', // Bundled images stored in the images/ folder
                },
            },
        ],
    },
    devtool: 'source-map', // Enable source maps for debugging
    mode: 'development', // Switch to 'production' in deployment
};