const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react', 'react-hmre'],
          plugins: ['transform-decorators-legacy', 'antd', 'transform-runtime']
        }
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style',
                  /* eslint-disable */
                  'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
                  /* eslint-enable */
                  'postcss?sourceMap',
                  'sass?sourceMap']
      }, {
        test: /\.css$/,
        loaders: ['style', 'css']
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loaders: ['url?limit=10000']
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loaders: ['file']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  }
};
