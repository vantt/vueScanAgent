<template>
    <v-container fluid>
        <v-col>
            <v-row align="baseline" justify="center">
                <v-card class="ma-3 pa-6" style="min-height:150px; width:300px" raised outlined tile
                        v-for="action in allScanActions"
                        :key="action.code" @click="$router.push({ name: 'Scan', params: { actionCode: action.code } })">

                    <v-card-title>{{ action.label }}</v-card-title>
                    <v-card-text><strong>[{{ action.code }}]</strong> :: {{ action.link }}</v-card-text>
                    <v-card-actions align="right">
                        <v-btn text outlined>
                            <v-icon>mdi-qrcode</v-icon>
                            SCAN
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-row>
        </v-col>

        <v-card-text style="height: 100px; position: relative">
            <v-btn fab absolute bottom right dark color="pink"
                   @click="$router.push({ name: 'SettingItem', params: {code: 'new'} })">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-card-text>
    </v-container>
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
