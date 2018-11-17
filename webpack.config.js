const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
  favicon: "./public/favicon.png",
});

module.exports = {
    devServer: { 
        inline: true, 
        contentBase: './dist', 
        host: '0.0.0.0',
        port: 3000, 
        disableHostCheck: true,
        proxy: { "/**": { target: '0.0.0.0:5000', secure: false }  },
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
            loader: "babel-loader"
            }
        },
        {
            test: /\.(jpg|png)$/,
            use: {
              loader: "url-loader",
              options: {
                limit: 25000,
              },
            },
          },
        {
            test: /\.(mp4)$/,
            use: {
              loader: "url-loader?limit=10000&mimetype=video/mp4",
            },
          },
        {
            test: /\.css$/,
            use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]_[local]_[hash:base64]",
                sourceMap: true,
                minimize: true
                }
            }
            ]
        }
        ]
    },
  plugins: [htmlWebpackPlugin]
};