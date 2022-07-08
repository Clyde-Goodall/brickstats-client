<template>
<!-- this is a container -->
    <div class="w-full h-fit flex justify-center bg-slate-50">
        <div :class="{'inner-container': true, [cWidth]: true, [cScroll]: true}">
            <!-- Put anything you want rendered inside the Body tag wherever you include it in. See: "../views/HomeView.vue" -->
            <slot>
                <!-- Fallback -->
                <div class="w-full flex content-center justify-center items-center">
                    <h1 class="animate-pulse text-4xl font-black uppercase text-gray-500">Loading...</h1>
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
    created() {
        console.log(`width: ${this.width}, scroll status: ${this.scrollable}`);
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
    @apply: w-full h-screen bg-slate-50 flex justify-center ;
}
.inner-container {
    @apply min-h-screen bg-white box-border p-5 mx-24 shadow-lg flex pt-24;
}



</style>
