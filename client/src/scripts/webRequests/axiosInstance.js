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
  var useLoadingModal = true;
  const accessToken = await Vue.prototype.$auth.getAccessToken();

  store.dispatch("registerLoading", useLoadingModal);

  if (isHandlerEnabled(request)) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
};

axiosInstance.interceptors.request.use(request => requestHandler(request));
axiosInstance.interceptors.response.use(
  response => {
    var useLoadingModal = false;
    store.dispatch("registerLoading", useLoadingModal);
    if (response) {
      responseHandler(response);
    }
  },
  error => {
    var useLoadingModal = false;
    store.dispatch("registerLoading", useLoadingModal);
    if (error) {
      errorHandler(error);
    }
  }
);

export { axiosInstance };
