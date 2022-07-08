<template>
    <div class="w-full flex flex-row p-10">
        <div class="flex flex-col w-full h-3/4 min-h-min border-r center px-10 ">
            <h1 class="heading">"What is this thing?"</h1>
            <p>
               BrickStats is a dashboard for checking your Bricklink and similar lego seller platform account metrics with interactive charts in a user-friendly package.
            </p>
            <h2 class="heading">Instructions</h2>
            <p>
                Please add <b>165.227.220.80</b> to Bricklink's API whitelist.
                You will also need to get your API credentials to make an account.<br><br>
                For Bricklink, this can be found <a href="https://www.bricklink.com/v2/login.page?logFolder=h&logSub=&logInTo=https%3A%2F%2Fwww.bricklink.com%2Fv2%2Fapi%2Fregister_consumer.page" target="_">here</a>.<br>
                This will be used to generate statistics and automatically renew order data for your dashboard.<br>

            </p>
        </div>
        <div class="flex flex-col w-full px-10 h-auto">
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
        this.key.value = import.meta.env.VITE_TOKEN_VALUE ? import.meta.env.VITE_TOKEN_VALUE : ''
        this.key.secret = import.meta.env.VITE_TOKEN_SECRET ? import.meta.env.VITE_TOKEN_SECRET : ''
        this.key.ckey = import.meta.env.VITE_CONSUMER_KEY ? import.meta.env.VITE_CONSUMER_KEY  : ''
        this.key.csecret = import.meta.env.VITE_CONSUMER_SECRET ? import.meta.env.VITE_CONSUMER_SECRET : ''
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
p {
    @apply text-xl text-gray-600;
}

input {
    @apply m-5;
}

input[type="text"] {
    @apply text-xl outline-none rounded-md border-4 border-pink-200  h-12 p-4 text-gray-600;
}

.heading {
    @apply font-sans my-4 text-pink-500 font-bold;
}
.add-button {
     @apply outline-none rounded-md bg-pink-400 font-extrabold box-border shadow-md select-none h-12 text-xl text-white;
}

.add-button:active {
    @apply bg-gradient-to-br from-pink-600 to-pink-500;
}

</style>
