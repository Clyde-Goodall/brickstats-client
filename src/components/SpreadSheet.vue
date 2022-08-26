<template>
    <div class=" w-auto h-auto overflow-scroll mb-24 mr-24 flex items-center">
        <div class="w-full h-full box-border p-5">
            <!-- row item cards -->
            <div 
                class="mb-5 bg-white rounded-xl justify-between box-border shadow-md flex flex-row items-center h-auto flex-wrap" 
                v-for="row in filtered_results"
            >
            
            <div class="flex justify-between w-auto">
                <div class="amount-container">
                    <!-- dollar amount -->
                    <div class="box-border text-3xl rounded-bl-xl">
                        ${{parseFloat(row.total).toFixed(2)}}
                    </div>
                </div>
                <!-- other data (date, id) -->
                <div class="box-border flex items-center flex-row align-top w-auto flex-initial">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        class="item-icon"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                    </svg>
                    <div class="block flex-wrap w-48 text-gray-500">
                        {{row.order_date}} 
                        <!-- Should add a link to the respective site order uri 
                            using source type and api_sources -->
                        <p class="text-gray-500 text-sm font-thin ">{{row.source}}, {{row.order_id}}</p>
                    </div>
                </div>
                <!-- buyers, if exists . Limited by api so 🤷‍♂️ -->
                <div class="box-border p-5 flex items-center flex-row align-top text-gray-500 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="item-icon">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" 
                        />
                    </svg>
                    {{row.buyer ? row.buyer : 'N/A'}}
                </div>

            </div>
         <!-- see more button -->
                <div class="">
                    <button class="non-submit-button w-12 flex items-center justify-center">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                class="w-6 h-6"
                                >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                    </button>

                </div>    
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'SpreadSheet',
    props: ['tableData', 'search_params'],
    data() {
        return {
            thing: ''
        }
    },
    methods: {
        ...mapActions(['storeTableData', 'getSources']),
        is_loading() {
            return this.tableData == undefined
        }
    },
    computed: {
        ...mapState(['api_sources']),
        columns() {
            const cols = Object.keys(this.tableData[0])
            return cols.filter(c => c != 'tid')
        },
        // so far: date, price, buyer name
        filtered_results() {
            const mapped_data = Object.keys(this.tableData).map(k => {
            return this.tableData[k]
            })
            // self explanatory
            const from = this.search_params.date.from
            const to = this.search_params.date.to 
            // subtotal of order
            const price_min = this.search_params.price.from
            const price_max = this.search_params.price.to
            // user that bought
            const buyer = this.search_params.buyer
            // api sources
            const included = this.search_params.included

            const filtered_by_source = mapped_data.filter((entry, i, arr) => {
                if(included != undefined) {
                    const found = included.find(i => i.tid == entry.tid)
                    if(found.value) return entry;
                }
            })

            const filtered_by_date = filtered_by_source.filter((entry, i, arr) => {
                //  this can be made better but I"m just trying to get it working right now. Probably slow affff
                // filter by from & to
                if(
                    from != '' &&
                    to != ''
                ) {
                    return entry.order_date >= from && entry.order_date <= to
                }
                // filter by from
                else if(
                    from != '' &&
                    to == '' 
                ) {
                    return entry.order_date >= from 
                }
                // filter by to
                else if(
                    to != '' &&
                    from == ''
                ) {
                    return entry.order_date <= to 
                }
                else if(
                    from == '' &&
                    to == ''
                ) {
                    return entry
                }
                return entry
            })
            // price filter
            const filtered_by_price = filtered_by_date.filter((entry, i, arr) => {
                return entry.total >= (price_min != undefined ? price_min : 0) && (
                    price_max ? entry.total <= (
                        price_max != undefined ? price_max : 9999999
                        ) : entry.total)
            })
            // user search
            const filtered_by_buyer = filtered_by_price.filter((entry, i, arr) => {
                return ((buyer != '') && (buyer != undefined)) ? (entry.buyer.includes(buyer) ): entry
            })

            const final = filtered_by_buyer.map(({tid, ...attrs}) => attrs)
            this.storeTableData(final)
            return final
        },
    }
}
</script>
<style scoped>
tr:first {
    @apply bg-gray-200
}

tr {
    @apply border-b border-gray-200 text-gray-800 text-lg whitespace-nowrap
}

tr:nth-child(odd) {
    @apply bg-gray-100
}

td {
    min-width: 15vh;
}

td, th {
    @apply border-r border-gray-300 p-2 w-16 overflow-x-scroll
}

.amount-container {
    @apply flex shadow-md rounded-lg m-3 p-3 w-36 text-center bg-green-300 text-green-900 border border-green-500;
}

.item-icon {
    @apply w-12 h-12 mr-2 text-gray-600;
}

.icon-button {
    /*  */
}

</style>