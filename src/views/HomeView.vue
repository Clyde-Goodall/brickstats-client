<template>
<!-- First thing new users will see. Component is called from /src/router/index.js -->
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
    computed: {
        //refer to mapped function with this.thing i.e. this.isDataAvailable
        ...mapGetters(['isDataAvailable'])
    }
}
</script>