import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import { scanActions, EmptyScanAction } from "../data/scanActions";
import { createStore } from "@/store";
import flushPromises from 'flush-promises';
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
        wrapper = createComponent(scanActions);
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
        expect(wrapper.findAll('[data-test="scan-card"]')).toHaveLength(0);
    });

    it("given 3 scan-records in store, renders 3 scan cards", async () => {
        const wrapper = createComponent(scanActions);
        expect(wrapper.findAll('[data-test="scan-card"]')).toHaveLength(3);
    });

    it("correctly renders a Card", async () => {
        const wrapper = createComponent(scanActions);
        const cardInfo = scanActions[0];
        const card = wrapper.findAll('[data-test="scan-card"]').at(0);

        expect(card.find('[data-test="card-title"]').text()).toEqual(cardInfo.label);
        expect(card.find('[data-test="card-code"]').text()).toEqual('[ '+ cardInfo.code+' ]');
        expect(card.find('[data-test="card-link"]').text()).toEqual(cardInfo.link);

        expect(card.find('[data-test="card-edit"]')).toBeTruthy();
        expect(card.find('[data-test="card-copy"]')).toBeTruthy();
        expect(card.find('[data-test="card-delete"]')).toBeTruthy();
    });

    it("when click on Edit button, go to Edit page", () => {
        const wrapper = createComponent(scanActions);
        const card = wrapper.findAll('[data-test="scan-card"]').at(0);
        const btn = card.find('[data-test="card-edit"]');

        btn.trigger('click');
        expect(wrapper.vm.$route.path).toEqual("/setting/"+scanActions[0].code+"/edit");
    });

    it("when click on Copy button, go to Copy page", () => {
        const wrapper = createComponent(scanActions);
        const card = wrapper.findAll('[data-test="scan-card"]').at(0);
        const btn = card.find('[data-test="card-copy"]');

        btn.trigger('click');
        expect(wrapper.vm.$route.path).toEqual("/setting/"+scanActions[0].code+"/copy");
    });

    it("when click on Delete button, goto delete action", () => {
        const wrapper = createComponent(scanActions);
        const card = wrapper.findAll('[data-test="scan-card"]').at(0);
        const btn = card.find('[data-test="card-delete"]');
        btn.trigger('click');

        expect(wrapper.vm.$route.path).toEqual("/setting/"+scanActions[0].code+"/delete")
    });
});