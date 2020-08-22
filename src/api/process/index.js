import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询工序调价表
export function getAdjustList(data, query) {
  // 查询分页数据
  const url = '/adjust/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: query
  })
}
// 新增工艺路线
export function processAdjustAdd(data) {
  // 查询分页数据
  const url = '/adjust/add'
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
// 修改工艺路线
export function processAdjustUpdate(data) {
  // 查询分页数据
  const url = '/adjust/update'
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
// 查询详情
export function listByRouteAdjustId(data) {
  const url = '/adjust/listByRouteAdjustId'
  return request({
    headers: {
      'authorization': getToken('barrx'),
    },
    url: url,
    method: 'get',
    params: data
  })
}// 查询详情
export function listByRouteAdjustNo(data) {
  const url = '/adjust/listByRouteAdjustNo'
  return request({
    headers: {
      'authorization': getToken('barrx'),
    },
    url: url,
    method: 'get',
    params: data
  })
}
// 查询生产任务单
export function planProductTask(data) {
  const url = '/planProductTask/list'
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}// 投放
export function addPlanProductTask(data) {
  const url = '/planProductTask/addList'
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


