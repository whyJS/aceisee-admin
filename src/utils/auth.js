import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserKey = 'Admin-user'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}


export function getUserInfo () {
  return Cookies.get(UserKey)
}

export function setUserInfo (userinfo) {
  return Cookies.set(UserKey, userinfo)
}

export function removeUserInfo () {
  return Cookies.remove(UserKey)
}