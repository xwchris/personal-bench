const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isDevelopment = env === 'development'

module.exports = {
  mode: env,
  entry: {
    main: './src/index.tsx',
  },
  output: {
    filename: '[name].[hash:5].js',
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    chunkFilename: '[name].[hash:5].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react-dom': isDevelopment ? '@hot-loader/react-dom' : 'react-dom'
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        },
        default: {
          reuseExistingChunk: true,
          chunks: 'async'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      }, {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }, {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './src/template/index.html',
    }),
  ],
  devtool: isDevelopment ? 'inline-source-map' : 'eval',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  },
};
