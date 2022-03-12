// webpack-merge предоставляет функцию слияния, которая объединяет массивы и объединяет объекты, создавая новый объект. Если встречаются функции, он выполнит их, прогонит результаты через алгоритм, а затем снова обернет возвращенные значения в функцию.
// Источник: https://github.com/survivejs/webpack-merge
const { merge } = require('webpack-merge');

// По умолчанию этот плагин удаляет все файлы внутри каталога output.path webpack, а также все неиспользуемые ресурсы webpack после каждой успешной перестройки.
// Источник: https://github.com/johnagan/clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Базовые(Пользовательские) конфигурации webpack.
const common = require('./webpack.common');

const config = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: './img/',
    //       to: './img/',
    //       noErrorOnMissing: true,
    //     },
    //     {
    //       from: './video/',
    //       to: './video/',
    //       noErrorOnMissing: true,
    //     },
    //     {
    //       from: './music/',
    //       to: './music/',
    //       noErrorOnMissing: true,
    //     },
    //     {
    //       from: './fonts/',
    //       to: './fonts/',
    //       noErrorOnMissing: true,
    //     },
    //   ],
    // }),
  ],
};

module.exports = merge(common, config);
