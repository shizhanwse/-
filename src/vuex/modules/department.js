/**
 * Created by Gaven on 2017/8/1.
 */

import utils from '../../utils/utils'
import { getDepartmentList } from '../../api'

const state = {
  pageSize: 1000,
  departPageNum: 1,
  // 部门列表
  depart: [],
  // 部门列表总数
  departTotal: 0,

  showDepart: {},

};

const getters = {
  departArray: state=>{
    return state.depart.map(el=>{
      return {
        name: el.bmmc,
        value: el.bmid,
      }
    })
  }
};

const actions = {
  async getDepart({ commit, state }) {
    if(state.depart.length<state.departTotal || state.departTotal===0){
      let data = await utils.fetch(getDepartmentList, {
        pageSize: state.pageSize,
        pageNum: state.departPageNum,
      });
      commit('SET_DEPART_DATA', data)
    }
  },
  setDepartment({ commit, state }, depart){
    commit('SET_DEPARTMENT', depart)
  },
};

const mutations = {
  SET_DEPART_DATA(state, data){
    // state.departPageNum += 1;
    state.depart = [{
      bmmc: '所有',
      bmid: 'wiseduqbbm',
    },  ...data.list];
    state.departTotal = data.total;

  },
  SET_DEPARTMENT(state, depart){
    state.showDepart = depart;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
