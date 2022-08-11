<template>
    <div class="w-full h-full overflow-scroll mb-24">
        <div class="w-full h-full" v-if="!isLoading">
            <table class="table-fixed">
                <thead>
                    <tr class="border-t border-gray-200">
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
    created() {
    },
    methods: {
        data_sorter() {

            
        },
        is_loading() {
            return this.tableData == undefined
        }
    },
    computed: {
        columns() {
            return Object.keys(this.tableData[0])
        },
        filtered_results() {
            const mapped_data = Object.keys(this.tableData).map(k => {
            return this.tableData[k]
            })

            const from = this.search_params.date.from
            const to = this.search_params.date.to 

            const price_min = this.search_params.price.from
            const price_max = this.search_params.price.to

            const buyer = this.search_params.buyer

            console.log(`from: ${from}, to: ${to}`)
            const filtered_by_date = mapped_data.filter((entry, i, arr) => {
                //  this can be made better but I"m just trying to get it working right now. Probably slow affff
                // filter by from & to
                if(
                    from != '' &&
                    to != ''
                ) {
                    console.log('sorting by both')
                    return entry.order_date >= from && entry.order_date <= to
                }
                // filter by from
                else if(
                    from != '' &&
                    to == '' 
                ) {
                    console.log('sorting by from')
                    return entry.order_date >= from 
                }
                // filter by to
                else if(
                    to != '' &&
                    from == ''
                ) {
                    console.log('sorting by to')
                    return entry.order_date <= to 
                }
                else if(
                    from == '' &&
                    to == ''
                ) {
                    console.log('sorting by neither')
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
                return ((buyer != '') && (buyer != undefined)) ? entry.buyer.includes(buyer) : entry.buyer
            })

            return filtered_by_buyer
        },
    }
}
</script>
<style scoped>

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