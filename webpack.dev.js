const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8050,
    inline: false,
    hot: false,
    compress: true,
    historyApiFallback: true,
    stats: {
      children: false,
      chunks: false,
      chunkModules: false,
      modules: false,
      reasons: false,
      useExports: false,
      colors: true
    },
    proxy: {
      "/api": {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
  },
  devtool: 'source-map',
  watchOptions: {
    aggregateTimeout: 300,
    ignored: [path.resolve(__dirname, 'node_modules/'), '*.scss']
  },
});