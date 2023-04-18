const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/':{
        target:'http://localhost:8080'
      }
    },
    client: {
      webSocketURL: 'ws://10.118.86.2/ws'
    }
  }
})
