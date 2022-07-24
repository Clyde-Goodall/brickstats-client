<template>
     <!-- quick stat overview -->
    <div class="w-full box-border p-10 flex flex-row flex-wrap ">
        <!-- User API CRUD -->
        <div class="rounded-lg shadow-md min-w-48 w-full max-w-full box-border p-16" v-for="entry in api_list" :key="entry._id['$oid']"  >
            <form class="card-detail-text" :name="entry._id['$oid']" method="#">
                <h1 class="heading ml-5">{{entry.api_name}}</h1>
                <div class="flex flex-col">
                    <label class="cred-label" :for="entry.api_name + '-token'">Token</label>
                    <input class="third-size" type="text" name="token" :value="entry.token" />
                    <label class="cred-label" :for="entry.api_name + '-secret'">Secret</label>
                    <input class="third-size" type="password" name="token" :value="entry.secret" />
                    <label class="cred-label" :for="entry.api_name + '-cosumer-token'">Consumer Token</label>
                    <input class="third-size" type="text" name="token" :value="entry.consumer_token" />
                    <label class="cred-label" :for="entry.api_name + '-consumer-secret'">Consumer Secret</label>
                    <input class="third-size" type="password" name="token" :value="entry.consumer_secret" />
                </div>
                <input type="button" class="add-button px-4" @click="submitChanges(entry._id['$oid'])" value="Save" />
            </form>
            </div>
    </div>  
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
    name: 'SavedApiView',
    data() {
        return {
            entries: {}
        }
    },
    methods: {
        ...mapActions(['getApiList']),
        submitChanges(id) {
            this.entries.forEach(e => {
                if(e._id['$oid'] == id) {
                    console.log('doing the thing');
                    console.log(e)
                    
                }
            });
        }
    },
    async created() {
       this.entries = await this.getApiList();
    },
    computed: {
        ...mapState(['api_list'])
    }
}
</script>

<style scoped>
.body-text {
    @apply text-lg text-gray-800 font-sans;
}
.section-title-text {
    @apply text-2xl mt-4
}

.card-title-text {
    @apply text-8xl font-semibold font-sans block drop-shadow-md;
}
.card-detail-text {
    @apply text-sm text-neutral-500 font-sans p-0 m-0;
}
.cred-label {
    @apply font-thin mx-5 pb-0 relative top-4 text-lg
}
.card3 {
@apply rounded-lg shadow-md min-w-min w-1/3 max-w-fit box-border p-5;
}

.third-resize {
    @apply w-2/3;
}
</style>