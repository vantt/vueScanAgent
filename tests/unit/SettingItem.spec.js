import {mount, createLocalVue} from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import SettingItem from "@/app/components/SettingItem";
import {ScanAction} from "@/domain/model/ScanAction.ts";

const createComponent = () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const vuetify = new Vuetify();
    const router = new VueRouter({
        routes: [
            {
                path: "/settings/:action?/:randomize?",
                name: "Settings",
                component: {render: "-"}
            },
            {
                path: "/setting/:code/:actionType",
                name: "SettingItem",
                component: {render: "-"}
            }
        ]
    });

    return mount(SettingItem, {
        propsData: {
            scanAction: new ScanAction(
                "test-checkin1",
                "Test Checkin1",
                "https://localhost?key=%scanValue%&activityName=CheckIn&recept=Uyen",
                true
            ),
        },
        router,
        vuetify,
        localVue,
    });
};

describe.skip("ScanCard.vue is a valid component", () => {
    test("is a Vue instance", () => {
        const wrapper = createComponent();
        expect(wrapper.vm).toBeTruthy();
    });

    // it("renders Title", async () => {
    //     const wrapper = createComponent();
    //     expect(wrapper.find('[data-test="card-title"]').text()).toEqual("Test Checkin1");
    // });
    //
    // it("renders Scan button", async () => {
    //     const wrapper = createComponent();
    //     expect(wrapper.find('[data-test="scan-action"]').text()).toEqual("SCAN");
    // });
    //
    // it("renders correct Route info", async () => {
    //     const wrapper = createComponent();
    //     expect(wrapper.find('[data-test="scan-card"]').attributes()["href"]).toContain("/scan/test-checkin1");
    // });
    //
    // it("click on Card, goto Scan Page", () => {
    //     const wrapper = createComponent();
    //
    //     //let routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push')
    //     //const routerPushSpy = jest.fn();
    //     //wrapper.vm.$router.push = routerPushSpy;
    //     wrapper.find('a').trigger("click");
    //
    //     //expect(routerPushSpy).toHaveBeenCalledWith({"name": "Scan", "params": {"actionCode": "test-checkin1"}})
    //     expect(wrapper.vm.$route.path).toEqual("/scan/test-checkin1");
    // });
    //
    // it("click on Button, goto Scan Page", () => {
    //     const wrapper = createComponent();
    //
    //     //let routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push')
    //     //const routerPushSpy = jest.fn();
    //     //wrapper.vm.$router.push = routerPushSpy;
    //     wrapper.find('[data-test="scan-card"]').trigger("click");
    //
    //     //expect(routerPushSpy).toHaveBeenCalledWith({"name": "Scan", "params": {"actionCode": "test-checkin1"}})
    //     expect(wrapper.vm.$route.path).toEqual("/scan/test-checkin1");
    // });
});