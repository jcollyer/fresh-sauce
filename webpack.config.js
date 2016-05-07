var Webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: ['./src/index.js'],
  output: {
    path: '/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }, {
        test: /\.less$/, loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.css$/, loader: 'style-loader!css-loader!'
      }, {
        test: /\.svg/,
        loader: 'url-loader?limit=10000&minetype=image/svg+xml'
      }, {
        test: /\.eot/,
        loader: 'url-loader?limit=10000&minetype=application/vnd.ms-fontobject'
      }, {
        test: /\.ttf|otf/,
        loader: 'url-loader?limit=10000&minetype=application/font-sfnt'
      }, {
        test: /\.woff/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      }, {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&minetype=image/gif'
      }, {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&minetype=image/jpg'
      }, {
        test: /\.png/,
        loader: 'url-loader?limit=10000&minetype=image/png'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};
