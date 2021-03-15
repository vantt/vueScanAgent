import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

Vue
    .use(Vuex)
    .use(VueRouter)
    .use(Vuetify);