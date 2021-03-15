<template>
    <div v-if="isShowCamera">
        <p class="error" v-if="noFrontCamera">
            You don't seem to have a front camera on your device
        </p>

        <p class="error" v-if="noRearCamera">
            You don't seem to have a rear camera on your device
        </p>

        <qrcode-stream :key="_uid" :camera="camera" :track="paintBlueDots" @decode="onDecode" @init="onInit">
            <button @click="switchCamera" class="camera-button">
                <v-icon>mdi-camera-switch</v-icon>
            </button>
            <button @click="fullscreen = !fullscreen" class="fullscreen-button">
                <v-icon>mdi-fullscreen</v-icon>
            </button>
        </qrcode-stream>
    </div>
</template>

<script>
import {QrcodeStream} from 'vue-qrcode-reader'

export default {
    name: "ScanView",
    components: { QrcodeStream },

    data() {
        return {
            result: null,
            error: null,
            camera: 'auto',
            noRearCamera: false,
            noFrontCamera: false,
            isShowCamera: true,
            audio: null,
        }
    },

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
        }
    },

    mounted() {
        this.audio = new Audio(require('@/assets/beep.mp3'));
        this.audio.load();
    },

    methods: {
        onDecode(result) {
            this.result = result;
            this.audio.play();
            this.$emit('onDecode', result);
        },

        async onInit(promise) {
            try {
                await promise
            } catch (error) {
                const triedFrontCamera = this.camera === 'front';
                const triedRearCamera = this.camera === 'rear';

                const cameraMissingError = error.name === 'OverconstrainedError';

                if (triedRearCamera && cameraMissingError) {
                    this.noRearCamera = true;
                }

                if (triedFrontCamera && cameraMissingError) {
                    this.noFrontCamera = true;
                }

                if (error.name === 'NotAllowedError') {
                    this.error = "ERROR: you need to grant camera access permisson"
                } else if (error.name === 'NotFoundError') {
                    this.error = "ERROR: no camera on this device"
                } else if (error.name === 'NotSupportedError') {
                    this.error = "ERROR: secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                    this.error = "ERROR: is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                    this.error = "ERROR: installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = "ERROR: Stream API is not supported in this browser"
                }

                console.error(this.error);
            }
        },

        switchCamera() {
            switch (this.camera) {
            case 'front':
                this.camera = 'front';
                alert('hahah');
                break;
            case 'rear':
                this.camera = 'rear';
                alert('hahahe');
                break;
            }
        },

        turnCameraOn() {
            this.camera = 'auto';
            this.isShowCamera = true;
        },

        turnCameraOff() {
            this.camera = 'off';
            this.isShowCamera = false;
        },

        paintBlueDots(location, ctx) {
            const {
                topLeftFinderPattern,
                topRightFinderPattern,
                bottomLeftFinderPattern
            } = location;

            const pointArray = [
                topLeftFinderPattern,
                topRightFinderPattern,
                bottomLeftFinderPattern
            ];

            ctx.fillStyle = '#007bff';

            pointArray.forEach(({x, y}) => {
                ctx.fillRect(x - 5, y - 5, 10, 10);
            });
        },
    }
}
</script>

<style scoped>
    .error {
        color: red;
        font-weight: bold;
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
    }

    .fullscreen-button {
        background-color: white;
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 1rem;
    }

    .fullscreen-button img {
        width: 2rem;
    }
</style>
