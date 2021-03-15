<template>
    <v-container fluid data-test="dashboard-component">
        <v-col>
            <v-row align="baseline" justify="center" no-gutters >
                <v-card data-test="scan-card"
                        class="ma-3 pa-6" style="min-height:150px; width:300px" raised outlined tile height="200"
                        v-for="action in allScanActions"
                        :key="action.code"
                        :ripple="{ class: 'green--text' }"
                        :to="{ name: 'Scan', params: { actionCode: action.code } }"
                        justify="space-around"
                >
                    <v-card-title data-test="card-title">{{ action.label }}</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-actions data-test="scan-action" align="right" >
                        <v-btn text outlined>
                            <v-icon>mdi-qrcode</v-icon>
                            SCAN
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-row>
            <v-card-text style="height: 100px; position: relative" >
                <v-btn fab absolute bottom right dark color="pink"
                       @click="$router.push({ name: 'SettingItem', params: {code: 'new'} })"
                       data-test="addNew-btn"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-card-text>
        </v-col>
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
