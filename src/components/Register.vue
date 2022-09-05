<template>
    <div class="w-full flex flex-col p-10 justify-center items-center">
        <div class="flex flex-col register">
            <h1 class="heading">Register</h1>
            <p>
                Now that we have your API credentials, please register.
            </p>
            <div cass="flex flex-col px-10 h-auto">
                <form class="flex flex-col" method="#">
                    <span class="err-msg animate-bounce transition-all duration-500" v-show="error.is && !fetching">{{ error.msg }}</span>
                    <input type="username" name="token" placeholder="Username" v-model="user.username" @keyup="fetching = false"/>
                    <input type="email" name="email" placeholder="Email" v-model="user.email" @keyup="fetching = false"/>
                    <input type="email" name="confirm-email" placeholder="Confirm Email" v-model="user.confirm_email" @keyup="fetching = false"/>
                    <input type="password" name="password" placeholder="Password" v-model="user.password" @keyup="fetching = false"/>
                    <input type="password" name="confirm-password" placeholder="Confirm Password" v-model="user.confirm_password" @keyup="fetching = false"/>
                    <input type="button" class="add-button" @click="triggerRegister" value="Register" :disabled="fetching && !error.is" />
                    <input type="button" class="non-submit-button" @click="goToLogin" value="Login" />

                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapGetters } from "vuex";
    
    export default {
        name: 'Register',
        data() {
            return {
                user: {
                    username: 'piss',
                    email: 'piss@gmail.com',
                    confirm_email: 'piss@gmail.com',
                    password: 'pisswad',
                    confirm_password: 'pisswad',
                },
                fetching: false,
                error: {
                    is: false,
                    msg: ''
                }
            }
        },
        mounted() {
            console.log(this.keys);
        },
        computed: {
            ...mapState('base', ['keys'])
        },
        methods: {
            //makes function to test cred validity available
            ...mapActions('base', ['attemptRegister', 'checkAuth']),
            goToLogin() {
                this.$router.push({path: '/login'});
            },  
            async triggerRegister() {
                if(this.user.username && this.user.email && this.user.confirm_email && this.user.password && this.user.confirm_password) {
                    this.onb = null;
                    this.fetching = true;
                    const reg = await this.attemptRegister(this.user);  
                    const auth = await this.checkAuth({'token': $cookies.get('token'), 'username': $cookies.get('username')});
                    if(auth) {
                        this.$router.push({path: '/dashboard'});
                    }
                    // Spits out error above inputs if something is wrong. 
                    // Should be fixed server side and here
                    else if(reg.data.error !== false) {
                        this.fetching = false;
                        this.error.is = true;
                        this.error.msg = reg.data.error;
                    }
                }
                
            }
        },
    }
    </script>
    
    <style scoped>  
    p {
        @apply text-xl text-gray-600;
    }
    .register {
        width: clamp(300px, 40vw, 700px);
    }

    
    .heading {
        @apply font-sans my-4 text-pink-500 font-bold;
    }
    
    </style>
    