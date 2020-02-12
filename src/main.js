import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import Toasted from "vue-toasted";
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueQrcode from '@chenfengyuan/vue-qrcode';
import {config} from "./config/config";

Vue.component(VueQrcode.name, VueQrcode);
Vue.use(VueAxios, axios);
Vue.use(Toasted, { position: "top-center" });
Vue.config.productionTip = false;
Vue.axios.defaults.baseURL = config.baseUrl;

const store = createStore();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
