<template>
<!-- this is a container -->
    <div class="w-full flex flex-column justify-center bg-slate-50">
        <div :class="{'inner-container': true, [cWidth]: true, [cScroll]: true}">
            <!-- Put anything you want rendered inside the Body tag wherever you include it in. See: "../views/HomeView.vue" -->
            <slot>
                <!-- Fallback -->
                <div class="w-full h-full flex content-center justify-center items-center">
                    Loading
                    <svg class="animate-spin h-10 w-10 mr-3 text-gray-400" viewBox="0 0 24 24"></svg>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: ['width, scrollable'],
    data() {
        return {
            cWidth: 'w-3/4',
            cScroll: '',
        }
    },
    mounted() {
        if(this.width) {
            this.cWidth = this.width;
        }
        if(this.scrollable) {
            this.cScroll = this.scrollable ? 'ooverflow-scroll' : '';
        }
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
    @apply min-h-screen bg-white box-border p-5 mx-24 shadow-lg;
}



</style>
