import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
const { auth } = require("./firebaseConfig.js");

import globalMixin from "@/mixins/global";

export const eventBus = new Vue();

Vue.config.productionTip = false;

Vue.mixin(globalMixin);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
