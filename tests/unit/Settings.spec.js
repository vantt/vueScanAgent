import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import { mockScanActions, EmptyScanAction } from "./fixtures/mockScanActions";
import { createStore } from "@/store";
import router from "@/router";
import SUTComponent from "@/components/Settings";

const createComponent = (actions) => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    //localVue.use(VueRouter);

    const vuetify = new Vuetify();

    const store = createStore(actions);
    // const router = new VueRouter({
    //     routes: [
    //         { path: "/setting/:code/:actionType", name: "SettingItem", component: () => '-' }
    //     ]
    // });

    return mount(SUTComponent, {
        store,
        router,
        vuetify,
        localVue
    });
};

describe("Settings.vue is a valid component", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = createComponent(mockScanActions);
    });

    test("is a Vue instance", () => {
        expect(wrapper.vm).toBeTruthy();
    });

    it("renders an Speed Dial button", () => {
        expect(wrapper.findAll('[data-test="speed-dial"]')).toHaveLength(1);
    });

    it("given no Action Items are showed, when clicking on SpeedDial button, renders 4 Action items ", async () => {
        const speedDial = wrapper.find('[data-test="speed-dial"]');

        expect(wrapper.findAll('[data-test~="speed-action"]')).toHaveLength(0);

        await speedDial.trigger('click');
        expect(wrapper.findAll('[data-test~="speed-action"]')).toHaveLength(4);
    });

    it("given 4 Action Items are showed, when clicking on SpeedDial button, hide all Action items", async () => {
        const speedDial = wrapper.find('[data-test="speed-dial"]');

        await speedDial.trigger('click');
        expect(wrapper.findAll('[data-test~="speed-action"]')).toHaveLength(4);

        await speedDial.trigger('click');
        expect(wrapper.findAll('[data-test~="speed-action"]')).toHaveLength(0);
    });
});

describe("Settings.vue renders scan cards correctly", () => {
    it("given, no data in Store, renders 0 scan cards", async () => {
        const wrapper = createComponent(EmptyScanAction);
        expect(wrapper.findAll('[data-test="setting-card"]')).toHaveLength(0);
    });

    it("given 3 scan-records in store, renders 3 scan cards", async () => {
        const wrapper = createComponent(mockScanActions);
        expect(wrapper.findAll('[data-test="setting-card"]')).toHaveLength(3);
    });
});