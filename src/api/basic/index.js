import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询工序列表
export function processList() {
  // 查询分页数据
  const url = '/process/format'
  return request({
    headers: {
      'authorization': getToken('barrx')
    },
    url: url,
    method: 'get',
  })
}
// 查询物料列表
export function getItemList(data) {
  // 查询分页数据
  const url = '/barcodePrint/getItemList'
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: {}
  })
}
// 查询工序控制码列表
export function controlList(data) {
  // 查询分页数据
  const url = '/control/format'
  return request({
    headers: {
      'authorization': getToken('barrx'),
    },
    url: url,
    method: 'get',
  })
}// 查询工序控制码列表
export function routeListInfo(data) {
  // 查询分页数据
  const url = '/route/listByProcessRouteId'
  return request({
    headers: {
      'authorization': getToken('barrx'),
    },
    url: url,
    method: 'get',
    params: data
  })
}// 查询班组列表
export function teamList(data) {
  // 查询分页数据
  const url = '/team/format'
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}// 新增工艺路线
export function processRouteAdd(data) {
  // 查询分页数据
  const url = '/route/add'
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
export function processRouteUpdate(data) {
  // 查询分页数据
  const url = '/route/update'
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}// 查询工艺路线
export function getRouteList(data, query) {
  // 查询分页数据
  const url = '/route/list/' + data.pageNum + '/' + data.pageSize
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
// 查询物料
export function getItemsList(data, query) {
  // 查询分页数据
  const url = '/item/itemList/' + data.pageNum + '/' + data.pageSize
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
//查询派单明细
export function listByProductWorkDetailId(data) {
  // 查询分页数据
  const url = '/productWorkDispatch/listByProductWorkDetailId/' + data
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    //data: data
  })
}
// 查询职员列表
export function getEmpList(data) {
  // 查询分页数据
  const url = '/api/basic/empList'
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: {}
  })
}
// 工艺路线-反审核
export function processAgainstAudit(data) {
  // 查询分页数据
  const url = '/route/againstAudit/' + data
  return request({
    headers: {
      'authorization': getToken('barrx')
    },
    url: url,
    method: 'get',
  })
}// 工艺路线-审核
export function processAudit(data) {
  // 查询分页数据
  const url = '/route/audit/' + data
  return request({
    headers: {
      'authorization': getToken('barrx')
    },
    url: url,
    method: 'get',
  })
}

