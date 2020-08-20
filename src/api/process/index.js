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
}// 修改工艺路线
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

