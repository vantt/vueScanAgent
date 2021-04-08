import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import { mockScanActions } from "./fixtures/mockScanActions";
import { createStore } from "@/app/store/store.ts";
import VueRouter from "vue-router";
import ScanDashboard from "@/app/components/ScanDashboard";

const createComponent = () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueRouter);

    const vuetify = new Vuetify();
    const store = createStore(mockScanActions);

    const router = new VueRouter({
        routes: [
            { path: "/scan/:actionCode", name: "Scan", component: { render: "-" } }
        ]
    });

    return mount(ScanDashboard, {
        store,
        router,
        vuetify,
        localVue
    });
};

describe("ScanDashboard.vue is a valid component", () => {
    test("is a Vue instance", () => {
        const wrapper = createComponent();
        expect(wrapper.vm).toBeTruthy();
    });

    it("renders an addNew button", () => {
        const wrapper = createComponent();
        expect(wrapper.findAll('[data-test="addNew-btn"]')).toHaveLength(1);
    });

    it("renders 3 scan Cards", () => {
        const wrapper = createComponent();
        expect(wrapper.findAll('[data-test="card-component"]')).toHaveLength(3);
    });
});