import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth' // get token from cookie
export function login(data) {
  return request({
    headers: {
      'Accept': '*/*'
    },
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(fid) {
  return request({
    url: '/back/system/user/selectUserInfoById.do',
    method: 'post',
    params: { fid }
  })
}
export function logout(data) {
  return request({
    headers: {
      'Accept': '*/*'
    },
    url: '/user/logout',
    method: 'post',
  })
}
// 修改密码
export function changePassword(data) {
  return request({
    headers: {
      'Content-Type': 'application/json',
      'authorization': getToken('barrx'),
    },
    url: '/user/changePassword',
    method: 'put',
    data
  })
}
