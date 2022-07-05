<template>
    <div class="w-full flex flex-column justify-center bg-slate-50">
        <div class="inner-container">
            <Upload></Upload>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Upload from "./Upload.vue";
export default {
    components: { Upload },
    methods: {
        
    },
    computed: {
        ...mapState(['transforms_data']),
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
