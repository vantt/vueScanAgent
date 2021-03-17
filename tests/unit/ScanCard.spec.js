import {mount, createLocalVue} from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import ScanCard from "@/components/ScanCard";

const createComponent = () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const vuetify = new Vuetify();
    const router = new VueRouter({
        routes: [
            {path: "/scan/:actionCode", name: "Scan", component: {render: "-"}}
        ]
    });

    return mount(ScanCard, {
        propsData: {
            scanAction: {
                "code": "test-checkin1",
                "label": "Test Checkin1",
                "link": "https://localhost?key=%scanValue%&activityName=CheckIn&recept=Uyen",
                "autoRescan": true
            },
        },
        router,
        vuetify,
        localVue,
    });
};

describe("ScanCard.vue is a valid component", () => {
    test("is a Vue instance", () => {
        const wrapper = createComponent();
        expect(wrapper.vm).toBeTruthy();
    });

    it("renders Title", async () => {
        const wrapper = createComponent();
        expect(wrapper.find('[data-test="card-title"]').text()).toEqual("Test Checkin1");
    });

    it("renders Scan button", async () => {
        const wrapper = createComponent();
        expect(wrapper.find('[data-test="scan-action"]').text()).toEqual("SCAN");
    });

    it("renders correct Route info", async () => {
        const wrapper = createComponent();
        expect(wrapper.find('[data-test="scan-card"]').attributes()["href"]).toContain("/scan/test-checkin1");
    });

    it("click on Card, goto Scan Page", () => {
        const wrapper = createComponent();

        //let routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push')
        //const routerPushSpy = jest.fn();
        //wrapper.vm.$router.push = routerPushSpy;
        wrapper.find('a').trigger("click");

        //expect(routerPushSpy).toHaveBeenCalledWith({"name": "Scan", "params": {"actionCode": "test-checkin1"}})
        expect(wrapper.vm.$route.path).toEqual("/scan/test-checkin1");
    });

    it("click on Button, goto Scan Page", () => {
        const wrapper = createComponent();

        //let routerPushSpy = jest.spyOn(wrapper.vm.$router, 'push')
        //const routerPushSpy = jest.fn();
        //wrapper.vm.$router.push = routerPushSpy;
        wrapper.find('[data-test="scan-card"]').trigger("click");

        //expect(routerPushSpy).toHaveBeenCalledWith({"name": "Scan", "params": {"actionCode": "test-checkin1"}})
        expect(wrapper.vm.$route.path).toEqual("/scan/test-checkin1");
    });
});