<template>
    <v-container fluid>
        <v-col>
            <v-row align="baseline" justify="center" dense no-gutters>
                <v-card class="ma-2 pa-0" style="min-height:150px; width:300px" raised outlined tile
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
            <v-btn absolute bottom right fab dark color="pink"
                   :to="{ name: 'SettingItem', params: {code: '???', actionType:'new'} }">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-col>
    </v-container>
</template>


<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Settings",
        computed: {
            ...mapGetters([
                'allScanActions',
            ])
        }
    }
</script>

<style scoped>

</style>
