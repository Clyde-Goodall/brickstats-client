<template>
    <div class="w-full h-full bg-gray-200 flex flex-row fixed overflow-y-scroll">
        <!-- quick stat overview -->
        <div class=" w-80 bg-pink-600 h-full box-border z-10 p-5 overflow-y-scroll">
            <!-- query building area -->
            <!-- DATE -->
            <div class="filter-section w-full h-auto">
                <div class="filter">
                    <div class="date-picker">
                        <p class="text-sm">From</p><input class="ml-5 font-bold text-gray-700" type="date" v-model="search_params.date.from" name="from-date"/>
                    </div>
                </div>
                <div class="filter">
                    <div class="date-picker">
                        <p class="text-sm">To</p><input class="ml-5 font-bold text-gray-700 h-auto" type="date" v-model="search_params.date.to" name="to-date"/>
                    </div>
                </div>
            </div>
            <!-- PRICE -->
            <div class="filter-section w-full h-auto">
                <div class="filter">
                    <div class="date-picker">
                        $ <input class="font-bold text-gray-700 w-20" type="number" v-model="search_params.price.from" name="from-date"/>
                        <p class="text-sm">to</p> <input class="font-bold text-gray-700 h-auto w-20" type="number" v-model="search_params.price.to" name="to-date"/>
                    </div>
                </div>
            </div>
            <!-- BUYER -->
             <div class="filter-section w-full h-auto">
                <div class="filter">
                        <p class="text-sm">Buyer</p> <input class="font-bold text-gray-700 w-1/2 h-10 p-0" type="text" v-model="search_params.buyer" name="buyer"/>
                </div>
            </div>
            <!-- SOURCES -->
            <div class="filter-section w-full h-auto">
                <div v-for="entry in api_list" class="filter">
                    <input type="checkbox" :name="entry.title" v-model="search_params.included[entry['tid']]"/> 
                    <span>
                        <p class="text-md font-bold text-gray-700">{{entry.title.length > 0 ? entry.title : 'Untitled Source'}}</p>
                        <p class="text-xs font-light text-500 rounded-md bg-pink-500 box-border px-2 w-fit text-white">{{entry.api_name}}</p>
                    </span>
                </div>
            </div>
            <div class="filter-section w-full h-auto">
                <input type="button" class="non-submit-button w-full p-0 m-0 text-xl text-gray-500 " value="Download as CSV"/>
            </div>
        </div>
        <!-- add correction padding for sidebar size, curently ~13. 
            PLEASE change this to something not hardcoded soon, future me :/ -->
        <div class="flex-1 h-full text-black bg-white overflow-x-scroll " v-if="loaded"> 
                <SpreadSheet :tableData="order_data" :search_params="search_params"/>
        </div>
        <div v-else class="flex-1 w-full h-full flex items-center justify-center">
            <h1 class="animate-pulse -mt-24 -ml-36 font-bold text-8xl text-gray-800">
                Loading
            </h1>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import SpreadSheet from '../../components/SpreadSheet.vue'

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
            tids: [],
            columns: [],
            loaded: false
        }
    },
    async created() {
        await this.getApiList()
        await this.getOrders()
        // console.log(this.api_list)
        this.api_list.forEach(o => {
            this.search_params.included.push({'tid': o['tid'], value: false})
            this.tids.push(o['tid'])
        })
        this.loaded = true
        console.log(this.tids)
    },
    methods: {
        ...mapActions(['getApiList', 'getOrders'])
    },
    computed: {
        ...mapState(['api_list', 'order_data']),
        getColumns() {

        },
        formattedData() {
            // const linked = this.order_data.map(o => {
            //     if()
            // })
        }
    }
}
</script>
<style scoped>
.filter {
    @apply w-full h-16 box-border p-2 bg-white text-lg flex flex-row items-center;
}
.filter-section {
    @apply mb-5
}
.filter-section .filter:only-child {
    @apply rounded-lg;
}
 .filter-section .filter:first-child {
    @apply rounded-t-lg;
}
.filter-section .filter:last-child {
    @apply rounded-b-lg;
}

.date-picker {
    @apply flex items-center justify-between w-full
}
</style>