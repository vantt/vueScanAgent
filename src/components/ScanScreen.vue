<template>
  <v-container fluid>
    <v-row id="preview-container" justify="center" dense no-gutters v-show="isShowCamera">
      <ScanView @onDecode="onDecode" :showCamera="isShowCamera"/>
    </v-row>

    <v-row justify="center" dense no-gutters v-if="isShowContent">
      <v-responsive :aspect-ratio="9/16" max-width="500px">
        <iframe :src="autoLoadUrl" width="100%" height="100%" style="overflow:hidden" scrolling="no"></iframe>
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

<script lang="ts">

import ScanView from "./InstascanView";
import {ScanHistory} from "@/domain/model/ScanHistory.ts";
//import ScanView from "./VueQrcodeReaderView";

export default {
    name: "ScanScreen",
    components: {ScanView},

    data: () => ({
        actionCode: null,
        isShowCamera: true,
        isShowContent: false,
        lastContent: "",
        autoLoadUrl: "",
    }),


    beforeMount() {
        this.actionCode = this.$route.params.actionCode;

        if (undefined === this.scanAction) {
            this.$toasted.error("Could not find Action");
            this.$router.back();
        }
    },

    beforeRouteLeave(to, from, next) {
        // stop camera when leaving this route
        this.hideCamera();
        next();
    },

    methods: {
        startScan: function () {
            this.isShowContent = false;
            this.showCamera();
        },

        onDecode: function (content) {
            this.addScanHistory(content)
            this.hideCamera();
            this.showContent(content);

            if (true === this.scanAction.autoRescan) {
                setTimeout(this.startScan, 5000);
            }
        },

        addScanHistory: function (content) {
            let scanHistory = new ScanHistory(this.scanAction.code, content, new Date());
            this.$store.commit('addHistory', scanHistory);
        },
      
        showCamera: function () {
            this.isShowCamera = true;
        },

        hideCamera: function () {
            this.isShowCamera = false;
        },
      
        showContent: function (content) {
            this.lastContent = content;
            this.isShowContent = true;
            this.autoLoadUrl = this.scanAction.getRealUrl(content);
        },
    },

    computed: {
        scanAction() {
            return this.$store.getters.getScanActionByCode(this.actionCode);
        }
    }
}
</script>

<style></style>
