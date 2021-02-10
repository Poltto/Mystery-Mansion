const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: {
    app: './src/app.module.tsx',
  },
  output: {
    filename: '[name].[hash].bundle.js',
    // chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        },
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      'toastr': 'toastr/toastr.js',
      'moment': 'moment',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
      '$': 'jquery',
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),
    new HtmlWebpackPlugin({
      chunksSortMode: 'manual',
      chunks: ['vendor', 'app'],
      filename: 'index.html',
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].bundle.css'
    }),
  ],
  module: {
    rules: [{
      test: /\index.html$/,
      exclude: path.resolve(__dirname, 'node_modules/'),
      use: 'html-loader'
    },

      {
        test: /\.(tsx|js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules/'),
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        exclude: path.resolve(__dirname, 'node_modules/'),
        loader: 'ts-loader'
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        // include: path.join(__dirname, 'src/assets/images/'),
        use: 'file-loader?name=images/[name].[ext]&context=src/assets/images/'
      }, {
        test: /\.(woff|woff2|eot|ttf)(\?.+)?$/i,
        use: 'file-loader?name=fonts/[name].[ext]'
      }]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      Types: path.resolve(__dirname, 'src/types/')
    }
  },
  node: {
    fs: 'empty'
  },
};
