<template>
    <v-container fluid>
        <v-row id="preview-container" justify="center" dense no-gutters v-show="isShowCamera">
            <v-responsive :aspect-ratio="16/9" align="center">
                <video id="preview"></video>
            </v-responsive>

            <v-bottom-navigation fixed>
                <v-btn text v-if="cameras.length === 0">No cameras found</v-btn>
                <v-btn text v-if="cameras.length">
                    <li v-for="camera in cameras">
                            <span v-if="camera.id == activeCameraId" :title="formatName(camera.name)" class="active">
                                {{ formatName(camera.name) }}
                            </span>
                        <span v-if="camera.id != activeCameraId" :title="formatName(camera.name)">
                                <a @click.stop="activeCamera(camera)">{{ formatName(camera.name) }}</a>
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
    import Instascan from "instascan";
    import JSONH from 'jsonh';

    export default {
        name: "SettingCapture",
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

        beforeRouteLeave(to, from, next) {
            // stop camera when leaving this route
            this.scanner.stop();
            next();
        },

        beforeMount() {
            // if (undefined === this.scanAction) {
            //     this.$toasted.error("Could not find Action");
            //     this.$router.back();
            // }
        },

        mounted() {
            let self = this;

            self.axios.get('https://nbubna.github.io/HTML/').then((response) => {
                console.log(response.data);
            });

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
                    self.autoSelectCamera(cameras);
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

            autoSelectCamera: function (cameras) {
                if (cameras.length > 1) {
                    cameras.forEach(camera => {
                        if (camera.name.toLowerCase().indexOf('back') > -1) {
                            this.activeCamera(camera);
                            return;
                        }
                    })
                } else {
                    this.activeCamera(cameras[0]);
                    return;
                }

                this.activeCamera(cameras[0]);
            },

            activeCamera: function (camera) {
                this.activeCameraId = camera.id;
                this.scanner.start(camera);
            },

            startScan: function () {
                this.isShowContent = false;
                this.isShowCamera = true;
                this.scanner.start(this.cameras[this.activeCameraId]);
            },

             showContent: function (content) {
                 const data = JSONH.parse(content);
                 this.$store.commit('replaceScanActions', data);
                 console.log(data);
                 this.$router.push({ name: "Settings", params: { } });
            },
        },

        computed: {
            //
        }
    }
</script>

<style>

</style>
