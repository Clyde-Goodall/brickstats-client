<template>
<!-- First thing new users will see. Component is called from /src/router/index.js -->
    <div class="w-full">
        <Top :name="this.$route.name"></Top>
        <!-- <Spacer /> -->
        <Splash />
        <Body width="w-3/4">
            <Onboard />
        </Body>
        <Footer />
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

//components
import Top from '../components/Top.vue';
import Body from '../components/Body.vue';
import Onboard from '../components/Onboard.vue';
import Splash from '../components/Splash.vue';
import Spacer from '../components/Spacer.vue';
import Footer from '../components/Footer.vue';
export default {
    components: { Top, Body, Onboard, Splash, Spacer, Footer },
    created() {
    },
    computed: {
        //refer to mapped function with this.thing i.e. this.isDataAvailable
        ...mapGetters('base', ['isDataAvailable'])
    }
}
</script>