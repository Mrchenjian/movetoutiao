/**
 * 日期时间处理
 */
import moment from 'moment'
import Vue from 'vue'

// 配置中文语言
// 查看 moment/locale 中的语言文件，使用文件名
moment.locale('zh-cn')

// 参数1：过滤器的名字
// 参数2：一个函数
//     参数1：使用过滤器的数据
//     {{ abc | relativeTime }}
//     返回值：数据，输出到使用过滤器的表达式中
Vue.filter('relativeTime', value => {
  return moment(value).startOf('second').fromNow()
})
