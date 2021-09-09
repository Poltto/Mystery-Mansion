const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
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
    })
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
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        // include: path.join(__dirname, 'src/assets/images/'),
        loader: 'file-loader',
        options: {
          outputPath: 'images/[name].[ext]',
          publicPath: 'images',
          context: 'src/assets/images'
        }
      }, {
        test: /\.(woff|woff2|eot|ttf)(\?.+)?$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/[name].[ext]',
          publicPath: 'fonts/[name].[ext]',
          context: 'src/assets/fonts'
        }
      }]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      Types: path.resolve(__dirname, 'src/types/'),
      'images': path.resolve(__dirname, 'src/assets/images'),
      'fonts': path.resolve(__dirname, 'src/assets/fonts')
    },
    fallback: {
      fs: false
    }
  }
};
