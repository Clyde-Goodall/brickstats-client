<template>
    <!-- quick stat overview -->
     <!-- operations -->
    <div class="w-full bg-pink-600 fixed block px-5 z-10">
        <!-- supported API selector
         -->
        <select name="API Selector" v-model="selected" class="w-1/4">
                <option v-for="o in getApiSources" :key="o.id" :value="o.name">{{o.name}}</option>
            </select>
        <input type="button" class="non-submit-button px-6" value="Add Entry" @click="addEntry"/>
    </div>
    <div class="w-full h-24"></div>

    <div class="w-full box-border p-10 flex flex-row flex-wrap ">

        <!-- User API CRUD -->
        <div class="api-crud-card mb-10" v-for="entry in api_list" :key="entry.api_name">
            <form class="card-detail-text" :name="entry.api_name" method="#">
                <h1 class="heading ml-5">{{entry.api_name}}</h1>
                <div class="flex flex-col">
                    <span class="err-msg" v-if="api_errors[entry.api_name]">{{ api_errors[entry.api_name] }}</span>

                    <div v-if="entry['api_name'] == 'BrickLink'" class="w-full p-0 m-0 flex flex-col">
                        <label class="cred-label">Title</label>
                        <input type="text" name="token" placeholder="Entry Title" v-model="entry['title']" @keyup="fetching = false"/>
                        <label class="cred-label">Token</label>
                        <input type="text" name="token" placeholder="Token Value" v-model="entry['token']" @keyup="fetching = false"/>
                        <label class="cred-label">Secret</label>
                        <input type="text" name="secret" placeholder="Token Secret" v-model="entry['secret']" @keyup="fetching = false"/>
                        <label class="cred-label">Consumer Token</label>
                        <input type="text" name="token" placeholder="Consumer Key" v-model="entry['consumer_token']" @keyup="fetching = false"/>
                        <label class="cred-label">Consumer Secret</label>
                        <input type="text" name="secret" placeholder="Consumer Secret" v-model="entry['consumer_secret']" @keyup="fetching = false"/>
                    </div>
                    <div v-if="entry['api_name'] == 'BrickOwl'" class="w-full p-0 m-0 flex flex-col">
                        <label class="cred-label">Title</label>
                        <input type="text" name="token" placeholder="Entry Title" v-model="entry['title']" @keyup="fetching = false"/>
                        <label class="cred-label">Token</label>
                        <input type="text" name="token" placeholder="Token Value" v-model="entry['token']" @keyup="fetching = false"/>
                    </div>
                </div>
                <!-- crud  -->
                <div class="w-full flex justify-between">
                    <input type="button" class="add-button px-4" @click="submitChanges(entry)" value="Save" />
                    <input type="button" class="delete-button px-4" @click="deleteEntry(entry.tid)" value="Delete" />    
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
        }
    },
    methods: {
        ...mapActions([
            'getApiList', 
            'getSources', 
            'addProvisionalEntry', 
            'updateSingleApi', 
            'addSingleApi', 
            'liveApiCheck',
            'removeEntry'
        ]),
        addEntry() {
            if(this.selected) {
                this.addProvisionalEntry({
                    api_name: this.selected,
                    new: true,
                })
            }
        },
        async submitChanges(entry) {
            // console.log(entry)
            console.log(this.api_sources)
            // new entry submission
            if(entry.new == true) {
                if(this.api_sources[entry.api_name].type == entry.type) {
                    console.log('new entry: ' + entry)
                    const payload = {
                        type: this.api_sources[entry.api_name].api_type,
                        tid: entry['tid'],
                        title: entry['title'],
                        token: entry['token'],
                        secret: entry['secret'] ? entry['secret'] : '',
                        consumer_token: entry['consumer_token'] ? entry['consumer_token'] : '',
                        consumer_secret: entry['consumer_secret'] ? entry['consumer_secret'] : '',
                        api_name: entry['api_name']
                    }
                    console.log('adding new: ' + payload)
                    const updated = await this.addSingleApi(payload);
                    if(updated.error) {
                        this.api_errors[updated.api_name].is = true
                        this.api_errors[updated.api_name].msg = updated
                    }
                }
            // not new entry, update instead
            } else {
                console.log('entry tid: ' + entry['tid'])
                const payload = {
                    type: this.api_sources[entry.api_name].api_type,
                    title: entry['title'],
                    tid: entry['tid'],
                    token: entry['token'],
                    secret: entry['secret'],
                    consumer_token: entry['consumer_token'],
                    consumer_secret: entry['consumer_secret'],
                    api_name: entry['api_name']
                }
                console.log('updating existing: ' + payload.type)
                const updated = this.updateSingleApi(payload);
                
                if(updated.error) {
                    this.api_errors[updated.api_name].is = true
                    this.api_errors[updated.api_name].msg = updated
                }

            }
        },
        // either deletes without server call or deletes from db then from client
        deleteEntry(tid) {
            console.log('r1')
            this.removeEntry(tid)
        }
    },
    async created() {
        // fetch user's apis
        await this.getApiList();
        await this.getSources();
    },
    computed: {
        ...mapState(['api_list', 'api_sources', 'api_errors']),
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