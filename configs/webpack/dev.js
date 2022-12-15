// development config
const { merge } = require('webpack-merge');
const commonConfig = require('./common');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [new ReactRefreshPlugin()],
  // https://burnedikt.com/webpack-dev-server-and-routing/
  devServer: {
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
  },
});
