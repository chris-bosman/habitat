import { upload } from "./js/uploadService";
import { responseHandler } from "./js/responseHandler";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    responseResult: [],
    menuOpen: null
  },
  mutations: {
    UPLOAD_RESULT(state, responseResult) {
      state.responseResult = responseResult;
    },
    COLLAPSE_STATE(state, menuOpen) {
      state.menuOpen = menuOpen;
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
    registerCollapse({ commit }, menuOpen) {
      commit("COLLAPSE_STATE", menuOpen);
    }
  }
});

export default store;
