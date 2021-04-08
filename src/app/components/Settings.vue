<template>
  <v-container fluid data-test="settings-component">
    <v-col>
      <v-row align="start" justify="center" dense no-gutters>
        <SettingCard v-for="scanAction in allScanActions"  :key="scanAction.code" :scanAction="scanAction" />
      </v-row>

      <v-speed-dial data-test="speed-dial" absolute bottom right fab dark transition="slide-y-reverse-transition">
        <template v-slot:activator>
          <v-btn fab dark color="pink darken-2">
            <v-icon>mdi-more</v-icon>
          </v-btn>
        </template>

        <v-btn :to="{ name: 'Settings', params: {action: 'reset', randomize: this.randomSeed} }"
               fab
               dark
               small
               color="green"
               data-test="speed-action reset-settings"
        >
          <v-icon>mdi-power-settings</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'SettingExport'}"
               fab
               dark
               small
               color="indigo"
               data-test="speed-action export-settings"
        >
          <v-icon>mdi-cast</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'SettingCapture', params: {} }"
               fab
               dark
               small
               color="indigo"
               data-test="speed-action capture-settings"
        >
          <v-icon>mdi-content-duplicate</v-icon>
        </v-btn>

        <v-btn :to="{ name: 'SettingItem', params: {code: '???', actionType:'new'} }"
               fab
               dark
               small
               color="green"
               data-test="speed-action new-scan"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-col>
  </v-container>
</template>


<script>
import { mapGetters } from "vuex";
import SettingCard from "@/app/components/SettingCard";

export default {
    name: "Settings",
    components: {SettingCard},
    data: () => ({
        randomSeed: Math.random().toString(36).substr(2, 9)
    }),

    computed: {
        ...mapGetters([
            "allScanActions"
        ])
    },

    beforeRouteUpdate(to, from, next) {
        if (to.params.action !== null && to.params.action !== undefined && to.params.action === "reset") {
            this.resetStoreToDefaultScanActions();
        }
        next();
    },

    methods: {
        resetStoreToDefaultScanActions() {
            this.randomSeed = Math.random().toString(36).substr(2, 9);
            this.$store.dispatch('resetDefaultScanActions', {randomSeed: this.randomSeed})
        }
    }
};
</script>

<style scoped>

</style>
