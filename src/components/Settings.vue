<template>
    <v-container fluid>
        <v-col>
            <v-row align="start" justify="center" dense no-gutters>
                <v-card class="ma-2 pa-0" style="min-height:230px; width:400px" raised elevation="1"
                        v-for="action in allScanActions"
                        :key="action.code">
                    <v-card-title>{{ action.label }}</v-card-title>
                    <v-card-subtitle>[ {{ action.code }} ]</v-card-subtitle>
                    <v-card-text style="height: 70px">{{ action.link }}</v-card-text>
                    <v-card-actions absolute bottom>
                        <v-btn class="ma-1" color="blue" outlined
                               :to="{ name: 'SettingItem', params: { code: action.code, actionType:'edit' } }">
                            <v-icon dark left>mdi-pencil</v-icon>
                            Edit
                        </v-btn>
                        <v-btn class="ma-1" color="green" outlined
                               :to="{ name: 'SettingItem', params: { code: action.code, actionType:'copy' } }">
                            <v-icon dark left>mdi-content-duplicate</v-icon>
                            Copy
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-1" color="red" outlined
                               :to="{ name: 'SettingItem', params: { code: action.code , actionType:'delete' } }">
                            <v-icon>mdi-delete</v-icon>
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
                <v-btn :to="{ name: 'SettingCapture', params: {} }"
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

    export default {
        name: "Settings",
        data: () => ({
            randomSeed: Math.random().toString(36).substr(2, 9),
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
                this.$http.get('/config/defaultScanActions.json').then((response) => this.$store.commit('replaceScanActions', response.data));
            }
        }
    }
</script>

<style scoped>

</style>
