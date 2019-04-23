import { upload } from "./js/uploadService";
import { responseHandler } from "./js/responseHandler";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    uploadSuccess: false,
    responseResult: [],
    menuCollapsed: null
  },
  mutations: {
    UPLOAD_SUCCESS(state, uploadSuccess) {
      state.uploadSuccess = uploadSuccess;
    },
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
        var responseResult, uploadSuccess;
        try {
          responseHandler(response);
        } catch (err) {
          uploadSuccess = false;
          responseResult = err;
          commit("UPLOAD_SUCCESS", uploadSuccess);
          commit("UPLOAD_RESULT", responseResult);
        } finally {
          if (!response.ok) {
            uploadSuccess = false;
            responseResult = "Error: " + response.statusText;
          } else {
            uploadSuccess = true;
            responseResult = "Success!";
          }
          commit("UPLOAD_SUCCESS", uploadSuccess);
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
