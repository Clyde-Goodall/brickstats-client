<template>
    <!-- quick stat overview -->
     <!-- operations -->
    <div class="w-full bg-pink-600 fixed block px-5">
        <!-- supported API selector
         -->
        <select name="API Selector" v-model="selected" class="w-1/4">
                <option v-for="o in getApiSources" :key="o.id" :value="o.name">{{o.name}}</option>
            </select>
        <input type="button" class="non-submit-button px-6" value="Add Entry"/>
    </div>
    <div class="w-full h-24"></div>

    <div class="w-full box-border p-10 flex flex-row flex-wrap ">

        <!-- User API CRUD -->
        <div class="api-crud-card" v-for="entry in api_list" :key="entry._id['$oid']">
            <form class="card-detail-text" :name="entry._id['$oid']" method="#">
                <h1 class="heading ml-5">{{entry.api_name}}</h1>
                <div class="flex flex-col">
                    <div v-if="entry['api_name'] == 'BrickLink'" class="w-full p-0 m-0 flex flex-col">
                        <label class="cred-label" :for="entry.api_name + '-token'">Token</label>
                        <input type="text" name="token" placeholder="Token Value" v-model="entry['token']" @keyup="fetching = false"/>
                        <label class="cred-label" :for="entry.api_name + '-secret'">Secret</label>
                        <input type="text" name="secret" placeholder="Token Secret" v-model="entry['secret']" @keyup="fetching = false"/>
                        <label class="cred-label" :for="entry.api_name + '-cosumer-token'">Consumer Token</label>
                        <input type="text" name="token" placeholder="Consumer Key" v-model="entry['consumer_token']" @keyup="fetching = false"/>
                        <label class="cred-label" :for="entry.api_name + '-consumer-secret'">Consumer Secret</label>
                        <input type="text" name="secret" placeholder="Consumer Secret" v-model="entry['consumer_secret']" @keyup="fetching = false"/>
                    </div>
                    <div v-if="entry['api_name'] == 'BrickOwl'" class="w-full p-0 m-0 flex-flex-col">
                        <label class="cred-label" :for="entry.api_name + '-token'">Token</label>
                        <input type="text" name="token" placeholder="Token Value" v-model="key.token" @keyup="fetching = false"/>
                    </div>
                </div>
                <!-- crud  -->
                <div class="w-full flex justify-between">
                    <input type="button" class="add-button px-4" @click="submitChanges(entry._id['$oid'])" value="Save" />
                    <input type="button" class="delete-button px-4" @click="deleteEntry(entry._id['$oid'])" value="Delete" />    
                </div>
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
            entries: {},
            selected: null,
            error: {
                is: false,
                msg: ''
            },
        }
    },
    methods: {
        ...mapActions(['getApiList', 'getSources', 'submitNew', 'updateSingleApi', 'liveApiCheck']),
        addEntry() {
            if(this.selected) {
                this.submitNew({'selection': this.selected})
            }
        },
        async submitChanges(id) {
            await this.entries.forEach(e => {
                if(e._id['$oid'] == id) {
                    const payload = {
                        type: e['type'],
                        token: e['token'],
                        secret: e['secret'],
                        consumer_token: e['consumer_token'],
                        consumer_secret: e['consumer_secret'],
                        api_name: e['api_name']
                    }
                    console.log(payload)
                    const updated = this.updateSingleApi(payload);
                    if(updated.error) {
                        this.error.is = true
                        this.error.msg = updated
                    }
                }
            });
        },
        deleteEntry(id) {
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
       console.log(this.entries)
        await this.getSources();

    },
    computed: {
        ...mapState(['api_list', 'api_sources']),
        getApiSources() {
        return this.api_sources;
        },
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