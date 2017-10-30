/**
 * Created by Gaven on 2017/8/1.
 */

import utils from '../../utils/utils'
import { getTerminalDetail, getTerminal, terminalCheck } from '../../api'

const state = {
  machineList: [],
  selectedMachine: {},
  
  terminalDetail: {},
  
};

const getters = {
};

const actions = {
  async getTerminalDetail({ commit }, terminalCode) {
    let data = await utils.fetch(getTerminalDetail, {
      terminalCode,
    });
    commit('SET_TERMINAL_DETAIL', data)
  },
  async getTerminal({ commit }, serviceProgramId) {
    let data = await utils.fetch(getTerminal, {
      serviceProgramId,
    });
    commit('SET_MACHINE_LIST', data)
  },
  async updateTerminal({ commit }, data) {
    commit('UPDATE_MACHINE_LIST', data)
  },
  async setSelectedMachine({ commit }, data) {
    commit('SET_SELECTED_MACHINE', data)
  },
  async terminalCheck({ commit }, {serialId, terminalCode}) {
    let data = await utils.fetch(terminalCheck, {
      serialId,
      terminalCode,
      srcRegionCode,
    });
    return data;
  },
};

const mutations = {
  SET_TERMINAL_DETAIL(state, data){
    state.terminalDetail = data?data:{};
  },
  SET_MACHINE_LIST(state, data){
    state.machineList = data.list?data.list:[];
  },
  UPDATE_MACHINE_LIST(state, data){
    state.machineList = data?data:[];
  },
  SET_SELECTED_MACHINE(state, data){
    state.selectedMachine = data?data:{};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
