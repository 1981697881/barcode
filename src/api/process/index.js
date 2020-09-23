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
}
// 查询工序任务单
export function getProductWorkList(data, query) {
  // 查询分页数据
  const url = '/productWork/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: query
  })
}// 查询班组人员派工单
export function getProductWorkDispatchList(data, query) {
  // 查询分页数据
  const url = '/productWorkDispatch/selectList/' + data.pageNum + '/' + data.pageSize
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
// 投放
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
// 派工
export function addProductWorkDispatch(data) {
  const url = '/productWorkDispatch/add'
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
//工序任务单修改
export function updateProductWork(data) {
  const url = '/productWork/update'
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
//工序派工单修改
export function updateProductWorkDispatch(data) {
  const url = '/productWorkDispatch/update'
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
//工序任务单查询明细
export function getListByProductWorkId(data) {
  const url = '/productWork/listByProductWorkId/' +data
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
  })
}
//工序派工单查询明细
export function listByProductWorkDetailId(data) {
  const url = '/productWorkDispatch/listByProductWorkDetailId/' +data
  return request({
    headers: {
      'authorization': getToken('barrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
  })
}
//工序派工单汇报
export function addProductWorkReport(data) {
  const url = '/productWorkReport/add'
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
// 工序调价-反审核
export function adjustAgainstAudit(data) {
  // 查询分页数据
  const url = '/adjust/againstAudit/' + data
  return request({
    headers: {
      'authorization': getToken('barrx')
    },
    url: url,
    method: 'get',
  })
}// 工序调价-审核
export function adjustAudit(data) {
  // 查询分页数据
  const url = '/adjust/audit/' + data
  return request({
    headers: {
      'authorization': getToken('barrx')
    },
    url: url,
    method: 'get',
  })
}// 工序任务单-反审核
export function productWorkAgainstAudit(data) {
  // 查询分页数据
  const url = '/productWork/againstAudit/' + data
  return request({
    headers: {
      'authorization': getToken('barrx')
    },
    url: url,
    method: 'get',
  })
}// 工序任务单-审核
export function productWorkAudit(data) {
  // 查询分页数据
  const url = '/productWork/audit/' + data
  return request({
    headers: {
      'authorization': getToken('barrx')
    },
    url: url,
    method: 'get',
  })
}// 工序派工单-反审核
export function productWorkDispatchAgainstAudit(data) {
  // 查询分页数据
  const url = '/productWorkDispatch/againstAudit/' + data
  return request({
    headers: {
      'authorization': getToken('barrx')
    },
    url: url,
    method: 'get',
  })
}// 工序派工单-审核
export function productWorkDispatchAudit(data) {
  // 查询分页数据
  const url = '/productWorkDispatch/audit/' + data
  return request({
    headers: {
      'authorization': getToken('barrx')
    },
    url: url,
    method: 'get',
  })
}



