import { createStore } from 'vuex'
import axios from "axios";
import router from '../router/index.js';
import createPersistedState from "vuex-persistedstate";


export default createStore({
  state: {
    user:{},
    loggedIn: false
  },
  mutations: {
    SET_USER(state, user){
      state.user = user;
      state.loggedIn = true;
    },
    REMOVE_USER(state){
      state.user = {}
    }
  },
  actions: {
    async login({commit}, payload) {
      try {
        const res = await axios.post("http://localhost:3000/login", payload);
        commit('SET_USER', res.data.user)
        localStorage.setItem("token", res.data.accessToken);
        router.push("/")
      } catch (error) {
        console.log(error);
      }
    },
    logout({commit}) {
        commit('REMOVE_USER')
        localStorage.removeItem("token");
        router.push("/signin")
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],

})
