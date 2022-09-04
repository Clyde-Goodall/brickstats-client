<template>
    <!-- quick stat overview -->
     <!-- operations -->
    
    <div class="w-full bg-pink-600 fixed block px-5 z-10">
        <!-- supported API selector
         -->
        <input type="button" class="non-submit-button px-6" value="New Collection" @click="addEntry"/>
    </div>
    <div class="w-full h-24"></div>

    <div class="w-full h-auto box-border p-10 flex flex-row flex-wrap ">
        <TransitionGroup name="in" mode="out-in" appear>
        <!-- shows if user has no collections -->
        <div v-if="collections.length == 0" class="api-crud-card mb-10">
            <h1 class="mb-10">Collections?</h1>
            <p>Hi! </p>
            <p>
                To track the performance of collections of items, 
                create a new collection and fill out a few details. 
            </p>
            <p>
                You can then assign items from orders to these and we'll take care of the rest.
            </p>

        </div>
        <!-- User API CRUD -->
        <div v-else class="api-crud-card mb-10" v-for="coll in collections" :key="coll.name">
            <form class="card-detail-text" :name="coll.name" method="#">
                <div class="flex flex-col">
                    <div class="w-auto p-0 m-0 flex flex-col">
                        <label for="name" class="cred-label">Collection Name</label>
                        <input id="name" v-model="coll.name" type="text"/>
                        <label for="cost" class="cred-label">Initial Cost</label>
                        <input id="cost" v-model="coll.cost" type="text"/>
                        <label for="date" class="cred-label">Date Purchased</label>
                        <div class="flex flex-row">
                            <input id="date" v-model="coll.date" type="date" class="block p-2"/>
                        </div>
                        <div class="flex flex-row">
                            <div class="flex flex-col">
                                <label for="weight" class="cred-label">Weight</label>
                                <input id="weight" v-model="coll.weight" type="text" class="block p-2"/>
                            </div>
                            <div class="flex flex-col">
                                <label for="uit" class="cred-label">Unit</label>
                                <select name="unit" v-model="coll.unit">
                                    <option value="lbs" selected>Pounds</option>
                                    <option value="oz">Ounces</option>
                                    <option value="g">Grams</option>
                                    <option value="kg">Kilograms</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- crud  -->
                <div class="w-full flex justify-between">
                    <input type="button" class="add-button px-4" @click="submitChanges(entry)" value="Save" />
                    <input type="button" class="delete-button px-4" @click="deleteEntry(entry.tid)" value="Delete" />    
                </div>
            </form>
            </div>
        </TransitionGroup>
    </div> 
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
    name: 'SavedApiView',
    data() {
        return {
            unit: 'lb'
        }
    },
    methods: {
        ...mapActions('base',
        [
            'getApiList', 
            'getSources', 
            'addProvisionalEntry', 
            'updateSingleApi', 
            'addSingleApi', 
            'liveApiCheck',
            'removeEntry'
        ]),
        addEntry() {
            this.addProvisionalEntry({
                api_name: this.selected,
                new: true,
            })

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
        ...mapState('collections', ['collections' ]),
        getCollections() {
        return this.collections;
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