import path from 'path';

export default {
  entry: './assets/controllers/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve('public/build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] },
        },
      },
    ],
  },
  mode: process.env.NODE_ENV || 'development',
};
