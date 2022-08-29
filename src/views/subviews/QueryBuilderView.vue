<template>
    <div class="w-full h-full flex flex-row fixed overflow-y-scroll">
        <!-- quick stat overview -->
        <Transition name="in" mode="out-in" appear>

        <div class="w-80 bg-pink-600 h-full box-border z-10 p-5 overflow-y-scroll">
            <!-- query building area -->
            <!-- DATE -->
            <div class="filter-section w-full h-auto">
                <div class="filter">
                    <div class="date-picker">
                        <p class="qb-text ml-2">From</p><input class="ml-5 font-bold text-gray-700" type="date" v-model="search_params.date.from" name="from-date"/>
                    </div>
                </div>
                <div class="filter">
                    <div class="date-picker">
                        <p class="qb-text ml-2">To</p><input class="ml-5 font-bold text-gray-700 h-auto" type="date" v-model="search_params.date.to" name="to-date"/>
                    </div>
                </div>
            </div>
            <!-- PRICE -->
            <div class="filter-section w-full h-auto">
                <div class="filter">
                    <div class="date-picker">
                        <p class="qb-text ml-3">$</p> <input class="font-bold text-gray-700 w-20 ml-2 mr-2" type="number" v-model="search_params.price.from" name="from-date"/>
                        <p class="qb-text ml-2">to</p> <input class="font-bold text-gray-700 h-auto w-20 ml-2" type="number" v-model="search_params.price.to" name="to-date"/>
                    </div>
                </div>
            </div>
            <!-- BUYER -->
             <div class="filter-section w-full h-auto">
                <div class="filter">
                        <p class="qb-text">Buyer</p> <input class="font-bold text-gray-700 w-1/2 h-10 py-0" type="text" v-model="search_params.buyer" name="buyer"/>
                </div>
            </div>
            <!-- SOURCES -->
            <div class="filter-section w-full h-auto">
                <!-- each checkbox will correlate to an object in data that has 
                    its api type pulled from api_sources -->
                <div v-for="entry in api_list" class="filter">
                    <input type="checkbox" :name="entry.title" @change="setIncluded($event, entry.tid)" :value="entry.api_name" checked/> 
                    <span>
                        <p class="text-md font-bold text-gray-700">{{entry.title.length > 0 ? entry.title : 'Untitled Source'}}</p>
                        <p class="text-xs font-light text-500 rounded-md bg-pink-500 box-border px-2 w-fit text-white">{{entry.api_name}}</p>
                    </span>
                </div>
            </div>
            <!-- gives pading to offset top bar -->
            <div class="filter-section w-full pb-48">
                <div class="filter h-full">
                    <div class="flex flex-col w-full">
                        <div class="flex flex-col w-full">
                        <span class="text-sm flex items-center">
                            <input type="checkbox" :disabled="opts[1].value" name="use_original-data" v-model="opts[0].value"/> Use original, unmodified data. (this will be multiple files)
                        </span>
                        <span class="text-sm">
                            <input type="checkbox" name="use_filters" :disabled="opts[0].value" v-model="opts[1].value"/> Use filter parameters
                        </span>
                        <!-- <span class="text-sm">
                            <input type="checkbox" name="" class="mr-1" :disabled="!use_normalized"/>
                        </span>
                        <span class="text-sm">
                            <input type="checkbox" name=""/>
                        </span> -->
                    </div>
                        <input type="button" class="non-submit-button w-full p-0 m-0 text-xl text-gray-500 " @click="triggerCsv()" value="Download as CSV"/>
                    </div>
                </div>
            </div>
        </div>
        </Transition>
        <!-- add correction padding for sidebar size, curently ~13. 
            PLEASE change this to something not hardcoded soon, future me :/ -->
        <div class="flex-1 h-fullw overflow-x-scroll " v-if="loaded"> 
                <SpreadSheet :tableData="order_data" :search_params="search_params"/>
        </div>
        <div v-else class="flex-1 h-full flex items-center justify-center">
            <h1 class="animate-pulse -mt-24 -ml-36 font-bold text-8xl text-gray-800">
                Loading
            </h1>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import SpreadSheet from '../../components/SpreadSheet.vue'
import {getCsv} from '../../util/csv.js'

export default {
    name: 'QueryBuilderView',
    components: {SpreadSheet},
    data() {
        return {
            search_params: {
                date: {
                    from: '',
                    to: '',
                    use_from: false,
                    use_to: false
                },
                price: {
                    from: undefined,
                    to: undefined,
                },
                buyer: '',
                included: [],
                string: ''
            },
            opts: [
                {cat: 'use_original_data', value: false, available: true},
                {cat: 'use_filters', value: false, available: false}
            ],
            tids: [],
            columns: [],
            loaded: false
        }
    },
    async created() {
        await this.getApiList()
        await this.getOrders()
        await this.getSources()

        // builds inclusion object
        this.api_list.forEach(o => {
            this.search_params.included.push({tid: o['tid'], api_name: o['api_name'], value: true})
            this.tids.push(o['tid'])
        })
        this.loaded = true
    },
    methods: {
        ...mapActions(['getApiList', 'getOrders', 'getSources']),
        // sets data source inclusions on checkbox change
        setIncluded(e, tid) {
            this.search_params.included.forEach(i => {
                if(i.tid == tid) {
                    e.target.checked ? i.value = true : i.value = false
                }
            })
        },
        // set csv download options
        setOpts(e, opt) {
            console.log(this.order_data)
            this.opts.forEach(i => {
                if(i[opt] == opt) {
                    e.target.checked ? i.value = true : i.value = false
                }
            })
        },
        // get downloads
        triggerCsv() {
            if(this.opts[0].value == true) {
                console.log('getting original')
                this.order_data.forEach(o => {
                    const download = getCsv(o, this.api_list, null, true)
                })
            } else {
                const download = getCsv(this.order_data, null, 'AllData', false)
            }
        }
    },
    computed: {
        ...mapState(['api_list', 'order_data', 'api_sources', 'table_data']),
    }
}
</script>

<style>
.qb-text {
    @apply font-semibold;
}
</style>