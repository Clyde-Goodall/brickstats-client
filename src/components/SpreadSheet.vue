<template>
    <div class=" w-auto h-auto overflow-scroll mb-24 mr-24 ">
        <div class="w-full h-full" v-if="!isLoading">
            <table class="table-fixed">
                <thead>
                    <tr class="border-t">
                        <th v-for="col in columns">
                            {{col}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in filtered_results">
                        <td v-for="property in row">
                        {{ property }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>Loading...</div>
    </div>
</template>

<script>
export default {
    name: 'SpreadSheet',
    props: ['tableData', 'search_params'],
    data() {
        return {
            thing: ''
        }
    },

    methods: {
        is_loading() {
            return this.tableData == undefined
        }
    },
    computed: {
        columns() {
            const cols = Object.keys(this.tableData[0])
            return cols.filter(c => c != 'tid')
        },
        mounted() {
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
                    return found.value ? found.value : false
                }
                return true
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

            const filtered_by_price = filtered_by_date.filter((entry, i, arr) => {
                return entry.base_total >= (price_min != undefined ? price_min : 0) && (
                    price_max ? entry.base_total <= (
                        price_max != undefined ? price_max : 9999999
                        ) : entry.base_total)
            })
            
            const filtered_by_buyer = filtered_by_price.filter((entry, i, arr) => {
                return ((buyer != '') && (buyer != undefined)) ? (entry.buyer.includes(buyer) ): entry
            })

            const final = filtered_by_buyer.map(({tid, ...attrs}) => attrs)
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



</style>