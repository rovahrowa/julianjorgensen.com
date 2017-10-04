import webpack from 'webpack';
import path from 'path';
import Merge from 'webpack-merge';
import StatsPlugin from 'stats-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import PostCSS from './postcss.config';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

// define environment constants
const NODE_ENV = (process.env.NODE_ENV || 'development');
const IS_PRODUCTION = (NODE_ENV === 'production');

console.log('Running webpack optimized for', NODE_ENV);

// Static vendor assets for which one can expect
//  minimal and a slow rate of change:
const VENDOR_LIBS = [
  'react',
  'react-dom',
  'react-router-dom',
  'react-redux',
  'react-document-meta'
];

const APP_ROOT = path.join(__dirname, '/');
const CLIENT_PATH = path.join(APP_ROOT, '/client');
const PUBLIC_PATH = path.join(APP_ROOT, '/public');

// Webpack config for both production and development environments
// ====================
const BASE_CONFIG = {
  entry: {
    bundle: ['babel-polyfill', path.join(CLIENT_PATH, 'app')],
    vendor: VENDOR_LIBS
  },
  output: {
    path: PUBLIC_PATH,
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader'
          },
          use: [{
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: false,
                minimize: true,
                importLoaders: 1,
                localIdentName: "[name]--[local]--[hash:base64:8]"
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.json$/i,
        use: 'json-loader'
      },
      {
        test: /\.pdf$/i,
        use: 'file-loader?name=/docs/[name].[ext]'
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        include: path.resolve(CLIENT_PATH, 'assets/images'),
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-80',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
        query: {
          classIdPrefix: '[name]-[hash:8]__'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
        context: CLIENT_PATH,
        from: 'assets/images',
        to: 'images'
      },
      {
        context: CLIENT_PATH,
        from: 'assets/pdfs',
        to: 'pdfs'
      },
      {
        context: CLIENT_PATH,
        from: 'assets/fonts',
        to: 'fonts'
      },
      {
        context: CLIENT_PATH,
        from: 'assets/videos',
        to: 'videos'
      }
    ]),
    new webpack.DefinePlugin({
      // Dynamically access local environment variables based on the environment
      'ENV_CONFIG': JSON.stringify(require('./config/' + NODE_ENV + '.config'))
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new HTMLWebpackPlugin({
      template: path.join(CLIENT_PATH, 'index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) // reduce moment package size
  ],
  devtool: `${IS_PRODUCTION ? 'inline' : 'cheap-eval'}-source-map`,
  resolve: {
    alias: {
      assets: path.join(CLIENT_PATH, 'assets'),
      client: path.join(CLIENT_PATH, '/'),
      components: path.join(CLIENT_PATH, 'components/'),
      containers: path.join(CLIENT_PATH, 'containers/'),
      layout: path.join(CLIENT_PATH, 'layout/'),
      routes: path.join(CLIENT_PATH, 'routes/'),
      store: path.join(CLIENT_PATH, 'store/'),
      reducers: path.join(CLIENT_PATH, 'store/reducers'),
      actions: path.join(CLIENT_PATH, 'store/actions/'),
      styles: path.join(CLIENT_PATH, 'styles/'),
      utils: path.join(CLIENT_PATH, 'utils/'),
      lib: path.join(CLIENT_PATH, 'lib/')
    },
    extensions: ['.js', '.jsx', '.css']
  }
};


// Webpack plugins unique to the production build:
const PROD_PLUGINS = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new ExtractTextPlugin('[name].min.[contenthash].css'),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false
    },
    output: {
      comments: false
    }
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  new StatsPlugin('stats.prod.json', {
    chunkModules: true
  })
];

// Webpack field-value pairs re: webpack-dev-server:
const PROD_CONFIG = {
  output: {
    filename: '[name].min.[hash].js'
  }
};



// Webpack plugins unique to the development build:
const DEV_PLUGINS = [
  new ExtractTextPlugin('[name].[contenthash].css'),
  new webpack.HotModuleReplacementPlugin(),
  new StatsPlugin('stats.dev.json', {
    chunkModules: true
  })
];

// Webpack field-value pairs re: webpack-dev-server:
const DEV_CONFIG = {
  output: {
    filename: '[name].[hash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    open: true,
    host: 'localhost',
    hot: true,
    inline: true,
    noInfo: false,
    port: 3000,
    historyApiFallback: true
  }
};

// Final Webpack configuration object constructed
//  conditionally according to the NODE_ENV value:
const AGGREGATE_CONFIG = IS_PRODUCTION ?
  Merge(BASE_CONFIG, PROD_CONFIG, {
    plugins: PROD_PLUGINS
  }) :
  Merge(BASE_CONFIG, DEV_CONFIG, {
    plugins: DEV_PLUGINS
  });

export default AGGREGATE_CONFIG;
