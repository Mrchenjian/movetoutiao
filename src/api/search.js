/**
 * 搜索相关接口模块
 */
import request from '@/utils/request'

/**
 * 获取指定用户的文章列表
 */
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取指定用户的文章列表
 */
export const getSearch = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
