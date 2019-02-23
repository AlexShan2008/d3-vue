const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: {
    module: {
      rules: [{
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      }]
    },
    plugins: [
      // make sure to include the plugin!
    ]
  },
  chainWebpack: config => {
    //路径配置
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('styles', resolve('src/assets/styles'))
  },

  // webpack-dev-server 相关配置  
  devServer: {
    // 调试端口
    // port: 8989
  }
  //其他配置....
}