const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  productionSourceMap: process.env.NODE_ENV === 'development',
  devServer: {
    port: 9001,
    open: true,
    proxy: {
      '/api/': {
        target: process.env.VUE_APP_API_HOST,
        changeOrigin: true,
      }
    },
    headers: [
      {
        key: 'Access-Control-Allow-Origin',
        value: '*',
      },
      {
        key: 'Access-Control-Allow-Headers',
        value: 'X-Requested-With',
      },
      {
        key: 'Access-Control-Allow-Methods',
        value: 'PUT, POST, GET, DELETE, OPTIONS',
      },
      {
        key: 'X-Powered-By',
        value: 'SaneSong',
      },
    ]
  },
  transpileDependencies: [
    'vuetify',
  ],
});
