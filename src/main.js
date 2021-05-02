import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueGtag from 'vue-gtag';

import globalMixin from "@/mixins/global";

import '@mdi/font/css/materialdesignicons.min.css'

export const eventBus = new Vue();

Vue.config.productionTip = false;

if (process.env.NODE_ENV == 'production') {
  Vue.use(VueGtag, {
    config: { id: 'G-C2E9CKWZCC' }
  })
}

Vue.mixin(globalMixin);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
