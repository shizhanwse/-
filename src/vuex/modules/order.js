/**
 * Created by Gaven on 2017/8/1.
 */

import utils from '../../utils/utils'
import { createOrder, getOrderList, orderPrint, orderConfirm } from '../../api'

const state = {
  pageSize: 10,
  wwcPageNum: 1,
  wwcdd: [],
  wwcddTotal: 1,

  ywcPageNum: 1,
  ywcdd: [],
  ywcddTotal: 1,

  createdOrderFlag: false,

  count: 1,

};

const getters = {

};

const actions = {
  async createOrder({ commit }, { serviceProgramId, title, totalFee, copies, fileType='pdf' }) {
    let serialId = utils.generateUUID();
    let data = await utils.fetch(createOrder, {
      serialId,
      srcRegionCode,
      serviceProgramId,
      title,
      totalFee,
      copies,
      fileType,
    });
    return {
      result: data,
      serialId
    }
  },
  async getWwcdd({ commit, state }) {
    if(state.wwcdd.length<state.wwcddTotal){
      let data = await utils.fetch(getOrderList, {
        srcRegionCode,
        orderState: '0',
        rows: state.pageSize,
        page: state.wwcPageNum,
      });
      commit('SET_WWCDD_DATA', data)
    }
  },
  async getYwcdd({ commit, state }) {
    if(state.ywcdd.length<state.ywcddTotal){
      let data = await utils.fetch(getOrderList, {
        srcRegionCode,
        orderState: '1',
        rows: state.pageSize,
        page: state.ywcPageNum,
      });
      commit('SET_YWCDD_DATA', data)
    }
  },
  async orderPrint({ commit }, {terminalCode, serialId}) {
    let data = await utils.fetch(orderPrint, {
      srcRegionCode,
      terminalCode,
      serialId,
    });
    return data;
  },
  async orderConfirm({ commit }, {terminalCode, serialId}) {
    let data = await utils.fetch(orderConfirm, {
      terminalCode,
      serialId,
    });
    return data;
  },
  setCount({ commit }, count){
    commit('SET_COUNT', count)
  }
};

const mutations = {
  SET_WWCDD_DATA(state, data){
    if(data.pages == 0){
      state.wwcdd = [...state.wwcdd, ...data.list];
      state.wwcddTotal = data.total;
    }else if(data.pages >= state.wwcPageNum){
      state.wwcPageNum += 1;
      state.wwcdd = [...state.wwcdd, ...data.list];
      state.wwcddTotal = data.total;
    }
  },
  SET_YWCDD_DATA(state, data){
    if(data.pages == 0){
      state.ywcdd = [...state.ywcdd, ...data.list];
      state.ywcddTotal = data.total;
    }else if(data.pages >= state.ywcPageNum){
      state.ywcPageNum += 1;
      state.ywcdd = [...state.ywcdd, ...data.list];
      state.ywcddTotal = data.total;
    }
  },
  SET_COUNT(state, count){
    state.count = count;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
