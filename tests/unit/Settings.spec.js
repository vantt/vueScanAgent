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

    const vuetify = new Vuetify();
    const store = createStore(actions);

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

describe("Settings.vue click on quick Actions", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = createComponent(mockScanActions);
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

    it("click on Reset Settings", async () => {
        const speedDial = wrapper.find('[data-test="speed-dial"]');
        await speedDial.trigger('click');
        await wrapper.findAll('[data-test~="reset-settings"]').trigger('click');
        expect(wrapper.vm.$route.path).toEqual("/settings/reset/"+wrapper.vm.randomSeed);
    });

    it("click on Export Settings", async () => {
        const speedDial = wrapper.find('[data-test="speed-dial"]');
        await speedDial.trigger('click');
        await wrapper.findAll('[data-test~="export-settings"]').trigger('click');
        expect(wrapper.vm.$route.path).toEqual("/settings/sync-expose");
    });

    it("click on Capture Settings", async () => {
        const speedDial = wrapper.find('[data-test="speed-dial"]');
        await speedDial.trigger('click');
        await wrapper.findAll('[data-test~="capture-settings"]').trigger('click');
        expect(wrapper.vm.$route.path).toEqual("/settings/sync-import");
    });
});

describe("Settings.vue, test on Quick Actions", () => {
    it("given a new Reset Route is pushed (click on Reset button), 'resetStoreToDefaultScanActions()' should be called", async () => {
        // https://stackoverflow.com/questions/50913421/testing-vue-router-in-component-navigation-guard

        const localVue = createLocalVue();
        localVue.use(Vuex);

        const vuetify = new Vuetify();
        const store = createStore(mockScanActions);
        const wrapper = mount(SUTComponent, {
            store,
            router,
            vuetify,
            localVue
        });

        //const spy = jest.spyOn(wrapper.vm, 'resetStoreToDefaultScanActions');
        //const spy = jest.spyOn(SUTComponent.methods, 'resetStoreToDefaultScanActions');

        const spy = jest.fn();
        wrapper.setMethods({ resetStoreToDefaultScanActions: spy })
        const beforeRouteUpdate = wrapper.vm.$options.beforeRouteUpdate[0]

        beforeRouteUpdate.call(wrapper.vm, {params:{action:'reset'}}, jest.fn(), jest.fn())
        expect(spy).toHaveBeenCalled();
    });

    it("given a STRANGE Route is pushed, 'resetStoreToDefaultScanActions()' should NOT be called", async () => {
        // https://stackoverflow.com/questions/50913421/testing-vue-router-in-component-navigation-guard

        const localVue = createLocalVue();
        localVue.use(Vuex);

        const vuetify = new Vuetify();
        const store = createStore(mockScanActions);
        const wrapper = mount(SUTComponent, {
            store,
            router,
            vuetify,
            localVue
        });

        //const spy = jest.spyOn(wrapper.vm, 'resetStoreToDefaultScanActions');
        //const spy = jest.spyOn(SUTComponent.methods, 'resetStoreToDefaultScanActions');

        const spy = jest.fn();
        wrapper.setMethods({ resetStoreToDefaultScanActions: spy })
        const beforeRouteUpdate = wrapper.vm.$options.beforeRouteUpdate[0]

        beforeRouteUpdate.call(wrapper.vm, {params:{action:'asdfasdf'}}, jest.fn(), jest.fn())
        expect(spy).not.toBeCalled();
    });

    it("given a STRANGE Route is pushed, 'resetStoreToDefaultScanActions()' should NOT be called", async () => {
        // https://stackoverflow.com/questions/50913421/testing-vue-router-in-component-navigation-guard

        const localVue = createLocalVue();
        localVue.use(Vuex);

        const vuetify = new Vuetify();
        const store = createStore(mockScanActions);
        const wrapper = mount(SUTComponent, {
            store,
            router,
            vuetify,
            localVue
        });

        //const spy = jest.spyOn(wrapper.vm, 'resetStoreToDefaultScanActions');
        //const spy = jest.spyOn(SUTComponent.methods, 'resetStoreToDefaultScanActions');

        const spy = jest.fn();
        wrapper.setMethods({ resetStoreToDefaultScanActions: spy })
        const beforeRouteUpdate = wrapper.vm.$options.beforeRouteUpdate[0]


        beforeRouteUpdate.call(wrapper.vm, {params:{action:null}}, jest.fn(), jest.fn())
        expect(spy).not.toBeCalled();
    });
})