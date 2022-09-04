<template>
    <div class="detail-container mr-16">
        <div class="w-full text-right">
            <button @click="toggleShown">
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="flex-end w-10 h-10"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
        </div>
        <!-- order details spit out here -->
        <div class="detail-section pb-48">
            <div class="detail-info-section">
                <h1>{{order_details.buyer_username}}'s order</h1>
                <h3 class="text-2xl text-gray-500">{{order_details.order_timestamp}}</h3>
            </div>
            <!-- shipping status container -->
            <div class="detail-info-section shipping-container">
                <div 
                    class="ship-status-card" 
                    :class="{
                        'status-paid': paid(),
                        'status-shipped': shipped(),
                        'status-completed': completed()
                        }"
                >
                    PAID
                </div>
                <div 
                    class="ship-status-card" 
                    :class="
                        {
                            'status-shipped': shipped(),
                            'status-completed': completed()
                        }"
                >
                    SHIPPED
                </div>
                <div 
                    class="ship-status-card" 
                    :class="{
                            'status-completed': completed()
                        }"
                >
                    COMPLETED
                </div>
            </div>
            <!-- collection settings -->
            <div class="w-auto shadow-md border-2 border-gray-300 rounded-lg box-border p-5 flex flex-col">
                <!-- will create a row for which collection and how much each item was, 
                    populated if chages have been made -->
                <!--  -->
                <span v-for="i in [...Array(order_details.order_quantity).keys()]" :key="i" class="flex flex-row">
                    <input id="cost" v-model="i.cost" type="text"/>
                </span>
            </div>
            <!-- shipping breakdown -->
            <div class="subcategory">
                <h2>Shipping</h2>
                <p>
                    <span v-if="order_details.shipping_street_1">
                        {{order_details.shipping_street_1 + ', '}} 
                    </span>
                </p>
                <p>
                    <span v-if="order_details.shipping_street_2">
                        {{order_details.shipping_street_2 + ', '}} 
                    </span>
                </p>
                <p>
                    <span v-if="order_details.shipping_city">
                        {{order_details.shipping_city + ' '}} 
                    </span>
                    <span v-if="order_details.shipping_region">
                        {{order_details.shipping_region + ' '}} 
                    </span>
                    <span v-if="order_details.shipping_postal_code">
                        {{order_details.shipping_postal_code + ' '}} 
                    </span>
                </p>
                <p>
                    <span v-if="order_details.shipping_country_code">
                        {{ country_code(order_details.shipping_country_code) }} 
                    </span>
                </p>
            </div>
            <!-- Pricing information -->
            <!-- should make this portion more dry tbh -->
            <div class="subcategory">
                <h2>Price Breakdown</h2>
                <p
                    class="between"
                    v-if="order_details.order_subtotal"
                >
                    <span >
                        Subtotal: 
                    </span>
                    <span>    
                        ${{parseFloat(order_details.order_subtotal).toFixed(2)}} 
                    </span>
                </p>
                <p
                    class="between"
                    v-if="order_details.shipping_total"
                >
                    <span >
                        Shipping:
                    </span>
                    <span>   
                        ${{parseFloat(order_details.shipping_total).toFixed(2)}} 
                    </span>
                </p>
                <p
                    class="between"
                    v-if="order_details.order_total"
                >
                    <span >
                        Grand Total: 
                    </span>
                    <span>    
                        ${{parseFloat(order_details.order_total).toFixed(2)}} 
                    </span>
                </p>
                <p
                    class="between"
                    v-if="order_details.order_sales_tax"
                >
                    <span >
                        Sales Tax: 
                    </span>
                    <span>
                        ${{parseFloat(order_details.order_sales_tax).toFixed(2)}} 
                    </span>
                </p>
                <p class="between">
                    <span>
                        *Platform Fee:
                    </span>
                    <span v-if="order_details.order_source == 'BrickOwl'">
                        ${{parseFloat(order_details.order_fee).toFixed(2)}}
                    </span>
                    <span v-else-if="platform_fee">
                        {{platform_fee}}
                    </span>
                    <span v-else-if="!platform_fee">
                        <p class="animate-pulse">Loading...</p>
                    </span>

                </p>
                <span class="mt-10" v-if="order_details.order_source == 'BrickLink'">
                    <p style="font-size:9pt;">*Bricklink fee is calculated by orders within a month. The current month will only reflect what orders you have received so far.</p>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import code_to_country from '../util/countries.js';

    export default {
        name: 'Detail View',
        data() {
            return {
                order_info: {
                    show_details: false,
                    details: {}
                },
                platform_fee: null,
            }
        },
        mounted() {
            if(this.order_details.order_source == 'BrickLink') {
                this.avg_bricklink_fee()
            } 
            this.buildCollectionScaffolding(this.order_details)
        },
        computed: {
            ...mapState('base', ['order_details', 'order_data', 'batch_details']),
            ...mapState('collections', ['collections', 'collection_items']),

        },
        methods: {
            ...mapActions('base', ['batchOrderDetails']),
            ...mapActions('collections', ['buildCollectionScaffolding']),
            toggleShown() {
                this.$emit('detail-view-status', false)
                console.log('emitting')
            },
            country_code(code) {
            return code_to_country(code)
            },
            paid() {
                console.log(this.order_details.shipping_status)
                return this.order_details.shipping_status.toLowerCase() == 'paid' ||
                    this.order_details.shipping_status.toLowerCase() == 'payment received'
            },
            shipped() {
                return this.order_details.shipping_status.toLowerCase() == 'shipped' ||
                this.order_details.shipping_status.toLowerCase() == 'shipping'
            },
            completed() {
                return this.order_details.shipping_status.toLowerCase() == 'completed' ||
                    this.order_details.shipping_status.toLowerCase() == 'delivered'
            },
            async avg_bricklink_fee() {

                const start = new Date(this.order_details.billing_timestamp)
                start.setDate(1)
                let fee = 0
                const data = Object.keys(this.order_data).map(k => {
                    return this.order_data[k]
                })
                .filter(d => {
                    const comp = new Date(d.order_date)
                    return comp.getMonth() == start.getMonth() &&
                        comp.getYear() == start.getYear() &&
                        d.source == 'BrickLink'
                })
                .map(d => {
                    return {
                        api_name: d.source,
                        order_id: d.order_id,
                        tid: d.tid
                    }
                })
                console.log(data)

                // limits to BL orders
                // limits to last 60 supposing oe ships 2 orders a day. 
                // Absolutely todo get orders based on timestamp but it's 4am and I'm tired
                await this.batchOrderDetails(data);                
                console.log(this.batch_details)

                // base sum for last 30 BL order totals
                let summed = 0
                let ratios = []
                this.batch_details.forEach(n => {
                    // I only have lists of order data with grand totals
                    // so I'm skiming off a % to try to make a hueristic for subtotal 
                    // Need to find out what the actual ratio usually is on average for subtotal:shipping
                    summed += parseInt(n.order_subtotal)
                })
                // iniital remainder
                const remainder = summed % 500
                
                // anything under 500 is only 3%
                if(summed < 500) {
                    fee = summed * .03
                }
                //  500 < sales < 1000 -> 15 + 2% of remainder
                else if(remainder > 0 && summed < 1000) {
                    fee = 15 + (remainder * .02)
                }
                //  sales > 1000 -> 25 + 1% of remainder
                else {
                    fee = 25 + (remainder * .01)
                }
                // return for just one order. THi swill be the same for each order 
                console.log(`Remainder: ${remainder}\n Total: ${summed}\n Total monthly fee: ${fee}`)
                this.platform_fee = parseFloat((this.order_details.order_subtotal/summed) * fee).toFixed(2)
            }
        }  
    }
