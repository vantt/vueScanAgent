<template>
    <v-container fluid>
        <v-row id="preview-container" justify="center" dense no-gutters v-show="isShowCamera" >
            <v-responsive :aspect-ratio="16/9" align="center">
                <video id="preview"></video>
            </v-responsive>

            <v-bottom-navigation fixed >
                <v-btn text v-if="cameras.length === 0">No cameras found</v-btn>
                <v-btn text v-if="cameras.length">
                    <li v-for="camera in cameras">
                            <span v-if="camera.id == activeCameraId" :title="formatName(camera.name)" class="active">
                                {{ formatName(camera.name) }}
                            </span>
                        <span v-if="camera.id != activeCameraId" :title="formatName(camera.name)">
                                <a @click.stop="selectCamera(camera)">{{ formatName(camera.name) }}</a>
                        </span>
                    </li>
                </v-btn>

                <div class="flex-grow-1"></div>

                <v-btn text>
                    <router-link :to="{ name: 'Home' }">
                        <span>Home</span>
                        <v-icon>mdi-home</v-icon>
                    </router-link>
                </v-btn>
            </v-bottom-navigation>
        </v-row>

        <v-row justify="center" dense no-gutters v-if="isShowContent">
            <v-responsive :aspect-ratio="9/16" max-width="500px">
                <iframe :src="scanUrl" width="100%" height="100%"></iframe>
            </v-responsive>

            <v-bottom-navigation fixed>
                <v-btn text color="green">
                    {{ lastContent }}
                </v-btn>

                <v-btn text @click="activeCamera()">
                    <v-icon>mdi-qrcode</v-icon>
                    <span>Continue</span>
                </v-btn>
            </v-bottom-navigation>
        </v-row>
    </v-container>
</template>

<script>
    import Instascan from "instascan";

    export default {
        name: "ScanScreen",
        data: () => ({
            cameras: [],
            activeCameraId: null,
            scans: [],
            settings: "https://192.168.68.171:8443/admin/qr-check/abc?key=%qrdata%&activityName=checkin&key1=val1&key2=val2",
            isShowCamera: true,
            isShowContent: false,
            lastContent: "",
            modalContent: "",
            scanUrl: "",
            scanner: null,
        }),

        beforeRouteLeave (to, from, next) {
            // stop camera when leaving this route
            this.scanner.stop();
            next();
        },

        beforeMount() {
            if (undefined === this.scanAction) {
                this.$toasted.error("Could not find Action");
                this.$router.back();
            }
        },

        mounted() {
            let self = this;

            self.audio = new Audio(require('@/assets/beep.mp3'));
            self.audio.load();

            self.scanner = new Instascan.Scanner({video: document.getElementById('preview'), scanPeriod: 2});
            self.scanner.addListener('scan', function (content, image) {
                self.audio.play();
                self.showContent(content);
            });

            Instascan.Camera.getCameras().then(function (cameras) {
                if (cameras.length > 0) {
                    self.cameras = cameras;
                    self.selectCamera(cameras[0]);
                } else {
                    console.error('No cameras found.');
                }
            }).catch(function (e) {
                console.error(e);
            });
        },

        methods: {
            formatName: function (name) {
                return name || '(unknown)';
            },

            selectCamera: function (camera) {
                this.activeCameraId = camera.id;
                this.scanner.start(camera);
            },

            activeCamera: function () {
                this.isShowContent = false;
                this.isShowCamera = true;

                this.scanner.start(this.cameras[this.activeCameraId]);
            },

            showContent: function (content) {
                this.scanner.stop();
                this.$store.commit('addHistory', {
                    scanAction: this.scanAction.code,
                    content: content,
                    created: new Date()
                });

                this.lastContent = content;
                this.isShowContent = true;
                this.isShowCamera = false;

                this.scanUrl = this.scanAction.link.replace(/%scanValue%/, encodeURIComponent(content));

                if (true === this.scanAction.autoRescan) {
                    setTimeout(this.activeCamera, 5000);
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
