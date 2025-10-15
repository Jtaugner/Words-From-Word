// vue.config.js
const webpack = require('webpack');

console.log('>>> vue.config.js LOADED; CWD =', process.cwd(), 'PLATFORM =', process.env.PLATFORM);

module.exports = {
    publicPath: '',
    productionSourceMap: false,
  configureWebpack: {
    plugins: [
      // прокидываем PLATFORM в JS-код
      new webpack.DefinePlugin({
        'process.env.PLATFORM': JSON.stringify(process.env.PLATFORM || 'default'),
      }),
    ],
  },

  chainWebpack: (config) => {
    // прокидываем PLATFORM в HTML-шаблон (EJS) как переменную PLATFORM
    config.plugin('html').tap((args) => {
      const opts = args[0];
      args[0].inject = false;
      const original = opts.templateParameters;

      opts.templateParameters = (...tmplArgs) => {
        const base = typeof original === 'function' ? original(...tmplArgs) : (original || {});
        return { ...base, PLATFORM: process.env.PLATFORM || 'default' };
      };

      return args;
    });
  },
};
