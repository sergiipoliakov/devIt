const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const publicPath = '/account/'.replace('//', '/');

const config = {
  name: 'js',
  entry: {
    app: './src/index.tsx'
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'build.[name].js',
    chunkFilename: 'build.[id].chunk.js',
    publicPath
  },
  devServer: {
    compress: true,
    hot: true,
    port: 3000,
    allowedHosts: 'all',
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist')
    },
    client: {
      progress: true
    }
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/
      },
      {
        use: 'eslint-loader',
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]'
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|otf|eot|ttf|svg|jpg|jpeg|gif)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [
        '.js',
        '.ts',
        '.tsx',
        '.sass',
        '.css'
    ]
},
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 1000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false
    }
  },
  performance: {
    hints: false
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
