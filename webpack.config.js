var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index : './sample/index.jsx'
  },
  //入口文件输出配置
  output: {
    path: 'dist/sample',
    filename: '[name].js'
  },
  module: {
    //加载器配置
    loaders: [
      { 
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
    ]
  },
  //其它解决方案配置
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './sample/index.html'
    })
  ],
  devServer: {
    stats: { chunks:false },
    contentBase: './sample',
    hot: true
  }
};