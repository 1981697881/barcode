import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询用户列表
export function getSysUserAll(val) {
  // 查询分页数据
  const url = '/sysUser/getSysUserAll'
  return request({
    headers: {
      'authorization': getToken('barrx')
    },
    url: url,
    method: 'get',
    params: val
  })
}// 查询用户权限
export function getProcessMenuByUserId(val) {
  // 查询分页数据
  const url = '/processMenu/getProcessMenuByUserId/'+ val
  return request({
    headers: {
      'authorization': getToken('barrx')
    },
    url: url,
    method: 'get',
  })
}
// 获取用户
export function getK3User(val) {
  // 查询分页数据
  const url = '/api/basic/getK3User'
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: val
  })
}
//保存用户
export function sysUserSave(data) {
  const url = '/sysUser/add'
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}
//修改用户
export function sysUserUpdate(data) {
  const url = '/sysUser/update'
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}//保存用户权限
export function processMenuAdd(data) {
  const url = '/processMenu/add'
  return request({
    headers: {
      'authorization': getToken('barrx'),
    },
    url: url,
    method: 'post',
    data: data
  })
}


