<template>
<!-- First thing new users will see. Component is called from /src/router/index.js -->
    <div class="w-full">
        <Top :name="this.$route.name"></Top>
        <Body width="w-full" scrollable="true">
            <div class="w-full">
            <table class="table-auto" v-if="getOrderInfo">
                <thead>
                    <tr>
                        <th class="text-sm w-auto" v-for="field in getFieldNames">{{field}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="item in getOrderInfo" :key="item.order_id">
                        <td class=" border-r w-auto" v-for="cat in Object.getOwnPropertyNames(item)"> {{item[cat]}}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </Body>     
       
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

//components
import Top from '../components/Top.vue';
import Body from '../components/Body.vue';
export default {
    components: { Top, Body },
    async created() {
        const data = await this.getTopSecret();
    },

    methods: {
        ...mapActions(['getTopSecret']),
        flattenJson(data) {
            const flatten = (obj, prefix = [], current = {}) => {
                if (typeof(obj) === 'object' && obj !== null) {
                    for (const key of Object.keys(obj)) {
                    flatten(obj[key], prefix.concat(key), current)
                    }
                } else {
                    current[prefix.join('.')] = obj
                }
                return current
                }

                console.log(flatten({
                a: [{
                    b: ["c", "d"]
                }]
            }));
            console.log(flatten([1, [2, [3, 4], 5], 6]));
            return flatten(data);
        },
    },
    computed: {
        ...mapState(['secret']),
        getOrderInfo() {
            let newobj = {};
            const orders = this.$store.state.secret.orders;
            if(orders) {
                orders.forEach(o => {
                    newobj.join(this.flattenJson(o));
                })
            }
           
            return newobj;
        },
        getFieldNames() {
            let newobj = {};
            const orders = this.$store.state.secret.orders;
            newobj = this.flattenJson(orders);
            if(orders) {
                orders[0] = this.flattenJson(orders[0])
            }
            const names = Object.getOwnPropertyNames(newobj[0]);
            console.log(names)
            return names;
        },
    }
}
</script>
