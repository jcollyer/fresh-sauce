const Webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, './src');
const buildPath = path.join(__dirname, './build');
const plugins = [new Webpack.HotModuleReplacementPlugin()]

module.exports = {
  devtool: 'eval',
  context: sourcePath,
  entry: {
    js: './index.js',
    vendor: ['react']
  },
  output: {
    path: buildPath,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
         test: /\.(js|jsx)$/,
         exclude: /node_modules/,
         use: [
           'babel-loader'
         ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader','less-loader']
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.svg/,
        use: ['url-loader?limit=10000&minetype=image/svg+xml']
      }, {
        test: /\.eot/,
        use: ['url-loader?limit=10000&minetype=application/vnd.ms-fontobject']
      }, {
        test: /\.ttf|otf/,
        use: ['url-loader?limit=10000&minetype=application/font-sfnt']
      }, {
        test: /\.woff/,
        use: ['url-loader?limit=10000&minetype=application/font-woff']
      }, {
        test: /\.gif/,
        use: ['url-loader?limit=10000&minetype=image/gif']
      }, {
        test: /\.jpg/,
        use: ['url-loader?limit=10000&minetype=image/jpg']
      }, {
        test: /\.png/,
        use: ['url-loader?limit=10000&minetype=image/png']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins,

  devServer: {
  contentBase: './src',
  port: 3000,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      }
    }
  }
};
