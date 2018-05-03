module.exports = {
  entry: './client/index.jsx',

  mode: 'development',
  devtool: 'cheap-module-source-map',

  output: {
    path: `${__dirname}/client/dist`,
    filename: 'app.js',
    libraryTarget: 'umd',
    publicPath: '/static/',
  },

  resolve: {
    modules: ['node_modules', `${__dirname}/client`],
    extensions: ['.jsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: 'babel-loader',
      },
      {
        test: /\.sass$/,
        exclude: [/node_modules/],
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};
