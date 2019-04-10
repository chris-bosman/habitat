import { upload } from "./js/uploadService";
import { responseHandler } from "./js/responseHandler";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    responseResult: []
  },
  mutations: {
    UPLOAD_RESULT(state, responseResult) {
      state.responseResult = responseResult;
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
    }
  }
});

export default store;
