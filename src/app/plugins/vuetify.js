import "@mdi/js";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const opts = {
    icons: {
        iconfont: 'mdiSvg || md || fa || mdi',
    },
}

export default new Vuetify(opts);
