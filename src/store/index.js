import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    token: '',
    user: {
      name: null,
      lastName: null,
      email: null,
      photo: null,
    },
  },
  mutations: {
    setLogin(state, data) {
      state.isAuth = true
      state.token = data
    },
    setUser(state, data) {
      state.user.name = data.name
      state.user.lastName = data.lastName
      state.user.email = data.email
      state.user.photo = data.photo
    },
    initializeAuth() {
      const dataAuthSession = localStorage.getItem('auth')
      if (dataAuthSession) {
        let data = JSON.parse(dataAuthSession)
        this.commit('setLogin', data)
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
