<template>
  <div data-test="card-component">
    <v-card data-test="scan-card" class="ma-3 pa-6" style="min-height:150px; width:300px" raised outlined tile height="200"
            :ripple="{ class: 'green--text' }"
            :to="{ name: 'Scan', params: { actionCode: scanAction.code } }"
            justify="space-around"
    >
      <v-card-title data-test="card-title">{{ scanAction.label }}</v-card-title>
      <v-spacer></v-spacer>
      <v-card-actions data-test="scan-action" align="right">
        <v-btn text outlined>
          <v-icon>mdi-qrcode</v-icon>
          SCAN
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import {ScanAction} from "@/domain/model/ScanAction";

export default {
    name: "ScanCard",
    props: {
        scanAction: ScanAction,
    }
}
</script>