const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    webSocketServer: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5202',
        changeOrigin: true
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/employees/' : '/',
  outputDir: '../joseph_node/public/employees',
  assetsDir: 'static'
}) 