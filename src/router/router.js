export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  'resource': () => import('@/views/resource/index'),
  'dashboard': () => import('@/views/dashboard/index'),

  'processRoute': () => import('@/views/resource/processRoute/index'),
  'pricingProcess': () => import('@/views/process/pricingProcess/index'),
  'productionTask': () => import('@/views/process/productionTask/index'),
  'processDispatching': () => import('@/views/process/processDispatching/index'),
  'mission': () => import('@/views/process/mission/index'),

  'system': () => import('@/views/system/index'),
  'users': () => import('@/views/system/users/index'),
}
