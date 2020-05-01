import Vue from "vue";
import Vuex from "vuex";
import * as types from "./type";
import * as consts from "@/util/const";
import axios from "@/axios/index";
import { updateRoutes } from "@/router/index";

Vue.use(Vuex);

const myState = {
  isCollapse: false,
  exception: null,
  message: null,
  isLogin: false
};

const myMutations = {
  [types.LOGIN](state, data) {
    state.isLogin = data;
  },
  [types.GET_EXCEPTION](state, data) {
    state.exception = data;
  },
  [types.GET_MESSAGE](state, data) {
    state.message = data;
  },
  [types.RESET_EXCEPTION](state) {
    state.exception = null;
  },
  [types.RESET_MESSAGE](state) {
    state.message = null;
  },
  [types.SWITCH_COLLAPSE](state) {
    state.isCollapse = !state.isCollapse;
  }
};

const myActions = {
  async [types.LOGIN]({ commit }, data) {
    let resp = await axios.post("login", data);

    // 登录成功则resp不为null
    if (resp != null) {
      commit(types.GET_MESSAGE, "登录成功");
      // 身份信息存入session storage
      sessionStorage.setItem(
        consts.AUTHORIZATION,
        resp.headers[consts.AUTHORIZATION]
      );
      sessionStorage.setItem(consts.ROLE, resp.data.role);
      // 更新路由
      updateRoutes();
      commit(types.LOGIN, true);
    }
  },

  async [types.RESET_EXCEPTION]({ commit }, data) {
    commit(types.RESET_EXCEPTION);
  },

  async [types.RESET_MESSAGE]({ commit }, data) {
    commit(types.RESET_MESSAGE);
  },

  async [types.SWITCH_COLLAPSE]({ commit }) {
    commit(types.SWITCH_COLLAPSE);
  }
};

export default new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});

// 需要进行判断是否登录
if (sessionStorage.getItem(consts.AUTHORIZATION) != null) {
  myState.isLogin = true;
}
