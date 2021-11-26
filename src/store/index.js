import { createStore } from 'vuex'
import firebase from 'firebase/compat/app';

export default createStore({
  state: {
  },

  mutations: {
  },

  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        throw e
      }
    },
    async register({ dispatch }, { email, password }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
      } catch (e) {
        throw e
      }
    },
    async logout({ dispatch, commit }) {
      await firebase.auth().signOut()
    },
  },
  
  modules: {
  }
})
