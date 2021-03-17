<template>
    <v-container fluid data-test="dashboard-component">
        <v-col>
            <v-row align="baseline" justify="center" no-gutters >
                <ScanCard v-for="scanAction in allScanActions" :key="scanAction.code" :scanAction="scanAction" />
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
import ScanCard from "@/components/ScanCard";

export default {
    name: "ScanDashboard",
    components: {ScanCard},
    computed: {
        ...mapGetters([
            'allScanActions',
        ])
    }
}
</script>

<style scoped></style>
