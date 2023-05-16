module.exports = {
    plugins: {
      'autoprefixer': {
        overrideBrowserslist: [
          "Android 4.1",
          "iOS 7.1",
          "Chrome > 31",
          "ff > 31",
          "ie >= 8"
        ]
      },
      'postcss-pxtorem': {
        rootValue: 37.5,//根据设计稿来
        propList: ['*']//要转换的css属性
      }
    }
  }

