import Vue from "vue";
import Router from "vue-router";

import ScanDashboard from "./components/ScanDashboard";
import ScanScreen from "./components/ScanScreen";

import Settings from "./components/Settings";
import SettingItem from "./components/SettingItem";
import ScanHistory from "./components/ScanHistory";
import SettingCapture from "./components/SettingCapture";
import SettingExport from "./components/SettingExport";

Vue.use(Router);

const  routes = [
    {
        path: "",
        redirect: "/scans"
    },
    {
        path: "/scans",
        name: "Home",
        component: ScanDashboard
    },
    {
        path: "/scan/:actionCode",
        name: "Scan",
        component: ScanScreen
    },
    {
        path: "/history",
        name: "History",
        component: ScanHistory
    },
    {
        path: "/setting/:code/:actionType",
        name: "SettingItem",
        component: SettingItem
    },
    {
        path: "/settings/sync-import",
        name: "SettingCapture",
        component: SettingCapture
    },
    {
        path: "/settings/sync-expose",
        name: "SettingExport",
        component: SettingExport
    },
    {
        path: "/settings/:action?/:randomize?",
        name: "Settings",
        component: Settings
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].core) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
];

const opts = {
    mode: "history",
    base: process.env.BASE_URL,
    routes: routes
}

export default new Router(opts);