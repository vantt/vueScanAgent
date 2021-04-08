import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import router from "@/app/router";
import TopMenu from "@/app/components/TopMenu";

const createComponent = () => {
    const localVue = createLocalVue();
    const vuetify = new Vuetify();

    return mount(TopMenu, { router, vuetify, localVue });
};

describe("App.vue is a valid component", () => {
    test("is a Vue instance", () => {
        const wrapper = createComponent();
        expect(wrapper.vm).toBeTruthy();
    });

    it("renders 3 top menu items", () => {
        const wrapper = createComponent();
        expect(wrapper.findAll("[data-test='top-menu']")).toHaveLength(3);
    });

    test("renders correct menu items", () => {
        const wrapper = createComponent();
        const menuItems = wrapper.findAll("[data-test='top-menu']");

        expect(menuItems.at(0).text()).toEqual("Scan");
        expect(menuItems.at(1).text()).toEqual("History");
        expect(menuItems.at(2).text()).toEqual("Settings");
    });

    test("render correct MenuItem: `Scan`", () => {
        const wrapper = createComponent();
        const menuItem = wrapper.findAll("[data-test='top-menu']").at(0);

        expect(menuItem.text()).toEqual("Scan");
        expect(menuItem.attributes()['href']).toEqual("/scans");

        menuItem.trigger("click");
        expect(wrapper.vm.$route.path).toEqual("/scans");
    });

    test("render correct MenuItem: `History`", () => {
        const wrapper = createComponent();
        const menuItem = wrapper.findAll("[data-test='top-menu']").at(1);

        expect(menuItem.text()).toEqual("History");
        expect(menuItem.attributes()['href']).toEqual("/history");

        menuItem.trigger("click");
        expect(wrapper.vm.$route.path).toEqual("/history");
    });

    test("render correct MenuItem: `Settings`", async () => {
        const wrapper = createComponent();
        const menuItem = wrapper.findAll("[data-test='top-menu']").at(2);

        expect(menuItem.text()).toEqual("Settings");
        expect(menuItem.attributes()['href']).toEqual("/settings");

        menuItem.trigger("click");
        expect(wrapper.vm.$route.path).toEqual("/settings");
    });
});

// https://github.com/lmiller1990/vuejs-composition-course/blob/1.7-refactoring-with-confidence/src/Timeline.spec.ts