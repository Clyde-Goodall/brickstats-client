<template>
     <!-- quick stat overview -->
    <div class="w-full bg-pink-600 fixed block px-5 z-10">
        <!-- Preferences -->
        <div class="rounded-lg shadow-md min-w-48 w-1/3 max-w-1/2 box-border p-5 bg-white">
            <span class="card-detail-text">uhhh CSV Builder</span>
        </div>
    </div>  
    <!-- itemized -->
    <div class="min-w-auto max-w-full w-4/5 mx-10">
   
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
    name: 'CsvView',
    methods: {
    },
    computed: {
        
    }
}
</script>

<style scoped>
.body-text {
    @apply text-lg text-gray-800 font-sans;
}
.section-title-text {
    @apply text-2xl mt-4
}

.card-title-text {
    @apply text-8xl font-semibold font-sans block drop-shadow-md;
}
.card-detail-text {
    @apply text-sm text-neutral-500 font-sans p-0 m-0;
}
.card3 {
@apply rounded-lg shadow-md min-w-min w-1/3 max-w-fit box-border p-5;
}
</style>