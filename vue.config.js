const webpack = require('webpack');

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', 'vue')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {}
        }
      })
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
  }
}