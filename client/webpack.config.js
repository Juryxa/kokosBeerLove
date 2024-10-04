const path = require('path');

module.exports = {
    entry: './src/index.tsx', // Путь к вашему входному файлу на TypeScript
    output: {
        filename: 'bundle.js', // Имя выходного файла
        path: path.resolve(__dirname, 'dist'), // Путь к выходной папке
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Примените правило к .ts и .tsx файлам
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader', // Используйте ts-loader для обработки TypeScript
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader', // Загружает изображения
                        options: {
                            name: '[path][name].[ext]',
                            type:'public/'
                        },
                    },
                ],
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // Поддержка расширений
    },
    mode: 'development', // Режим разработки
};
