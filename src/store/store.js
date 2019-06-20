import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token: null,
    firstName: null,
    lastName: null,
    role: null,
    email: null,
    isUserLoggedIn: false,
    showSidebar: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.token = false
      }
    },
    setFirstName (state, firstName) {
      state.firstName = firstName
    },
    setLastName (state, lastName) {
      state.lastName = lastName
    },
    setRole (state, role) {
      state.role = role
    },
    setEmail (state, email) {
      state.email = email
    },
    setIsUserLoggedIn (state, isUserLoggedIn) {
      state.isUserLoggedIn = isUserLoggedIn
    },
    toggleSidebar (state) {
      state.showSidebar = !state.showSidebar
    },
    hideSidebar (state) {
      state.showSidebar = false
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setFirstName ({commit}, firstName) {
      commit('setFirstName', firstName)
    },
    setLastName ({commit}, lastName) {
      commit('setLastName', lastName)
    },
    setRole ({commit}, role) {
      commit('setRole', role)
    },
    setEmail ({commit}, email) {
      commit('setEmail', email)
    },
    setIsUserLoggedIn ({commit}, isUserLoggedIn) {
      commit('setIsUserLoggedIn', isUserLoggedIn)
    },
    toggleSidebar ({commit}) {
      commit('toggleSidebar')
    },
    // eslint-disable-next-line
    reset ({commit, dispatch }) {
      dispatch('setToken', '')
      dispatch('setFirstName', '')
      dispatch('setLastName', '')
      dispatch('setEmail', '')
      dispatch('setIsUserLoggedIn', '')
      dispatch('setRole', '')
      commit('hideSidebar')
    }

  }
})
