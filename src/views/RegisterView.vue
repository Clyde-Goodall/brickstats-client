<template>
    <div class="w-full">
        <Top :name="this.$route.name"></Top>
        <Body width="w-3/4">
            <Register />
        </Body>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

import Top from '../components/Top.vue';
import Body from '../components/Body.vue';
import Register from '../components/Register.vue';

export default {
    components: {Register, Top, Body},
}
</script>
