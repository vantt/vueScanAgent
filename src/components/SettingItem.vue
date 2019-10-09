<template>

    <v-form ref="form">
        <v-text-field
                v-model="form.code"
                label="Activity Code"
                required
        ></v-text-field>

        <v-text-field
                v-model="form.label"
                label="Label"
                required
        ></v-text-field>

        <v-text-field
                v-model="form.link"
                label="Link"
                required
        ></v-text-field>

        <v-switch v-model="form.autoRescan" :label="`Auto Rescan: ${form.autoRescan}`"></v-switch>

        <v-btn
                color="success"
                class="mr-4"
                @click="performUpdate"
        >
            Save
        </v-btn>

        <v-btn
                color="error"
                class="mr-4"
                @click="performDelete"
        >
            Delete
        </v-btn>

    </v-form>

</template>

<script>
    import {mapGetters} from 'vuex';
    import {FormData} from "../core/FormData";

    export default {
        name: "SettingItem",

        data: () => ({
            form: null,
            actionCode: "",
            actionType: "",
        }),

        beforeRouteUpdate (to, from, next) {
            // just use `this`
            this.actionCode = to.params.code;
            this.actionType = to.params.actionType;
            this.fetchData();
            next()
        },

        beforeMount() {
            this.actionCode = this.$route.params.code;
            this.actionType = this.$route.params.actionType;

            switch (this.actionType) {
                case "delete":
                    this.performDelete();
                    return;
                case "copy":
                    this.performCopy();
                    return;
            }
        },

        mounted() {
            this.form = new FormData(this.currentSetting);
        },

        methods: {
            fetchData () {
                this.form = new FormData(this.currentSetting);
            },

            performDelete() {
                this.$store.commit('removeScanAction', {code: this.actionCode});
                this.$router.push("/settings");
            },

            performCopy() {
                let newCode = 'Copy_' + this.actionCode + '_' + Math.random();

                this.$store.commit('copyScanAction', { code: this.actionCode, newCode: newCode }) ;
                this.$router.push({ name: "SettingItem", params: { code: newCode, actionType: 'edit' } });
            },

            performUpdate() {
                this.$store.commit('updateScanAction', this.form);
                this.$router.push("/settings");
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
