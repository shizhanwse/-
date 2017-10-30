/**
 * Created by Gaven on 2017/8/1.
 */

import utils from '../../utils/utils'
import { getProjectList, getProjectDetail, getPreview, previewSrc } from '../../api'

const state = {
  pageSize: 10,
  dylbPageNum: 1,
  // 打印列表 数据
  dylb: [],
  // 打印列表 数据总量
  dylbTotal: 1,

  previewList: [],
  projectDetail: {},
};

const getters = {

};

const actions = {
  async getDylb({ commit, state }, departId='') {
    if(state.dylb.length<state.dylbTotal){
      let data = await utils.fetch(getProjectList, {
        serviceType: '100',
        rows: state.pageSize,
        page: state.dylbPageNum,
        departmentId: departId==='wiseduqbbm'?'':departId,
      });
      commit('SET_DYLB_DATA', data)
    }
  },
  // 置空数据
  resetProData({ commit }){
    commit('RESET_PRO_DATA')
  },
  async getPreview({ commit }, serviceProgramId){
    let data = await utils.fetch(getPreview, {
      serviceProgramId
    });
    commit('SET_PREVIEW_DATA', data)
  },
  async getProjectDetail({ commit }, serviceProjectId){
    let data = await utils.fetch(getProjectDetail, {
      serviceProjectId
    });
    commit('SET_PROJECT_DETAIL', data)
  },
};

const mutations = {
  SET_DYLB_DATA(state, data){
    if(data.pages == 0){
      state.dylb = [...state.dylb, ...data.list];
      state.dylbTotal = data.total;
    }else if(data.pages >= state.dylbPageNum){
      if(data.pages > state.dylbPageNum){
        state.dylbPageNum += 1;
      }
      state.dylb = [...state.dylb, ...data.list];
      state.dylbTotal = data.total;
    }
  },
  RESET_PRO_DATA(state){
    state.dylbPageNum = 1;
    state.dylb = [];
    state.dylbTotal = 1;
  },
  SET_PREVIEW_DATA(state, data){
    state.previewList = data.map(el=>{
      let url = el;
      if(el.indexOf('/')>-1){
        url = el.slice(el.lastIndexOf('/'));
      }
      // let img = new Image();
      // img.src = previewSrc+url;
      // console.log(img, img.naturalWidth, img.height);
      return {
        src: window.host+previewSrc+url,
        w: 300*2,
        h: 480*2
      }
    });
    // state.previewList = [...state.previewList, ...state.previewList];
  },
  SET_PROJECT_DETAIL(state, data){
    state.projectDetail = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
