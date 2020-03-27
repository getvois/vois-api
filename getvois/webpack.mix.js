const mix = require('laravel-mix');
const LiveReloadPlugin = require('webpack-livereload-plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css');

mix.webpackConfig({
  devtool: '#eval-source-map',
  plugins: [
    new LiveReloadPlugin(),
  ],
});

mix.webpackConfig({
  devServer: {
    port: 4444,
    proxy: {
      '*': {
        target: 'http://getvois.test',
        ws: true,
        changeOrigin: true,
      },
    },
  },
});

mix.options({
  hmrOptions: {
    host: 'getvois.test',
    port: 4444,
  },
});
