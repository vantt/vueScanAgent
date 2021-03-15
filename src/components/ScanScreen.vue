<template>
    <v-container fluid>
        <v-row id="preview-container" justify="center" dense no-gutters v-show="isShowCamera">
                <ScanView @onDecode="showContent" :showCamera="isShowCamera" />
        </v-row>

        <v-row justify="center" dense no-gutters v-if="isShowContent">
            <v-responsive :aspect-ratio="9/16" max-width="500px">
                <iframe :src="scanUrl" width="100%" height="100%" style="overflow:hidden" scrolling="no"></iframe>
            </v-responsive>

            <v-bottom-navigation fixed>
                <v-btn text color="green">
                    {{ lastContent }}
                </v-btn>

                <v-btn text @click="startScan()">
                    <v-icon>mdi-qrcode</v-icon>
                    <span>Continue</span>
                </v-btn>
            </v-bottom-navigation>
        </v-row>
    </v-container>
</template>

<script>

import ScanView from "./InstascanView";
//import ScanView from "./VueQrcodeReaderView";

export default {
    name: "ScanScreen",
    components: { ScanView },

    data: () => ({
        isShowCamera: true,
        isShowContent: false,
        lastContent: "",
        scanUrl: "",
    }),

    beforeRouteLeave(to, from, next) {
        // stop camera when leaving this route
        this.isShowCamera = false;
        next();
    },

    beforeMount() {
        if (undefined === this.scanAction) {
            this.$toasted.error("Could not find Action");
            this.$router.back();
        }
    },

    methods: {
        startScan: function () {
            this.isShowContent = false;
            this.isShowCamera = true;
        },

        showContent: function (content) {
            this.lastContent = content;
            this.isShowContent = true;
            this.isShowCamera = false;

            this.$store.commit('addHistory', {
                scanAction: this.scanAction.code,
                content: content,
                created: new Date()
            });

            this.scanUrl = this.scanAction.link.replace(/%scanValue%/, encodeURIComponent(content));

            if (true === this.scanAction.autoRescan) {
                setTimeout(this.startScan, 5000);
            }
        }
    },

    computed: {
        scanAction() {
            return this.$store.getters.getScanActionByCode(this.$route.params.actionCode);
        }
    }
}
</script>

<style>

</style>
