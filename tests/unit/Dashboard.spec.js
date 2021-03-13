import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import { createStore } from "@/store";
import { scanActions } from "../data/scanActions";
import router from "@/router";
import Dashboard from "@/components/Dashboard";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = createStore(scanActions);
const vuetify = new Vuetify();

const createComponent = () => {
  return mount(Dashboard, {
    store,
    router,
    vuetify,
    localVue
  });
};

describe("Dashboard.vue is a valid component", () => {
  test("is a Vue instance", () => {
    const wrapper = createComponent();
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders an addNew button', () => {
    const wrapper = createComponent();
    expect(wrapper.findAll('[data-test="addNew-btn"]')).toHaveLength(1)
  })

  it('renders 3 scan Cards', () => {
    const wrapper = createComponent();
    expect(wrapper.findAll('[data-test="scan-card"]')).toHaveLength(3)
  })

  it('correctly renders a Card', async () => {
    const wrapper = createComponent();
    const card = wrapper.findAll('[data-test="scan-card"]').at(0);

    expect(card.find('[data-test="card-title"]').text()).toEqual('Test Checkin1')
    expect(card.find('[data-test="card-action"]').text()).toEqual('SCAN')
    expect(card.attributes()["href"]).toContain('/scan/test-checkin1')
  });

  it('click on a Card, goto Scan Page', async () => {
    const wrapper = createComponent();
    const card = wrapper.findAll('[data-test="scan-card"]').at(0);

    await card.trigger('click');

    expect(wrapper.vm.$route.path).toContain("/scan/test-checkin1");
    expect(window.location.href).toContain("/scan/test-checkin1");
  })
});

