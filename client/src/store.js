import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    requestSuccess: false,
    requestResult: null,
    menuCollapsed: null,
    authenticated: false,
    orgExists: false,
    orgName: null,
    smallWindow: null,
    useLoadingModal: false,
    useResultModal: false
  },
  mutations: {
    REQUEST_SUCCESS(state, requestSuccess) {
      state.requestSuccess = requestSuccess;
    },
    REQUEST_RESULT(state, requestResult) {
      state.requestResult = requestResult;
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
    },
    LOADING_STATE(state, useLoadingModal) {
      state.useLoadingModal = useLoadingModal;
    },
    SHOW_RESULTS(state, useResultModal) {
      state.useResultModal = useResultModal;
    }
  },
  actions: {
    requestResult({ commit }, { requestSuccess, requestResult }) {
      commit("REQUEST_SUCCESS", requestSuccess);
      commit("REQUEST_RESULT", requestResult);
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
    },
    registerLoading({ commit }, useLoadingModal) {
      commit("LOADING_STATE", useLoadingModal);
    },
    triggerResults({ commit }, useResultModal) {
      commit("SHOW_RESULTS", useResultModal);
    }
  }
});

export default store;
