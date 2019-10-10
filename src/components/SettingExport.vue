<template>
    <div id="setting-content">
    {{ jsonSettings }}
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "SettingExport",
        computed: {
            jsonSettings() {
                return JSON.stringify(this.allScanActions);
            },

            ...mapGetters([
                'allScanActions',
            ]),
        }
    }
</script>
