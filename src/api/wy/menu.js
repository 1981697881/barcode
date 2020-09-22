import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

export function getRouter(userId) {
  const data = {
    userId: userId
  }
  return request({
    url: '/processMenu/getProcessMenu',
    method: 'get',
    headers: {
      'authorization': getToken('barrx'),
    },
  })
}
export function getProcessMenuByParent(userId) {
  return request({
    url: '/processMenu/getProcessMenuByParent/'+userId,
    method: 'get',
    headers: {
      'authorization': getToken('barrx'),
    },
  })
}
