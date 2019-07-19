import Vue from "vue";
import axios from "axios";
import store from "../../store";
import { responseHandler, errorHandler } from "./responseHandler";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_SERVER
});

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

const requestHandler = async request => {
  var authorized = Vue.prototype.$auth.isAuthenticated();

  if (authorized) {
    var useLoadingModal = true;
    const accessToken = await Vue.prototype.$auth.getAccessToken();

    store.dispatch("registerLoading", useLoadingModal);

    if (isHandlerEnabled(request)) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  } else {
    Vue.prototype.$forceUpdate();
  }
};

axiosInstance.interceptors.request.use(request => requestHandler(request));
axiosInstance.interceptors.response.use(
  response => {
    var useLoadingModal = false;
    store.dispatch("registerLoading", useLoadingModal);

    var useResultModal = true;
    store.dispatch("triggerResults", useResultModal);

    if (response) {
      responseHandler(response);
    }
  },
  error => {
    var useLoadingModal = false;
    store.dispatch("registerLoading", useLoadingModal);

    var useResultModal = true;
    store.dispatch("triggerResults", useResultModal);

    if (error) {
      errorHandler(error);
    }
  }
);

export { axiosInstance };
