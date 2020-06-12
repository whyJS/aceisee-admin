import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userInfo: getUserInfo()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), pwd: password }).then(response => {
        console.log(response)
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_USER_INFO', data)
        commit('SET_NAME', data.nickName)
        setToken(data.token)
        setUserInfo(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(data)
        if (!data) {
          reject('获取角色失败！！')
        }
        // roles must be a non-empty array
        if (data.length <= 0) {
          reject('获取角色失败！！')
        }
        let roles = []
        data.forEach(item => {
          roles.push(item.roleCode)
        });
        if (!roles || roles.length <= 0) {
          reject('获取角色失败！！！')
        }
        commit('SET_ROLES', roles)

        resolve(roles)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit, state, dispatch }) {
    console.log(state)
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('SET_TOKEN', '')
        commit('SET_USER_INFO', null)
        commit('SET_ROLES', [])
        removeToken()
        removeUserInfo()
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }, 10)

      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_USER_INFO', null)
      //   commit('SET_ROLES', [])
      //   removeToken()
      //   removeUserInfo()
      //   resetRouter()
      //   dispatch('tagsView/delAllViews', null, { root: true })

      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles ({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
