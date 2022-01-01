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
    },
  },
  actions: {
    async login({commit}, payload) {
      try {
        const res = await axios.post("http://localhost:3000/login", payload);
        localStorage.setItem("token", res.data.accessToken);
        router.push("/")
      } catch (error) {
        console.log(error);
      }
    },
    async getUser(){
      try {
        const userRes = await axios(`/users/${user.id}?_embed=followings&_embed=posts`)
        commit('SET_USER', userRes.data) 
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
  getters:{
    getUser(state){
      return state.user
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],

})
