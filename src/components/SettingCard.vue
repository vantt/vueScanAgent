<template>
  <div data-test="card-component">
    <v-card data-test="setting-card" class="ma-2 pa-0" style="min-height:230px; width:400px" raised elevation="1">
      <v-card-title data-test="card-title">{{ scanAction.label }}</v-card-title>
      <v-card-subtitle data-test="card-code">[ {{ scanAction.code }} ]</v-card-subtitle>
      <v-card-text data-test="card-link" style="height: 70px">{{ scanAction.link }}</v-card-text>
      <v-card-actions absolute bottom>
        <v-btn data-test="card-edit" class="ma-1" color="blue" outlined
               :to="{ name: 'SettingItem', params: { code: scanAction.code, actionType:'edit' } }">
          <v-icon dark left>mdi-pencil</v-icon>
          Edit
        </v-btn>
        <v-btn data-test="card-copy" class="ma-1" color="green" outlined
               :to="{ name: 'SettingItem', params: { code: scanAction.code, actionType:'copy' } }">
          <v-icon dark left>mdi-content-duplicate</v-icon>
          Copy
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn data-test="card-delete" class="ma-1" color="red" outlined
               :to="{ name: 'SettingItem', params: { code: scanAction.code , actionType:'delete' } }">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import {ScanAction} from "@/domain/model/ScanAction";

export default {
    name: "SettingCard",
    props: {
        scanAction: ScanAction
    }
}
</script>

<style></style>
