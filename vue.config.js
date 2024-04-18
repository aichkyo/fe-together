// const { defineConfig } = require('@vue/cli-service')
// import vue from '@vitejs/plugin-vue'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // transpileDependencies: true,

  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
  },
  outputDir: 'dist',
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('examples'))
      .set('packages', resolve('packages'))
      .set('assets', resolve('examples/assets'))
      .set('components', resolve('examples/components'))
  },
  css: {
    extract: false, // 组件中的 CSS 动态注入到 JavaScript 中的 inline 代码
  }
}
