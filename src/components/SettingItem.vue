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
            form: new FormData(),
        }),

        mounted() {
            this.form = new FormData(this.editingAction)
        },

        methods: {
            performUpdate() {
                this.$store.commit('updateScanAction', {code: this.form.code, label: this.form.label, link: this.form.link});
                this.$router.push("/settings");
            },

            performDelete() {
                this.$store.commit('removeScanAction', {code: this.form.code, label: this.form.label, link: this.form.link});
                this.$router.push("/settings");
            },
        },

        computed: {
            editingAction() {
                let actionCode = this.$route.params.code;
                let action = this.$store.getters.getScanActionByCode(actionCode);

                if (undefined === action) {
                    action = { code: actionCode, label: "", link: "http://"};
                }
                console.log(action);
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
