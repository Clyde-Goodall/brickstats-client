<template>
    <div class="w-full h-auto flex flex-row p-10">
        <div class="flex flex-col w-full border-r h-auto p-10 justify-center">
            <h1 class="heading">Instructions</h1>
            <p>
                Please add <b>165.227.220.80</b> to Bricklink's API whitelist.
                This will be used to generate statistics and automatically renew order data for your dashboard.<br>
                Create an account to automically renew data.
            </p>
        </div>
        <div class="flex flex-col w-full p-10">
            <input type="text" name="token" placeholder="Token Value" v-model="key.value"/>
            <input type="text" name="secret" placeholder="Token Secret" v-model="key.secret"/>
            <input type="text" name="token" placeholder="Consumer Key" v-model="key.ckey"/>
            <input type="text" name="secret" placeholder="Consumer Secret" v-model="key.csecret"/>
            <!-- @ binding for event listener. can also be used with keystrokes  -->
            <input type="button" class="add-button" @click="triggerOnboard" value="Add">
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
    data() {
        return {
            // ONLY for 
            key: {
                value: '',
                secret: '',
                ckey: '',
                csecret: '',
            }
        }
    },
    created() {
        this.key.value = import.meta.env.VITE_TOKEN_VALUE;
        this.key.secret = import.meta.env.VITE_TOKEN_SECRET;
        this.key.ckey = import.meta.env.VITE_CONSUMER_KEY;
        this.key.csecret = import.meta.env.VITE_CONSUMER_SECRET;
    },
    methods: {
        //makes function to test cred validity available
        ...mapActions(['initUserOnboard']),
        async triggerOnboard() {
            const onb = await this.initUserOnboard(this.key);
        }
    },
}
</script>

<style scoped>  

</style>
