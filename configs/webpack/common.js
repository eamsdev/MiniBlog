// shared config (dev and prod)
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Mode = require('frontmatter-markdown-loader/mode');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const paths = [
  '/about',
  '/blogs/page/0',
  '/article/require-context',
  '/article/bundle-size',
  '/article/aws-pipeline',
];

module.exports = {
  entry: './index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [Mode.BODY],
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html.ejs', favicon: './assets/favicon.ico' }),
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
    new CopyPlugin({
      patterns: [{ from: '../src/assets/post-img', to: 'post-img' }],
    }),
    // new BundleAnalyzerPlugin(),
  ],
  externals: ['jquery'],
};
