/* Created by guan on 2022/3/8 */
const env = process.env
// const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  // 基本路径
  publicPath: './',
  // 放置生成的静态资源目录
  assetsDir: 'static',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  configureWebpack: {
    // 关闭 webpack 的性能提示
    performance: {
      hints: false
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 开启 CSS source maps?
    sourceMap: false,
    // // css预设器配置项
    loaderOptions: {},
    // 启用 CSS requireModuleExtension for all css / pre-processor files.
    requireModuleExtension: true
  },
  // webpack-dev-server 相关配置
  devServer: {
    // 设置代理
    hot: true, // 热加载
    host: '0.0.0.0', // ip地址
    port: 8080, // 端口
    https: false, // false关闭https，true为开启
    // open: true, // 自动打开浏览器
    // disableHostCheck: true, // 本地配置host
    proxy: {
      // 跨域请求
      '/crmapi': {
        target: env.PROXY_TARGET_API,
        changeOrigin: true,
        pathRewrite: {
          '^/crmapi': ''
        }
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
