const path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:true,
  outputDir:path.resolve(__dirname,'./server/www'),
  configureWebpack:{
    optimization: {
      minimize: false // 禁止压缩混淆
    },
    devtool:'eval-source-map'
  }
})
//uglifyjs-webpack-plugin
//terser-webpack-plugin