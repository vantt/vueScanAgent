<template>
    <v-row data-test="settingItem-component" align="start" justify="center" no-gutters >
        <v-form ref="form">
            <v-text-field
                    v-model="form.code"
                    label="Activity Code"
                    outlined
                    required
                    data-test="field-code"
            ></v-text-field>

            <v-text-field
                    v-model="form.label"
                    label="Label"
                    outlined
                    required
                    data-test="field-label"
            ></v-text-field>

            <v-textarea
                    v-model="form.link"
                    label="Link"
                    outlined
                    required
                    data-test="field-link"
            ></v-textarea>

            <v-switch v-model="form.autoRescan" :label="`Auto Rescan: ${form.autoRescan}`" data-test="field-autorescan"></v-switch>

            <v-btn
                    color="success"
                    class="mr-4"
                    @click="performSave"
                    data-test="btn-save"
            >
                Save
            </v-btn>

            <v-btn
                    color="error"
                    class="mr-4"
                    @click="performDelete"
                    data-test="btn-delete"
            >
                Delete
            </v-btn>
        </v-form>
    </v-row>
</template>

<script>
import {mapGetters} from 'vuex';
import {FormData} from "@/core/FormData";
import {ScanAction} from "@/domain/model/ScanAction.ts";

export default {
    name: "SettingItem",

    data: () => ({
        form: null,
        actionCode: "",
        actionType: "",
    }),

    beforeRouteUpdate(to, from, next) {
        // called when the route that renders this component has changed,
        // but this component is reused in the new route.
        // For example, for a route with dynamic params `/foo/:id`, when we
        // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
        // will be reused, and this hook will be called when that happens.
        // has access to `this` component instance.

        this.actionCode = to.params.code;
        this.actionType = to.params.actionType;
        this.fetchData();
        next()
    },

    beforeMount() {
        // https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
        this.actionCode = this.$route.params.code;
        this.actionType = this.$route.params.actionType;
        this.fetchData();

        switch (this.actionType) {
        case "delete":
            this.performDelete();
            return;

        case "copy":
            this.performCopy();
            return;
        }
    },

    methods: {
        fetchData() {
            this.form = new FormData(this.currentSetting);
        },

        performDelete() {
            this.$store.dispatch('removeScanAction', {code: this.actionCode})
            //this.$store.commit('removeScanAction', {code: this.actionCode});
            this.$router.push("/settings");
        },

        performSave() {
            const payload = new ScanAction(this.form.code, this.form.label, this.form.link, this.form.autoRescan);

            this.$store.dispatch('saveScanAction', payload)
            //this.$store.commit('saveScanAction', this.form);
            this.$router.push("/settings");
        },
      
        performCopy() {
            let newCode = 'Copy_' + this.actionCode + '_' + Math.random();
            this.$store.dispatch('copyScanAction', {code: this.actionCode, newCode: newCode})
            //this.$store.commit('copyScanAction', {code: this.actionCode, newCode: newCode});
            this.$router.push({name: "SettingItem", params: {code: newCode, actionType: 'edit'}});
        },

        
    },

    computed: {
        currentSetting() {
            let action = this.$store.getters.getScanActionByCode(this.actionCode);

            if (undefined === action) {
                action = {code: this.actionCode, label: "", link: "http://"};
            }

            return action;
        },

        ...mapGetters([
            'allScanActions',
        ])
    }
}
</script>

<style scoped>

</style>
