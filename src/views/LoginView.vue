<template>
    <div class="w-full">
        <Top :name="this.$route.name"></Top>
        <Body width="w-3/4">
            <Login />
        </Body>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

import Top from '../components/Top.vue';
import Body from '../components/Body.vue';
import Login from '../components/Login.vue';

export default {
    components: {Login, Top, Body},
}
</script>
