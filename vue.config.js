module.exports = {
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  },
  configureWebpack: {
    resolve: {
      symlinks: false
    }
  },
  transpileDependencies: ['vuetify'],
  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
};