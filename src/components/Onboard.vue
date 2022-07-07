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
        this.key.value = ''
        this.key.secret = ''
        this.key.ckey = ''
        this.key.csecret = ''
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
    @apply text-6xl font-sans my-4 text-pink-500 font-bold;
}
.add-button {
     @apply outline-none rounded-md bg-pink-400 font-extrabold box-border shadow-md select-none h-12 text-xl text-white;
}

.add-button:active {
    @apply bg-gradient-to-br from-pink-600 to-pink-500;
}

input[type="file"] {
    display:none;
}
</style>
