/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const sourceDir = process.env.SOURCE || 'src'
const publicPath = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/')
const sourcePath = path.resolve(__dirname, sourceDir)
const outputPath = path.resolve(__dirname, 'dist')

module.exports = {
  // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  entry: sourcePath,
  output: {
    filename: 'app.[name].js',
    publicPath,
    path: outputPath,
  },
  devServer: {
    contentBase: 'public',
    stats: 'errors-only',
    historyApiFallback: { index: publicPath },
    headers: { 'Access-Control-Allow-Origin': '*' },
    host,
    port,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // assets
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif|woff2?|ttf|eot)$/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'public/index.html',
      template: path.resolve(sourcePath, 'assets/index.html'),
      templateParameters: {
        foo: 'bar',
      },
    }),
  ],
}
