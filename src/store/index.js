import Vue from "vue";
import Vuex from "vuex";

import prayersModule from "./module/Prayers";
import monthsModule from "./module/Months";
import daysModule from "./module/Days";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notificationStatus: false,
    notificationMessage: ''
  },
  mutations: {
    notify(state, message) {
      state.notificationStatus = true;
      state.notificationMessage = message
    }
  },
  actions: {},
  modules: {
    prayers: prayersModule,
    months: monthsModule,
    days: daysModule,
  },
});
