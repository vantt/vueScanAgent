import { Vue } from 'vue-property-decorator'
import App from "./App.vue";
import router from "./router";
import { createStore } from "./store/store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import Toasted from "vue-toasted";
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueQrcode from '@chenfengyuan/vue-qrcode';
import {config} from "./config/config";
import buildDependencyContainer from './container'


export class AppBootstrap {
    constructor () {
        this.loadDependencyContainer()
        this.loadVueApp()
    }

    private loadDependencyContainer (): void {
        buildDependencyContainer()
    }

    private loadVueApp (): void {
        Vue.component(VueQrcode.name, VueQrcode);
        Vue.use(VueAxios, axios);
        Vue.use(Toasted, { position: "top-center" });
        Vue.config.productionTip = false;
        Vue.axios.defaults.baseURL = config.baseUrl;

        const store = createStore(null);

        new Vue({
            store,
            router,
            vuetify,
            render: h => h(App)
        }).$mount("#app");
    }
}