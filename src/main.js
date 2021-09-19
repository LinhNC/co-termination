import Vue from "vue";
import App from "./App.vue";
// Plugins
import vuetify from "@/plugins/vuetify";
// VueX Store
import store from "@/store";
// Composition-api
import VueCompositionAPI from "@vue/composition-api";
// Import styles
import "mdi-icons/css/materialdesignicons.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./scss/main.scss";
Vue.use(VueCompositionAPI);

import {
  ValidationObserver,
  ValidationProvider,
} from "vee-validate/dist/vee-validate.full";
import "@/validations/validators.js";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
