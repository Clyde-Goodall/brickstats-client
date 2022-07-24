<template>
<!-- To be used as a sub router for the dashboard. ALL menu items go here.
 In the future I might want a dynamic item generation for the sidebar based on permissions and routes but it's overkill so idc yet-->
    <div class="max-w-96 w-auto bg-pink-500 text-white h-full overflow-y-hidden flex-1 -z-10">
        <!-- upper menu -->
        <div class="upper flex-1">
            <a class="opt" name="details" @click="swapView('apis')">
                <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
            </a>
            <a class="opt" name="charts" @click="swapView('charts')">
                <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
            </a>
            <a class="opt" name="details" @click="swapView('details')">
                <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
            </a>
        </div>
        <!-- lower menu -->
        <div class="lower bottom-0">
            <a class="opt" name="preferences" @click="swapView('preferences')">
                <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
            </a>
            <a class="opt" name="details" @click="swapView('logout')">
                <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
            </a>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(['checkAuth']),
        swapView(e) {
            if(e == 'logout') {
                if($cookies.get('token') && $cookies.get('token')) {
                    const auth = this.checkAuth({'token': $cookies.get('token'), 'username': $cookies.get('username')})
                    if(auth != false) {
                        $cookies.remove('token');
                        $cookies.remove('username');
                    }
                }
                this.$router.push({path: '/login'});
                return;
            }
            this.$router.push(`/dashboard/${e}`);
            return;
        }
    }
}
</script>

<style scoped>
 .opt {
   @apply block text-white drop-shadow-sm outline-none no-underline cursor-pointer text-xl p-5 box-border uppercase;
    text-align:left;
 }

 .nav-icon {
    @apply w-8 h-8;
 }
  .opt:hover {
   @apply bg-pink-600;
 }
  .opt:active {
   @apply bg-pink-700;
 }
</style>