<template>
    <v-app id="app">
        <v-app-bar>
            <v-btn text><router-link :to="{ name: 'Home'}"> Home</router-link></v-btn>
            <v-btn text><router-link :to="{ name: 'History' }">History</router-link></v-btn>
            <v-btn text><router-link :to="{ name: 'Settings' }"> Settings</router-link></v-btn>
        </v-app-bar>
        <!-- Sizes your content based upon application components -->
        <v-content>
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
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
