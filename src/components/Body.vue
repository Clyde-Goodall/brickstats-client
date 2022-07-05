<template>
<!--  This should be reworked for better organization. Don't really need to have this be used for one component tbh -->
    <div class="w-full flex flex-column justify-center bg-slate-50">
        <div class="inner-container">
            <Onboard></Onboard>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Onboard from './Onboard.vue';
export default {
    components: { Onboard },
    methods: {
        
    },
    computed: {
        ...mapGetters(['isDataAvailable'])
    }
}
</script>

<style scoped>
.container {
    @apply: w-full h-screen bg-slate-50 flex justify-center items-center;
}
.inner-container {
    @apply w-3/4 min-h-screen bg-white box-border p-5 mx-24 shadow-lg;
}



</style>
