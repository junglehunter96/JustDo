
// 引入模块，loader，plugin等
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development';
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
// 定义输出模块
config = {
  target: 'web',
  entry: 
    path.join(__dirname,'./src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname,'./dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options:{
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: isDev?'"development"':'"production"'
        }
      }),
      new VueLoaderPlugin(),
      new HTMLPlugin(),
    ]  
}

if (isDev) {
  config.mode="development"
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader : 'postcss-loader',
        options:  {
          sourceMap: true,
        }
      },
      'stylus-loader'
    ]
  }) 
  //页面调试工具 
  config.devtool = '#cheap-module-eval-source-map'
  // 开发环境端口
  config.devServer = {
    port: 8000,
    host:'0.0.0.0',
    // 路由识别
    historyApiFallback:true,
    overlay: {
      errors:true,
    },
    // 热加载，只渲染改变的组件，不需要重新渲染整个页面
    hot: true,
  }
  // 热加载所需配置
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.mode="production"
  config.entry ={
    app: path.join(__dirname,'./src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader : 'postcss-loader',
            options:  {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      })     
    }
  )
  config.plugins.push(
    new ExtractPlugin('styles.[hash:8].css'),
  )
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2, maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
}

module.exports = config