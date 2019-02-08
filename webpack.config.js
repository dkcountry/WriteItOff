const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
  favicon: './public/favicon-money.png'
});

module.exports = {
  devServer: {
    inline: true,
    contentBase: './dist',
    port: 5000,
    host: 'localhost',
    disableHostCheck: true,
    // proxy: { "/**": { target: 'http://localhost:5000', secure: false }  },
    historyApiFallback: true
  },
  output: {
    publicPath: '/'
  },
  externals: {
    plaid: 'Plaid'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }
      },
      {
        test: /\.(mp4)$/,
        use: {
          loader: 'url-loader?limit=10000&mimetype=video/mp4'
        }
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        )
        // use: [
        // {
        //     loader: "style-loader"
        // },
        // {
        //     loader: "css-loader",
        //     options: {
        //     modules: true,
        //     importLoaders: 1,
        //     localIdentName: "[name]_[local]_[hash:base64]",
        //     sourceMap: true,
        //     minimize: true
        //     }
        // }
        // ]
      }
    ]
  },
  plugins: [htmlWebpackPlugin, new Dotenv()]
};
