<template>
    <div class="w-full flex flex-row mt-10 justify-center">
        <div class="flex flex-col w-1/2 h-3/4 min-h-min center px-10">
            <h1 class="heading onboard-parallax" data-rellax-speed="-.75">Ok but really, what is this?</h1>
            <p class="onboard-parallax mt-5" data-rellax-speed="-.5">
               BrickStats is an API integrator and dashboard for checking your Bricklink account metrics with interactive charts in a user-friendly package. <br> Support for other platforms is <i>coming soon</i>.
            </p>
            <p class="mt-10 onboard-parallax" data-rellax-speed="-.5">Brickstats currently supports:</p>
            <p class="mt-10 ml-10 onboard-parallax" data-rellax-speed="-.5">
                
                <ul class=" list-disc font-bold">
                    <li v-for="s in this.api_sources">{{s.name}}</li>
                </ul>
            </p>
           
            <button class="add-button mt-10" @click="this.$router.push('/register')">Register</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Rellax from "rellax";

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
    mounted() {
        const onboard = new Rellax('.onboard-parallax', {
            center: true
        })
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
        ...mapActions('base', ['initUserOnboard', 'getSources']),
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
                this.error.is = true
                this.error.msg = 'This API is already in use';
            } else {
                this.fetching = false
                this.onb = null
            }
        }
    },
    computed: {
        ...mapState('base', ['api_sources']),
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
