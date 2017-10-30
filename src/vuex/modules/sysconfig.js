/**
 * Created by Gaven on 2017/8/1.
 */

import utils from '../../utils/utils'
import { sysConfigList } from '../../api'

const state = {
  zzfwXtcsList: {},
  zzfwTsxxList: {},
};

const getters = {
};

const actions = {
  async getSysConfig({ commit }) {
    let data = await utils.fetch(sysConfigList);
    commit('SET_SYS_CONFIG', data)
  },
};

const mutations = {
  SET_SYS_CONFIG(state, data){
    state.zzfwXtcsList = data.zzfwXtcsList?data.zzfwXtcsList:{};
    state.zzfwTsxxList = data.zzfwTsxxList?data.zzfwTsxxList:{};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
