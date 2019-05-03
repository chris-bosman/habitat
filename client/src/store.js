import { upload } from "./scripts/webRequests/uploadService";
import { responseHandler } from "./scripts/webRequests/responseHandler";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    uploadSuccess: false,
    responseResult: [],
    menuCollapsed: null,
    authenticated: false
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
    },
    AUTH_STATE(state, authenticated) {
      state.authenticated = authenticated;
    }
  },
  actions: {
    uploadResult({ commit }, { formData, event }) {
      var responseResult, uploadSuccess;
      try {
        upload(formData, event).then(response => {
          responseHandler(response);
          if (!response.ok) {
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
    },
    registerMenuChange({ commit }, menuCollapsed) {
      commit("COLLAPSE_STATE", menuCollapsed);
    },
    registerAuth({ commit }, authenticated) {
      commit("AUTH_STATE", authenticated);
    }
  }
});

export default store;
