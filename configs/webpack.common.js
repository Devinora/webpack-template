// Модуль path предоставляет утилиты для работы с путями к файлам и каталогам. Доступ к нему можно получить, используя:
const path = require('path');

// Источник: https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Пользовательские зависимости.

// Объект с путями.
const paths = require('./modules/paths');
// Метод для поиска файлов.
const fileFilter = require('./modules/fileFilter');
// Временная переменная, которая определяет режим сборки.
const { NODE_ENV } = process.env;

const fileList = fileFilter([
  {
    source: path.join(paths.context, paths.entry),
    fileExtension: '.js',
  },
  {
    source: paths.context,
    fileExtension: '.html',
  },
]);

function getCssOptions() {
  if (NODE_ENV === ('production' || 'watch')) {
    return {
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name]~[chunkhash:8].css',
      chunkFilename: 'css/[name]~[chunkhash:8].css',
    };
  }

  return {
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: 'css/[name].css',
    chunkFilename: 'css/[name].css',
  };
}

// Объект с точками входа
const entryPoints = (() => {
  // Объект в котором будут сгенерированы точки входа.
  const obj = {};
  // Перебор названий файлов.
  fileList.js.names.forEach((name) => {
    // Расширение файла.
    const { expansion } = fileList.js;
    // Присваивание имени файла.
    obj[name] = `${paths.entry}${name}${expansion}`;
  });
  return obj;
})();

module.exports = {
  context: paths.context,
  entry: entryPoints,
  output: {
    path: paths.output,
    filename: (pathData) => {
      if (NODE_ENV === ('production' || 'watch')) {
        return `${paths.outputJs}[name]~[chunkhash:8].js`;
      }
      return `${paths.outputJs}[name].js`;
    },
    // Добавляет URL в тег script: ./js/index.js
    // ПРОБЛЕМА С ЭТИМ ПИЗДЮКОМ во время режима разработки
    // publicPath: './',
    chunkFilename: `${paths.outputJs}[name]~[chunkhash:8].js`,
  },
  resolve: {
    // Сообщите webpack, в каких каталогах следует искать при разрешении модулей.
    modules: ['node_modules'],
    // alias: {
    //   mdl: path.resolve(__dirname, 'src/js/modules'),
    // },
    // позволяет пользователям не использовать расширение при импорте:
    // import File from '../path/to/file';
    // Базовые настройки
    // extensions: ['.wasm', '.mjs', '.js', '.json'],
    extensions: ['.js', '.json', '.jsx', '.css', '.sass', '.scss'],
  },
  plugins: [
    // Динамическое создание файлов HTML
    ...fileList.html.names.map((page) => {
      // Расширение файла
      const { expansion } = fileList.html;
      return new HtmlWebpackPlugin({
        filename: `./${page}${expansion}`,
        // template: `${paths.context}/${page}${expansion}`,
        template: `./${page}${expansion}`,
        // Отвечает за подключение JS файлов
        cache: NODE_ENV === 'watch',
        inject: 'body',
        chunks: [page],
      });
    }),
  ],
};
