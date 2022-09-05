<template>
    <!-- login container -->
    <div class="login-container flex items-center w-full">
        <h1 class="heading">Login</h1>
        <div class="flex flex-col w-full px-10 h-auto login">
            <!-- login form. Should probably handle enter key on first input 
                but I'd rather make a util out of it that handles entire forms -->
            <form class="flex flex-col" method="#" @keyup.enter="handleEnter()">
                <span class="err-msg animate-bounce transition-all duration-500" v-show="error.is && !fetching">{{ error.msg }}</span>
                <input type="username" name="user" placeholder="Username" v-model="user.username" @keyup="fetching = false"/>
                <input type="password" name="pass" placeholder="Password" v-model="user.password" @keyup="fetching = false"/>
                <input type="button" class="add-button" @click="triggerLogin" value="Login" :disabled="fetching && !error.is" />
                <input type="button" class="non-submit-button" @click="goToRegister" value="Register" />       
           </form>
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
                    username: '',
                    password: '',
                },
                fetching: false,
                error: {
                    is: false,
                    msg: ''
                }
            }
        },
        computed: {
            ...mapState('base', ['keys'])
        },
        methods: {
            //makes function to test cred validity available
            ...mapActions('base', ['attemptLogin', 'checkAuth']),
            // should be consolidated into triggerLogin
            handleEnter(e) {
                if(this.user.password && this.user.password) {
                    this.triggerLogin()
                }
            },
            goToRegister() {
                this.$router.push({path: '/register'});
            },  
            async triggerLogin(e) {
                console.log('loggin in')
                if(this.user.username && this.user.password) {
                    this.onb = null
                    this.fetching = true
                    const log = await this.attemptLogin(this.user) 
                    if(this.$cookies.get('token') && this.$cookies.get('username')) {
                        const auth = await this.checkAuth({'token': $cookies.get('token'), 'username': $cookies.get('username')})
                        if(auth) {
                            this.$router.push({path: '/dashboard/query'})
                        }
                    } 
                    // show login error
                    if(log.data.error != null) {
                        this.fetching = false
                        this.error.is = true
                        this.error.msg = log.data.error
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

    .heading {
        @apply font-sans my-4 text-pink-500 font-bold;
    }

    .login-container {
        @apply flex flex-col p-10;
    }

    .login {
        width: clamp(300px, 30vw, 700px);
    }
 
    </style>
    