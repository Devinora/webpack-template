// webpack-merge предоставляет функцию слияния, которая объединяет массивы и объединяет объекты, создавая новый объект. Если встречаются функции, он выполнит их, прогонит результаты через алгоритм, а затем снова обернет возвращенные значения в функцию.
// Источник: https://github.com/survivejs/webpack-merge
const { merge } = require('webpack-merge');

// Базовые(Пользовательские) конфигурации webpack.
const common = require('./webpack.common');

// Объект с путями
const paths = require('./modules/paths');

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: paths.context,
    },
    compress: true,
    port: 9000,
    open: true,
  },
};

module.exports = merge(common, config);