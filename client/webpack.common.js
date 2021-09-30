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
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].bundle.css'
    }),
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
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            url: false
          }
        },
        {
          loader: 'resolve-url-loader',
          options: {}
        },
        'sass-loader'
      ]
    },
    {
      test: /\.(png|jpeg|jpg|gif|svg)$/,
      // include: path.join(__dirname, 'src/assets/images/'),
      loader: 'file-loader',
      options: {
        name: 'images/[name].[ext]',
        context: 'src/assets/images'
      }
    },
    {
      test: /\.(woff|woff2|eot|ttf)(\?.+)?$/i,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]',
        context: 'src/assets/fonts'
    }
    }]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      Types: path.resolve(__dirname, 'src/types/'),
      Helpers: path.resolve(__dirname, 'src/helpers/'),
      Queries: path.resolve(__dirname, 'src/graphql/queries/'),
      Mutations: path.resolve(__dirname, 'src/graphql/mutations/'),
      'images': path.resolve(__dirname, 'src/assets/images'),
      'fonts': path.resolve(__dirname, 'src/assets/fonts')
    },
    fallback: {
      fs: false,
      path: false,
      stream: false,
      http: false,
      net: false,
      crypto: false,
      zlib: false,
      os: false,
      https: false
    }
  }
};