</script>

<style>
/* detail view */
.detail-container {
    @apply w-full h-full bg-white flex flex-col items-center p-4;
}

.detail-section {
    @apply w-4/5 mb-24;
}

.detail-info-section {
    @apply my-10;
}

.shipping-container {
    @apply flex justify-center flex-row box-border rounded-full w-auto;
}

/* categories below shipping status */
.subcategory {
    @apply mt-10 w-1/2;
}
.subcategory p {
    @apply text-gray-600
}

.subcategory .between {
    @apply flex justify-between;
}

.subcategory p {
    @apply text-lg;
}

.detail-info-section h1, .subcategory h1 {
    @apply text-6xl font-bold mb-1;
}

.detail-info-section h2, .subcategory h2 {
    @apply text-4xl font-bold mb-3;
}

.disclaimer {
    @apply text-gray-400;
    font-size: 10pt;
}

/* order shipping status */

.ship-status-card {
    @apply flex-1 first-letter:w-48 h-24 box-border 
        p-4 flex justify-center items-center bg-gray-300
        text-white font-black text-2xl relative border-b-8 border-gray-400;
    text-shadow: 0px 1px 1px rgba(0,0,0, .4);
}

.ship-status-card:first-child {
    @apply rounded-l-full rounded-r-sm;
}
.ship-status-card:nth-child(2) {
    @apply mx-1;
}
.ship-status-card:last-child {
    @apply rounded-l-sm rounded-r-full;
}

.status-paid {
    @apply bg-purple-400  border-purple-500 shadow-md;
}

.status-shipped {
    @apply bg-blue-400 border-blue-500 shadow-md;
}

.status-completed {
    @apply bg-green-400 border-green-500 shadow-md;
}
</style>