import Vue from "vue";
import Router from "vue-router";

import Dashboard from "./components/Dashboard";
import ScanScreen from "./components/ScanScreen";

import Settings from "./components/Settings";
import SettingItem from "./components/SettingItem";
import ScanHistory from "./components/ScanHistory";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "Home",
            component: Dashboard
        },
        {
            path: "/scan/:actionCode",
            name: "Scan",
            component: ScanScreen
        },
        {
            path: "/history",
            name: "History",
            component: ScanHistory,
        },
        {
            path: "/settings",
            name: "Settings",
            component: Settings
        },
        {
            path: "/setting/:code/:actionType",
            name: "SettingItem",
            component: SettingItem,
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
    ]
});
