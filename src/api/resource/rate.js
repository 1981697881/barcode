import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询订单列表
export function rateList(data, query) {
  //查询分页数据
  const url = '/Admin/price/list/' + data.pageNum + '/' + data.pageSize
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
// 导出
export function exportRateData(data) {
  const url = '/excel/export/priceData/' + data
  return request({
    headers: {
      'authorization': getToken('barrx'),
    },
    responseType: 'blob',
    url: url,
    method: 'get',
  })
}
