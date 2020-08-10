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

 /* 'system': () => import('@/views/system/index'),
  'permissions': () => import('@/views/system/permissions/index'),
  'users': () => import('@/views/system/users/index'),
  'journal': () => import('@/views/system/journal/index')*/
}
