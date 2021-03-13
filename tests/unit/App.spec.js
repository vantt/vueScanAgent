import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import router from "@/router";
import { createStore } from "@/store";
import { scanActions } from "../data/scanActions";
import App from "@/App";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = createStore(scanActions);
const vuetify = new Vuetify();

const createComponent = () => {
  return mount(App, { store, router, vuetify, localVue });
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

  test("render correct MenuItem: `Scan`", async () => {
    const wrapper = createComponent();
    const menuItem = wrapper.findAll("[data-test='top-menu']").at(0);

    expect(menuItem.text()).toEqual("Scan");
    await menuItem.trigger("click");
    expect(window.location.href).toContain("/scan");
  });

  test("render correct MenuItem: `History`", async () => {
    const wrapper = createComponent();
    const menuItem = wrapper.findAll("[data-test='top-menu']").at(1);

    expect(menuItem.text()).toEqual("History");
    await menuItem.trigger("click");
    expect(window.location.href).toContain("/history");
  });

  test("render correct MenuItem: `Settings`", async () => {
    const wrapper = createComponent();
    const menuItem = wrapper.findAll("[data-test='top-menu']").at(2);

    expect(menuItem.text()).toEqual("Settings");
    await menuItem.trigger("click");
    expect(window.location.href).toContain("/settings");
  });
});

// https://github.com/lmiller1990/vuejs-composition-course/blob/1.7-refactoring-with-confidence/src/Timeline.spec.ts