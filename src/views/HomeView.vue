<template>
    <div class="w-full">
        <Top :name="this.$route.name"></Top>
        <Body></Body>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

//components
import Top from "../components/Top.vue";
import Body from "../components/Body.vue";
export default {
    components: { Top, Body },
    mounted() {
        // if(this.isDataAvailable) {
        //     this.$router.push('/dashboard');
        // }
    },
    computed: {
        ...mapGetters(['isDataAvailable'])
    }
}
</script>