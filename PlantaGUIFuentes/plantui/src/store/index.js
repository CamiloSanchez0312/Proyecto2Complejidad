/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
var API_URL='localhost:5000/'

export default new Vuex.Store({
  state: {
    N: null,
    CapTermo: 0,
    CapHidro: 0,
    CapNuclear: 0,
    CostTermo: 0,
    CostHidro: 0,
    CostNuclear: 0,
    Dsi: ''
  },
  mutations: {
    set_N(state, N) {
      state.N = N
    },
    set_Dsi(state, Dsi){
      state.Dsi= Dsi
    },
    set_CapTermo(state, CapTermo) {
      state.CapTermo = CapTermo
    },
    set_CapHidro(state, CapHidro) {
      state.CapHidro = CapHidro
    },
    set_CapNuclear(state, CapNuclear) {
      state.CapNuclear = CapNuclear
    },
    set_CostTermo(state, CostTermo) {
      state.CostTermo = CostTermo
    },
    set_CostHidro(state, CostHidro) {
      state.CostHidro = CostHidro
    },
    set_CostNuclear(state, CostNuclear) {
      state.CostNuclear = CostNuclear
    }
  },
  actions: {
    sendModel(context, variables) {
      return new Promise((resolve, reject) => {
        //context.commit('auth_request')
        axios.post(API_URL,variables, {headers: {"Access-Control-Allow-Credentials": "*"}} )
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            
          })
      })
    }
  },
  getters: {
    getN(state) {
      return state.N
    },
    getCapTermo(state) {
      return state.CapTermo
    },
    getCapHidro(state) {
      return state.CapTermo
    },
    getCapNuclear(state) {
      return state.CapNuclear
    },
    getCostTermo(state) {
      return state.CapTermo
    },
    getCostHidro(state) {
      return state.CostHidro
    },
    getCostNuclear(state) {
      return state.CostNuclear
    }
  }
})
