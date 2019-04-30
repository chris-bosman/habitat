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
    uploadResult({ commit }, { formData, event }) {
      var responseResult, uploadSuccess;
      try {
        upload(formData, event).then(response => {
          responseHandler(response);
          if (!response.ok) {
            console.log(response);
            uploadSuccess = false;
            // eslint-disable-next-line
            responseResult = `Error attempting to reach ${response.url}: ${response.status} ${response.statusText}`;
            commit("UPLOAD_SUCCESS", uploadSuccess);
            commit("UPLOAD_RESULT", responseResult);
          } else {
            uploadSuccess = true;
            responseResult = "Success!";
            commit("UPLOAD_SUCCESS", uploadSuccess);
            commit("UPLOAD_RESULT", responseResult);
          }
        });
      } catch (err) {
        uploadSuccess = false;
        responseResult = err;
        commit("UPLOAD_SUCCESS", uploadSuccess);
        commit("UPLOAD_RESULT", responseResult);
      }
    }
  },
  registerCollapse({ commit }, menuCollapsed) {
    commit("COLLAPSE_STATE", menuCollapsed);
  }
});

export default store;
