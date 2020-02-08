module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 设计稿 375:37.5
      // 设计稿：750:75
      // Vant 是基于 375

      // 如果你的设计稿是 375 宽，这里设置 37.5
      // 如果你的设计稿是 750 宽，这里设置 75
      // 该工具就会按照这个 rootValue 转换单位
      // 我们使用的 Vant 组件库是基于 375 宽写的
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
