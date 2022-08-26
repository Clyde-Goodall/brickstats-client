<template>
    <div class="w-full flex flex-row p-10 overflow-auto">
        <div class="flex flex-col w-full h-3/4 min-h-min border-r center px-10  ">
            <h1 class="heading">What is this?</h1>
            <p>
               BrickStats is an API integrator and dashboard for checking your Bricklink account metrics with interactive charts in a user-friendly package. <br> Support for other platforms is <i>coming soon</i>.
            </p>
            <h2 class="heading">Instructions</h2>
            <p>
                Please add <b class="drop-shadow-sm">165.227.220.80</b> to Bricklink's API whitelist.
                This is in <b>heavy beta</b>, so don't expect everything to work super well. 
                You will also need to get your API credentials to make an account.<br><br>
                For Bricklink, this can be found <a href="https://www.bricklink.com/v2/login.page?logFolder=h&logSub=&logInTo=https%3A%2F%2Fwww.bricklink.com%2Fv2%2Fapi%2Fregister_consumer.page" target="_">here</a>.<br>
                This will be used to generate normalized data and provide statistics for sellers.

            </p>
        </div>
        <div class="flex flex-col w-full px-10 h-auto">
            <select name="API Selector" v-model="selected" class="input-col">
                <option v-for="o in getApiSources" :key="o.id" :value="o.name">{{o.name}}</option>
            </select>
            <div v-if="selected == 'BrickLink'" class="w-full p-0 m-0">
                <span class="err-msg animate-bounce transition-all duration-500" v-show="error.is && !fetching">{{ error.msg }}</span>
                <input class="input-col" type="text" name="token" placeholder="Token Value" v-model="key.token" @keyup="fetching = false"/>
                <input class="input-col" type="text" name="secret" placeholder="Token Secret" v-model="key.secret" @keyup="fetching = false"/>
                <input class="input-col" type="text" name="token" placeholder="Consumer Key" v-model="key.consumer_token" @keyup="fetching = false"/>
                <input class="input-col" type="text" name="secret" placeholder="Consumer Secret" v-model="key.consumer_secret" @keyup="fetching = false"/>
            </div>
            <div v-if="selected == 'BrickOwl'" class="w-full p-0 m-0">
                <span class="err-msg animate-bounce transition-all duration-500" v-show="error.is && !fetching">{{ error.msg }}</span>
                <input class="input-col" type="text" name="token" placeholder="Token Value" v-model="key.token" @keyup="fetching = false"/>
            </div>
            <input type="button" class="add-button input-col" @click="triggerOnboard" value="Add" :disabled="fetching && !error.is">

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
                api_name: 'BrickLink',
                type: 0,
                token: '',
                secret: '',
                consumer_token: '',
                consumer_secret: '',
            },
            fetching: false,
            onb: null,
            error: {
                is: false,
                msg: ''
            },
            options: [],
            selected: 'BrickLink'
        }
    },

    async created() {
        await this.getSources();
        for( let i = 0; i < this.api_sources.length; i++) {
            this.options.push({
                'id': i,
                'key': this.api_sources[i].name,
                'name': this.api_sources[i].name,
                'base_url': this.api_sources[i].base_url,
                'fields': this.api_sources[i].fields,
                'type': this.api_sources[i].api_type
            });
        }
        console.log(this.options)
        this.key.token = import.meta.env.VITE_TOKEN_VALUE ? import.meta.env.VITE_TOKEN_VALUE : ''
        this.key.secret = import.meta.env.VITE_TOKEN_SECRET ? import.meta.env.VITE_TOKEN_SECRET : ''
        this.key.consumer_token = import.meta.env.VITE_CONSUMER_KEY ? import.meta.env.VITE_CONSUMER_KEY  : ''
        this.key.consumer_secret = import.meta.env.VITE_CONSUMER_SECRET ? import.meta.env.VITE_CONSUMER_SECRET : ''
    },
    methods: {
        //makes function to test cred validity available
        ...mapActions(['initUserOnboard', 'getSources']),
        async triggerOnboard() {
            this.onb = null
            this.fetching = true
            const opts = this.api_sources[this.selected]
            console.log(opts.api_type)

            const payload = {
                type: opts.api_type,
                api_name: opts.name,
                token: this.key.token,
                secret: this.key.secret,
                consumer_token: this.key.consumer_token,
                consumer_secret: this.key.consumer_secret,
            }
            this.onb = await this.initUserOnboard(payload);
            // console.log(this.onb.data);
            if(this.onb.data == 'bad_connect') {
                // Could not connect
                this.error.is = true
                this.error.msg = 'Unable to verify credentials.';
                this.fetching = false
                // This should only happen if someone is fucking w/ the code
            } else if(this.onb.data == 'invalid_type') {
                this.error.is = true
                this.error.msg = 'Invalid API type >:(';
                this.fetching = false
            } else if(this.onb.data == false || this.onb.data == 'user_none') {
                // works and creds unclaimed
                // console.log('going to register');
                this.$router.push('/register')
            } else if(this.onb.data == true) {
                // works and is claimed
                this.$router.push('/login')
            } else {
                this.fetching = false
                this.onb = null
            }
        }
    },
    computed: {
        ...mapState(['api_sources']),
        getApiSources() {
        return this.api_sources;
        },
    }
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
