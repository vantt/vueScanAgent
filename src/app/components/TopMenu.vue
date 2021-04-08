<template>
  <div data-test="topMenu-component">
    <v-btn data-test="top-menu" text :to="{ name: 'Home'}">Scan</v-btn>
    <v-btn data-test="top-menu" text :to="{ name: 'History'}">History</v-btn>
    <v-btn data-test="top-menu" text :to="{ name: 'Settings', params: {}}">Settings</v-btn>
  </div>
</template>

<script>
export default {
    name: 'TopMenu',
    components: {}
};
</script>

<style></style>
