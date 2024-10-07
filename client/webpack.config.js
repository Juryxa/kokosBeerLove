const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.tsx', // Ваш главный файл
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'], // Укажите расширения файлов
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // путь к вашему HTML файлу
            filename: 'index.html' // имя файла в dist
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Для файлов TypeScript
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // Для файлов CSS
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/, // Для изображений
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]', // Указывает на то, как будут называться файлы
                        outputPath: 'images/', // Папка, куда будут помещены изображения в сборке
                    },
                },
            },
        ],
    },
    devtool: 'source-map', // Для отладки
    mode: 'development', // Или 'production'
};

