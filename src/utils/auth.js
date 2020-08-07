import Cookies from 'js-cookie'

const TokenKey = 'barrx'

export function getToken(TokenKey) {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
  // return Cookies.set(TokenKey, token)
}
export function getPer(barper) {
  return Cookies.get(barper)
}

export function setPer(barper) {
  return Cookies.set('barper', barper)
  // return Cookies.set(TokenKey, token)
}

export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey)
}

export function setUserName(account){
  return Cookies.set('barun',account)
}
export function setPassword(password){
  return Cookies.set('barps',password)
}
export function setUserInfo(info){
  return Cookies.set('userInfo',info)
}
