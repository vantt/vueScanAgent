import {mount, createLocalVue} from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import SettingCard from "@/components/SettingCard";
import SettingItem from "@/components/SettingItem";

const mockScanAction = {
    "code": "test-checkin1",
    "label": "Test Checkin1",
    "link": "https://localhost?key=%scanValue%&activityName=CheckIn&recept=Uyen",
    "autoRescan": true
}

const createComponent = () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const vuetify = new Vuetify();
    const router = new VueRouter({
        routes: [
            {path: "/setting/:code/:actionType", name: "SettingItem", component: {render: "-"}}
        ]
    });

    return mount(SettingCard, {
        propsData: {
            scanAction: mockScanAction,
        },
        router,
        vuetify,
        localVue,
    });
};

describe("SettingCard.vue is a valid component", () => {
    test("is a Vue instance", () => {
        const wrapper = createComponent();
        expect(wrapper.vm).toBeTruthy();
    });
});

describe("SettingCard.vue renders Card correctly", () => {

    it("renders Card correctly", async () => {
        const wrapper = createComponent();
        const cardInfo = mockScanAction;
        const card = wrapper.find('[data-test="setting-card"]');

        expect(card.find('[data-test="card-title"]').text()).toEqual(cardInfo.label);
        expect(card.find('[data-test="card-code"]').text()).toEqual('[ '+ cardInfo.code+' ]');
        expect(card.find('[data-test="card-link"]').text()).toEqual(cardInfo.link);
    });

    it("when click on Edit button, go to Edit page", () => {
        const wrapper = createComponent();
        const card = wrapper.find('[data-test="setting-card"]');
        const btn = card.find('[data-test="card-edit"]');

        btn.trigger('click');
        expect(wrapper.vm.$route.path).toEqual("/setting/"+mockScanAction.code+"/edit");
    });

    it("when click on Copy button, go to Copy page", async() => {
        const wrapper = createComponent();
        const card = wrapper.find('[data-test="setting-card"]');
        const btn = card.find('[data-test="card-copy"]');

        btn.trigger('click');
        expect(wrapper.vm.$route.path).toEqual("/setting/"+mockScanAction.code+"/copy");
    });

    it("when click on Delete button, goto delete action", async () => {
        const wrapper = createComponent();
        const card = wrapper.find('[data-test="setting-card"]');
        const btn = card.find('[data-test="card-delete"]');

        btn.trigger('click');
        expect(wrapper.vm.$route.path).toEqual("/setting/"+mockScanAction.code+"/delete")
    });
});