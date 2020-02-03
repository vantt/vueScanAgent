<template>
    <v-container fluid>
        <v-row id="preview-container" justify="center" dense no-gutters v-show="isShowCamera">
            <ScanView @onDecode="showContent" :showCamera="isShowCamera" />
        </v-row>
    </v-container>
</template>

<script>

    import ScanView from "./InstascanView";
    import JSONH from 'jsonh';

    export default {
        name: "SettingCapture",

        components: { ScanView },

        data: () => ({
            isShowCamera: true,
        }),

        beforeRouteLeave(to, from, next) {
            // stop camera when leaving this route
            this.isShowCamera = false;
            next();
        },

        methods: {
             showContent: function (content) {
                 this.isShowCamera = false;

                 const data = JSONH.parse(content);
                 this.$store.commit('replaceScanActions', data);

                 setTimeout(this.$router.push({ name: "Settings", params: { } }), 1000);
            },
        },
    }
</script>

<style>

</style>
