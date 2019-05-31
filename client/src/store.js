import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    uploadSuccess: false,
    responseResult: [],
    menuCollapsed: null,
    authenticated: false,
    orgExists: false,
    orgName: null
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
    },
    ORG_EXISTS(state, { orgExists, orgName }) {
      state.orgExists = orgExists;
      state.orgName = orgName;
    },
    SMALL_VIEWPORT(state, smallWindow) {
      state.smallWindow = smallWindow;
    }
  },
  actions: {
    uploadResult({ commit }, { uploadSuccess, responseResult }) {
      commit("UPLOAD_SUCCESS", uploadSuccess);
      commit("UPLOAD_RESULT", responseResult);
    },
    registerMenuChange({ commit }, menuCollapsed) {
      commit("COLLAPSE_STATE", menuCollapsed);
    },
    registerAuth({ commit }, authenticated) {
      commit("AUTH_STATE", authenticated);
    },
    registerOrg({ commit }, { orgExists, orgName }) {
      commit("ORG_EXISTS", { orgExists, orgName });
    },
    registerWindowWidth({ commit }, smallWindow) {
      commit("SMALL_VIEWPORT", smallWindow);
    }
  }
});

export default store;
