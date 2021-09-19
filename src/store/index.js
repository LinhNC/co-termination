import Vue from "vue";
import Vuex from "vuex";
import OptionDataService from "@/services/OptionDataService";
import TerminationDataService from "@/services/TerminationDataService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoadingRequest: false,
    IsLoadedRequestSuccess: false,
    appMsgErrors: [],

    notificationNatures: [],
    terminationReasons: [],
    termination: {},
    terminationMembers: [],
  },
  getters: {
    isLoadingRequest: (state) => state.isLoadingRequest,
    IsLoadedRequestSuccess: (state) => state.IsLoadedRequestSuccess,
    appMsgErrors: (state) => state.appMsgErrors,

    notificationNatures: (state) => state.notificationNatures,
    terminationReasons: (state) => state.terminationReasons,
    termination: (state) => state.termination,
    terminationMembers: (state) => state.terminationMembers,
  },
  mutations: {
    SET_LOADING_REQUEST(state, isLoadingRequest) {
      state.isLoadingRequest = isLoadingRequest;
    },
    SET_LOADED_REQUEST_SUCCESS(state, IsLoadedRequestSuccess) {
      state.IsLoadedRequestSuccess = IsLoadedRequestSuccess;
    },
    SET_APP_MSG_ERRORS(state, errorMessage) {
      state.appMsgErrors.push(errorMessage);
    },

    SET_NOTIFICATION_NATURES(state, notificationNatureOption) {
      state.notificationNatures = notificationNatureOption;
    },
    SET_TERMINATION_REASONS(state, terminationReasons) {
      state.terminationReasons = terminationReasons;
    },
    SET_TERMINATION(state, termination) {
      state.termination = termination;
    },
    SET_TERMINATION_MEMBERS(state, terminationMembers) {
      state.terminationMembers = terminationMembers;
    },
    ADD_TERMINATION_MEMBERS(state, terminationMembers) {
      state.terminationMembers = [
        ...state.terminationMembers,
        ...terminationMembers,
      ];
    },
  },
  actions: {
    setIsLoadingRequest({ commit }, value) {
      commit("SET_LOADING_REQUEST", value);
    },
    setIsLoadedRequestSuccess({ commit }, value) {
      commit("SET_LOADED_REQUEST_SUCCESS", value);
    },
    setAppMsgErrors({ commit }, value) {
      commit("SET_APP_MSG_ERRORS", value);
    },

    async getNotificationNatures({ commit }) {
      let options = await OptionDataService.getNotificationNatures();
      commit("SET_NOTIFICATION_NATURES", options);
    },
    async getTerminationReasons({ commit }) {
      let options = await OptionDataService.getTerminationReasons();
      commit("SET_TERMINATION_REASONS", options);
    },
    async getTerminationData({ commit }) {
      let data = await TerminationDataService.getTerminationData();
      console.log(data);
      commit("SET_TERMINATION", data.termination);
      commit("SET_TERMINATION_MEMBERS", data.members);
    },
    addTerminationMembers({ commit }, members) {
      commit("ADD_TERMINATION_MEMBERS", members);
    },
  },
});
