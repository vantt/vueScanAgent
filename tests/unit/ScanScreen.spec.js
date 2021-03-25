import {mount, shallowMount, createLocalVue} from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import ScanScreen from "@/components/ScanScreen";
import {mockScanAction1, mockScanActions} from "./fixtures/mockScanActions";
import {createStore} from "@/store/store.ts";
import router from "@/router";

const mediaDevicesMock = {
    enumerateDevices: jest.fn(),
};

global.navigator.mediaDevices = mediaDevicesMock; //


const createValidComponent = () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const vuetify = new Vuetify();
    const store = createStore(mockScanActions);
    router.push({name: 'Scan', params: {actionCode: mockScanAction1.code}});

    return mount(ScanScreen, {
        router,
        store,
        vuetify,
        localVue,
    });
};

describe("ScanScreen.vue redirect correctly", () => {
    test("redirect to previous route if a non-existed ScanAction.Code is passed in", () => {
        const backFn    = jest.fn();
        const toastFn   = jest.fn();
        const $toasted  = {error: toastFn}
        const store     = createStore(mockScanActions);
        const localVue  = createLocalVue();

        localVue.use(VueRouter);

        router.back = backFn;
        router.push({name: 'Scan', params: {actionCode: 'some-thing-wrong'}})

        shallowMount(ScanScreen, {
            mocks: {$toasted},
            router,
            store,
            localVue,
        });

        expect(toastFn).toHaveBeenCalledWith('Could not find Action');
        expect(backFn).toHaveBeenCalled();
    });

    test("not-redirect to previous route if an existed ScanAction.Code is passed in", () => {

        const backFn = jest.fn();
        const toastFn = jest.fn();
        const $toasted = {error: toastFn}
        const store = createStore(mockScanActions);
        const localVue = createLocalVue();
        localVue.use(VueRouter);

        router.back = backFn;
        router.push({name: 'Scan', params: {actionCode: mockScanAction1.code}})

        shallowMount(ScanScreen, {
            mocks: {$toasted},
            router,
            store,
            localVue,
        });

        expect(toastFn).not.toHaveBeenCalled();
        expect(backFn).not.toHaveBeenCalled();
    });
});


// describe("ScanScreen.vue is a valid component", () => {
//     test("is a Vue instance", () => {
//         const wrapper = createValidComponent();
//         expect(wrapper.vm).toBeTruthy();
//     });
// });

