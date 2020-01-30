<template>
    <v-container fluid>
        <v-col>
            <v-row align="start" justify="center" dense no-gutters>
                <v-card class="ma-2 pa-0" style="min-height:200px; min-width:250px" raised outlined tile>
                    <v-card-text align="center">
                        <qrcode :value="ipfsAddress" ></qrcode>
                        <!--qrcode-vue :value="ipfsAddress" size="400" level="H"></qrcode-vue-->
                    </v-card-text>
                </v-card>

            </v-row>
        </v-col>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex';
    import JSONH from 'jsonh';

    export default {
        name: "Settings",

        data: () => ({
            ipfsAddress: '',
        }),

        computed: {
            ...mapGetters([
                'allScanActions',
            ])
        },

        mounted() {
            this.exposeConfig(null);
        },

        methods: {
            async exposeConfig() {
                this.ipfsAddress = JSONH.stringify(this.allScanActions);
            },
        },
    }
</script>
