<template>
    <v-app id="app" data-test="app-component">
        <v-app-bar app>
            <v-btn data-test="top-menu" text :to="{ name: 'Home'}">Scan</v-btn>
            <v-btn data-test="top-menu" text :to="{ name: 'History'}">History</v-btn>
            <v-btn data-test="top-menu" text :to="{ name: 'Settings', params: {}}">Settings</v-btn>
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
export default {
    name: 'App',
    components: {},

    data: () => ({
        //
    }),
};
</script>

<style>

</style>
