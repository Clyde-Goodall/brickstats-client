<template>
<!-- First thing new users will see. Component is called from /src/router/index.js -->
    <div class="w-full">
        <Top :name="this.$route.name"></Top>
        <Body width="w-3/4">
            <Onboard />
        </Body>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

//components
import Top from '../components/Top.vue';
import Body from '../components/Body.vue';
import Onboard from '../components/Onboard.vue';
export default {
    components: { Top, Body, Onboard },
    created() {
        console.log($cookies.get('token'));
    },
    computed: {
        //refer to mapped function with this.thing i.e. this.isDataAvailable
        ...mapGetters('base', ['isDataAvailable'])
    }
}
</script>