import axios from "axios";
import { BASE_URL, HTTP_HEADERS } from "@/common/config.js";

const HTTP = axios.create({
  baseURL: BASE_URL,
  headers: HTTP_HEADERS,
});

// Add a request interceptor
HTTP.interceptors.request.use(function(config) {
  this.$store.dispatch("setIsLoadingRequest", true);
  return config;
});

// Add a response interceptor
HTTP.interceptors.response.use(
  function(response) {
    this.$store.dispatch("setIsLoadingRequest", false);
    this.$store.dispatch("setIsLoadedRequestSuccess", true);

    return response;
  },
  (error) => {
    this.$store.dispatch("setIsLoadingRequest", false);
    this.$store.dispatch("setIsLoadedRequestSuccess", false);
    this.$store.dispatch("setAppMsgErrors", error.message);
    return Promise.reject(error);
  }
);

/** Check both API response Status code and response data to make sure request is success */
function ensureSuccessResponse(response) {
  let isSuccess = response.data.IsSuccessful;
  if (isSuccess === undefined) {
    this.$store.dispatch("setAppMsgErrors", "Server return invalid message");
    return false;
  }
  if (!isSuccess) {
    this.$store.dispatch("setAppMsgErrors", response.data.Errors);
    return false;
  }
  return true;
}

export { HTTP, ensureSuccessResponse };
