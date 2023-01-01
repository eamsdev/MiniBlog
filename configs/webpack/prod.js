// production config
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = require('./common');

const paths = [
  '/about',
  '/blogs/page/0',
  '/blogs/page/1',
  '/article/require-context',
  '/article/bundle-size',
  '/article/aws-pipeline',
];

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: 'js/bundle.[contenthash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
  devtool: 'source-map',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new SitemapPlugin({
      base: 'https://eams.dev',
      paths,
      options: {
        filename: 'map.xml',
      },
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /.js$|.css$/,
    }),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin(),
  ],
});
