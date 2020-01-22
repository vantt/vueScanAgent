<template>
    <v-container fluid>
        <v-col>
            <v-row align="start" justify="center" dense no-gutters>
                <v-card class="ma-2 pa-0" style="min-height:200px; width:250px" raised outlined tile>
                    <v-card-text align="center"><qrcode-vue :value="exportAddress" size="145" level="H"></qrcode-vue></v-card-text>
                    <v-card-actions>
                        <v-btn class="ma-1" color="blue" dark
                               :to="{ name: 'SettingCapture', params: { } }">
                            <v-icon dark left>mdi-content-duplicate</v-icon>
                            Capture Settings
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card class="ma-2 pa-0" style="min-height:200px; width:300px" raised outlined tile
                        v-for="action in allScanActions"
                        :key="action.code">
                    <v-card-title>{{ action.label }}</v-card-title>
                    <v-card-text><strong>[{{ action.code }}]</strong> :: {{ action.link }}</v-card-text>
                    <v-card-actions>
                        <v-btn class="ma-1" color="blue" dark
                               :to="{ name: 'SettingItem', params: { code: action.code, actionType:'edit' } }">
                            <v-icon dark left>mdi-pencil</v-icon>
                            Edit
                        </v-btn>
                        <v-btn class="ma-1" color="green" dark
                               :to="{ name: 'SettingItem', params: { code: action.code, actionType:'copy' } }">
                            <v-icon dark left>mdi-checkbox-marked-circle</v-icon>
                            Copy
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-1" color="red" dark
                               :to="{ name: 'SettingItem', params: { code: action.code , actionType:'delete' } }">
                            <v-icon>mdi-cancel</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>

            <v-speed-dial absolute bottom right fab dark transition="slide-y-reverse-transition" >
                <template v-slot:activator>
                    <v-btn  fab dark color="pink darken-2">
                        <v-icon>mdi-more</v-icon>
                    </v-btn>
                </template>

                <v-btn :to="{ name: 'Settings', params: {action: 'reset', randomize: this.randomSeed} }"
                        fab
                        dark
                        small
                        color="green"
                >
                    <v-icon>mdi-power-settings</v-icon>
                </v-btn>
                <v-btn :to="{ name: 'SettingExport'}"
                        fab
                        dark
                        small
                        color="indigo"
                >
                    <v-icon>mdi-cast</v-icon>
                </v-btn>
                <v-btn
                        fab
                        dark
                        small
                        color="indigo"
                >
                    <v-icon>mdi-content-duplicate</v-icon>
                </v-btn>
                <v-btn :to="{ name: 'SettingItem', params: {code: '???', actionType:'new'} }"
                        fab
                        dark
                        small
                        color="green"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-speed-dial>


        </v-col>
    </v-container>
</template>


<script>
    import {mapGetters} from 'vuex';
    import QrcodeVue from 'qrcode.vue';
    export default {
        name: "Settings",
        data: () => ({
            randomSeed: Math.random().toString(36).substr(2, 9),
            exportAddress: 'http://localhost:8080/settings/export',
        }),

        computed: {
            ...mapGetters([
                'allScanActions'
            ])
        },

        beforeRouteUpdate (to, from, next) {
            if (to.params.action !== null && to.params.action !== undefined && to.params.action === 'reset') {
                this.resetDefaultScanActions();
            }
            next();
        },

        methods: {
            resetDefaultScanActions () {
                this.randomSeed = Math.random().toString(36).substr(2, 9);
                this.$http.get(process.env.BASE_URL + '/config/defaultScanActions.json').then((response) => this.$store.commit('replaceScanActions', response.data));
            }
        },

        components: {
            QrcodeVue,
        },
    }
</script>

<style scoped>

</style>
