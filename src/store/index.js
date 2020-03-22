import Vue from "vue";
import Vuex from "vuex";

import prayersModule from "./module/Prayers";
import monthsModule from "./module/Months";
import daysModule from "./module/Days";
import generalModule from "./module/General";
import configurationModule from "./module/configuration";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    prayers: prayersModule,
    months: monthsModule,
    days: daysModule,
    general: generalModule,
    configuration: configurationModule
  }
});
