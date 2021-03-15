<template>
    <v-row align="start" justify="center">
        <v-card class="ma-3 pa-6" style="min-height:150px; width:300px" raised outlined tile
                v-for="(scan, index_key) in allScanHistories" :key="index_key">

            <v-card-title>{{ scan.content }}</v-card-title>
            <v-card-text>{{ scan.created }}</v-card-text>
            <v-card-text><strong>{{ scan.scanAction }}</strong></v-card-text>

        </v-card>
    </v-row>
</template>


<script>
import {mapGetters} from 'vuex';

export default {
    name: "ScanHistory",
    computed: {
        ...mapGetters([
            'allScanHistories',
        ])
    }
}
</script>

<style scoped>

</style>
