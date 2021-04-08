<template>
    <div class="video-wrapper">
        <button @click="switchCamera" class="camera-button">
            <v-icon>mdi-camera-switch</v-icon>
            {{ activatedCameraName }}
        </button>
        <button @click="fullscreen = !fullscreen" class="fullscreen-button">
            <v-icon>mdi-fullscreen</v-icon>
        </button>
        <video id="preview" playsinline muted></video>
    </div>
</template>

<script>
import Instascan from "instascan";

export default {
    name: "ScanView",

    data: () => ({
        cameras: [],
        activatedCamera: null,
        activatedCameraId: null,
        activatedCameraIndex: -1,
        activatedCameraName: null,

        lastContent: "",
        isShowCamera: true,

        scanner: null,
        audio: null,
    }),

    props: {
        showCamera: Boolean
    },

    watch: {
        showCamera(isVisible) {
            if (isVisible) {
                this.turnCameraOn()
            } else {
                this.turnCameraOff()
            }

            this.isShowCamera = isVisible;
        }
    },

    mounted() {
        let self = this;
        const isMobile = this.isMobile();

        self.audio = new Audio(require('@/app/assets/beep.mp3'));
        self.audio.load();

        self.scanner = new Instascan.Scanner({
            video: document.getElementById('preview'),
            mirror: !isMobile,
            scanPeriod: 1,
        });

        self.scanner.addListener('scan', (content, image) => {
            self.onDecode(content, image);
        });

        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                self.cameras = cameras;
                self.autoSelectCamera();
            } else {
                console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });
    },

    methods: {
        onDecode: function (content) {
            this.content = content;
            this.audio.play();
            this.$emit('onDecode', content);
        },

        switchCamera() {
            let activatingCamera = this.activatedCameraIndex;

            if (activatingCamera === (this.cameras.length - 1)) {
                activatingCamera = 0;
            } else {
                activatingCamera += 1;
            }

            this.activateCamera(activatingCamera);
        },

        autoSelectCamera: function () {
            if (this.cameras.length > 1) {
                this.cameras.forEach((camera, index) => {
                    if (camera.name.toLowerCase().indexOf('back') > -1) {
                        this.activateCamera(index);
                        return;
                    }
                })
            } else {
                this.activateCamera(0);
                return;
            }

            this.activateCamera(0);
        },

        activateCamera: function (index) {
            this.activatedCamera = this.cameras[index];
            this.activatedCameraIndex = index;
            this.activatedCameraId = this.activatedCamera.id;
            this.activatedCameraName = this.activatedCamera.name;

            this.turnCameraOn();
        },

        turnCameraOn() {
            this.scanner.start(this.activatedCamera);
            this.isShowCamera = true;
        },

        turnCameraOff() {
            this.scanner.stop();
            this.isShowCamera = false;
        },

        isMobile() {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        }
    },
}
</script>

<style scoped>
    .video-wrapper {
        position: relative;
        display: inline-block;
    }

    .fullscreen {
        position: fixed;
        z-index: 1000;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .camera-button {
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 1000;
    }

    .fullscreen-button {
        background-color: white;
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 1rem;
        z-index: 1000;
    }

    .fullscreen-button img {
        width: 2rem;
    }
</style>
