<template>
    <v-row align="baseline" justify="center" dense no-gutters>
        <v-btn absolute bottom right fab dark color="pink"
               @click="$router.push({ name: 'SettingItem', params: {code: 'new'} })">
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-card class="ma-3 pa-6" style="min-height:150px; width:300px" raised outlined tile
                v-for="action in allScanActions"
                :key="action.code">
            <v-card-title>{{ action.label }}</v-card-title>
            <v-card-text><strong>[{{ action.code }}]</strong> :: {{ action.link }}</v-card-text>
            <v-card-actions justify="space-around">
                <v-btn text outlined color="deep-purple accent-4">
                    <router-link :to="{ name: 'SettingItem', params: { code: action.code } }">
                        <v-icon>mdi-qrcode</v-icon>
                        EDIT
                    </router-link>
                </v-btn>
                <div class="flex-grow-1"></div>
                <v-btn icon>
                    <router-link :to="{ name: 'Home' }">
                        <v-icon>mdi-wrench</v-icon>
                    </router-link>
                </v-btn>
            </v-card-actions>
        </v-card>


    </v-row>
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
