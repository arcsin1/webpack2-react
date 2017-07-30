const webpack        = require('webpack');
const webpackMerge   = require('webpack-merge');
const path           = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const DEV_CONFIG = require('./webpack-config/webpack.dev');
const PRO_CONFIG  = require('./webpack-config/webpack.prod');
const {
  APP_PATH,
  DIST_PATH,
  NODE_MODULES_PATH
} = require('./webpack-config/paths');
const { cssLoader, sassLoader, postcssLoader } = require('./webpack-config/loaders');

const ENV = process.env.NODE_ENV;
const VALID_ENVS = ['test', 'development', 'production'];

if (!VALID_ENVS.includes(ENV)) {
  throw new Error(`${ ENV } is not valid environment!`);
}

const config = {
  development: DEV_CONFIG,
  production:  PRO_CONFIG
}[ENV];


const COMMON_CONFIG = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'redux-thunk',
      'react-router-dom',
      'immutable'
    ]
  },

  output: {
    path: DIST_PATH,
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: APP_PATH,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        include: APP_PATH,
        use: [
          'style-loader',
          cssLoader,
          postcssLoader,
          sassLoader
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.sass'],
    modules: [
      NODE_MODULES_PATH,
      APP_PATH
    ],
    alias: {
      components: path.resolve(APP_PATH, 'components'),
      config:     path.resolve(APP_PATH, 'config'),
      reducers:   path.resolve(APP_PATH, 'reducers')
    }
  },

  performance: {
    hints: false
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),

    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: /vendor.*\.js$/
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          emitWarning: true
        }
      }
    }),

    new htmlWebpackPlugin({
      title: 'react',
      template: './webpack-config/index.ejs'
    })
  ]
};

module.exports = webpackMerge.smart(COMMON_CONFIG, config);
