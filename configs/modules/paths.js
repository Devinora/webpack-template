// Модуль path предоставляет утилиты для работы с путями к файлам и каталогам. Доступ к нему можно получить, используя:
const path = require('path');

const root = path.resolve(__dirname, '../..');

const paths = {
  root,
  context: path.resolve(root, 'app'),
  entry: './js/pages/',
  modules: './js/modules/',
  output: path.join(root, 'dist'),
  outputJs: 'js/',
};

module.exports = paths;
