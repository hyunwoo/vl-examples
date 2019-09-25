module.exports = {

  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  },
  configureWebpack: {
    resolve: {
      symlinks: false
    },

  },
  chainWebpack: config => {
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader');
  },
  transpileDependencies: ['vuetify'],
  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
};