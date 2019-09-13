<template>
        <v-row align="start" justify="center">
            <v-card class="ma-3 pa-6" style="min-height:150px; width:300px" raised outlined tile
                    v-for="action in allScanActions"
                    :key="action.code">
                <router-link :to="{ name: 'Scan', params: { actionCode: action.code } }">
                    <v-card-title>{{ action.label }}</v-card-title>
                    <v-card-text><strong>[{{ action.code }}]</strong> :: {{ action.link }}</v-card-text>
                    <v-card-actions align="right">
                        <v-btn text outlined color="deep-purple accent-4">
                                <v-icon>mdi-qrcode</v-icon>
                                SCAN
                        </v-btn>
                    </v-card-actions>
                </router-link>
            </v-card>

            <v-fab-transition>
                <v-btn fab absolute bottom right dark color="pink">
                    <router-link :to="{ name: 'SettingItem', params: {code: 'new'} }">
                        <v-icon>mdi-plus</v-icon>
                    </router-link>
                </v-btn>
            </v-fab-transition>
        </v-row>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Dashboard",
        computed: {
            ...mapGetters([
                'allScanActions',
            ])
        }
    }
</script>

<style scoped>

</style>
