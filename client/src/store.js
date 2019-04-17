import { upload } from "./js/uploadService";
import { responseHandler } from "./js/responseHandler";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    responseResult: [],
    menuCollapsed: null
  },
  mutations: {
    UPLOAD_RESULT(state, responseResult) {
      state.responseResult = responseResult;
    },
    COLLAPSE_STATE(state, menuCollapsed) {
      state.menuCollapsed = menuCollapsed;
    }
  },
  actions: {
    uploadResult({ commit }, formData) {
      upload(formData).then(response => {
        var responseResult;
        try {
          responseHandler(response);
        } catch (err) {
          responseResult = err;
          commit("UPLOAD_RESULT", responseResult);
        } finally {
          responseResult = "Error: " + response.statusText;
          commit("UPLOAD_RESULT", responseResult);
        }
      });
    },
    registerCollapse({ commit }, menuCollapsed) {
      commit("COLLAPSE_STATE", menuCollapsed);
    }
  }
});

export default store;
