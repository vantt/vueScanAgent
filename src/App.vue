<template>
    <v-app id="app">
        <v-app-bar app>
            <v-btn text @click="$router.push({ name: 'Home'})">Scan</v-btn>
            <v-btn text @click="$router.push({ name: 'History'})">History</v-btn>
            <v-btn text @click="$router.push({ name: 'Settings'})">Settings</v-btn>
        </v-app-bar>
        <!-- Sizes your content based upon application components -->
        <v-content >
            <!-- Provides the application the proper gutter -->
            <v-container  class="fill-height" fluid>
                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-content>
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
