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
    isUserLoggedIn: false
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
    setIsUserLoggedIn (state, isUserLoggedIn) {
      state.isUserLoggedIn = isUserLoggedIn
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
    setIsUserLoggedIn ({commit}, isUserLoggedIn) {
      commit('setIsUserLoggedIn', isUserLoggedIn)
    }
  }
})
