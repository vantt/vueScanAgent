<template>
  <v-app id="app" data-test="app-component">
    <v-app-bar app>
      <TopMenu/>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container class="fill-height" fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TopMenu from "@/components/TopMenu";

export default {
    name: 'App',
    components: {TopMenu},
    data: () => ({}),
};
</script>

<style>

</style>
