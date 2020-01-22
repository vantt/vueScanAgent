<template>
    <v-container fluid>
        <v-col>
            <v-row align="start" justify="center" dense no-gutters>
                <v-card class="ma-2 pa-0" style="min-height:200px; width:250px" raised outlined tile>
                    <v-card-text align="center">
                        <qrcode-vue :value="ipfsAddress" size="200" level="H"></qrcode-vue>
                    </v-card-text>
                    <v-card-actions>
                        <v-form>
                            <v-textarea outlined required v-model="ipfsAddress" label="ipfs Address"
                                        :error-messages="ipfsAddressError"
                                        @change="validateIpfsAddress"
                            />

                            <v-textarea outlined required v-model="dbAddress" label="dbAddress" />

                            <v-text-field outlined required v-model="dbName" label="dbName"/>

                            <v-btn @click="createDb">Sync Create</v-btn>
                            <v-btn @click="openDb">Sync Open</v-btn>
                        </v-form>
                    </v-card-actions>
                </v-card>

            </v-row>
        </v-col>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import QrcodeVue from 'qrcode.vue';
import createOrbitInstance2 from "../core/replicator";

    export default {
        name: "Settings",

        data: () => ({
            ipfsAddress: '',
            ipfsAddressError: '',
            dbName: '',
            dbAddress: '',
        }),

        computed: {
            ...mapGetters([
                'allScanActions',
            ])
        },

        methods: {
            async validateIpfsAddress(ipfsAddress) {
                console.log('validate Ipfs Address');
                const a = await this.$store.dispatch('connectDb', ipfsAddress);
                console.log(a);
            },

            async createDb() {
                console.log('createDb');
                this.dbName =  Math.random().toString(36).substr(2, 9);
                this.dbAddress = await this.$store.dispatch('createDb', this.dbName);
            },

            async openDb() {
                createOrbitInstance2("asdfdasf").then( async (ipfs) => {
                    const file =  await ipfs.cat("/ipfs/" + this.dbAddress);
                    console.log(file.toString('utf8'));
                });

                // console.log('openDb');
                // const a = await this.$store.dispatch('openDb', this.dbAddress);
                // if (a == null) {
                //     console.log('could not open ' +  this.dbAddress);
                // }
            },
            ...mapActions({
                connect: 'connectDb' // map `this.connect()` to `this.$store.dispatch('connect')`
            })
        },

        components: {
            QrcodeVue,
        },
    }
</script>
