/**
 * Created by Gaven on 2017/7/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import order from './modules/order'
import project from './modules/project'
import department from './modules/department'
import terminal from './modules/terminal'
import sysconfig from './modules/sysconfig'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    order,
    project,
    department,
    terminal,
    sysconfig,
  }
})
