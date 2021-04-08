import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import router from "@/app/router";
import App from "@/app/App";

const createComponent = () => {
    const localVue = createLocalVue();
    const vuetify = new Vuetify();

    const store = new Vuex.Store({
        getters: {
            allScanActions: jest.fn(),
            allScanHistories: jest.fn(),
        }
    })

    return mount(App, { store, router, vuetify, localVue });
};

describe("App.vue is a valid component", () => {
    test("is a Vue instance", () => {
        const wrapper = createComponent();
        expect(wrapper.vm).toBeTruthy();
    });

    it("renders TopMenu", () => {
        const wrapper = createComponent();
        expect(wrapper.findAll("[data-test='topMenu-component']")).toHaveLength(1);
    });

    it("renders ScanDashboard", () => {
        const wrapper = createComponent();
        expect(wrapper.findAll("[data-test='dashboard-component']")).toHaveLength(1);
    });

    it("redirects to /scans if no route specified", async () => {
        const wrapper = createComponent();

        // move away from Home Screen, so that we can push the "/" route
        await wrapper.findAll("[data-test='top-menu']").at(1).trigger('click');
        expect(wrapper.vm.$route.path).not.toEqual("/scans");

        await wrapper.vm.$router.push('/');
        expect(wrapper.vm.$route.path).toEqual("/scans");
    });
});

// https://github.com/lmiller1990/vuejs-composition-course/blob/1.7-refactoring-with-confidence/src/Timeline.spec.ts