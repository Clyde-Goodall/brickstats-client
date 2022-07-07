<template>
<!-- First thing new users will see. Component is called from /src/router/index.js -->
    <div class="w-full">
        <Top :name="this.$route.name"></Top>
        <Body width="w-screen" scrollable="true">
            <div class="flex flex-col w-full items-center">
                <input type="password" name="password" v-model="password" placeholder="Password" class="w-1/4" v-if="!submitted"/>
                <label for="password" class="font-extrabold text-pink-400" v-if="err && !submitted">Password incorrect</label>
                <input type="button" @click="pullData" class="add-button w-1/4" value="Submit" v-if="!submitted"/>
                <h1 class="loading-text" v-if="submitted && !ordersAvailable">Loading...</h1>
                <input type="button" @click="getCsv" class="add-button w-1/4 flex uppercase " v-if="ordersAvailable" value="Let's Get This Shit " />
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
    data() {
        return {
            password: null,
            err: false,
            submitted: false,
            csvData: null,
        }
    },
    async created() {
        
    },
    methods: {
        ...mapActions(['getTopSecret']),
        async pullData() {
            if(this.password !== undefined) {
                this.submitted = true;
                const data = await this.getTopSecret({ pass: this.password });
                if(data.error) {
                    this.err = true;
                    this.submitted = false;
                }
            }
        },
        flattenJson(data) {
            const flatten = (obj, prefix = [], current = {}) => {
                if (typeof(obj) === 'object' && obj !== null) {
                    for (const key of Object.keys(obj)) {
                        flatten(obj[key], prefix.concat(key), current)
                    }
                } 
                else {
                    current[prefix.join('.')] = obj;
                }
                    return current;
            }
            let flat = flatten(data);
        return flatten(data);
        },
        getCsv() {
            const orders = this.$store.state.secret.orders;
            let newobj = [];
            let csv;
            if(orders) {
                orders[0] = this.flattenJson(orders[0]);
                const names = Object.getOwnPropertyNames(orders[0]);
                orders.forEach(o => {
                    newobj.push(this.flattenJson(o));
                });
                for(let row = 0; row < newobj.length; row++){
                    let keysAmount = Object.keys(newobj[row]).length
                    let keysCounter = 0
                    // If this is the first row, generate the headings
                    if(row === 0){
                        // Loop each property of the object
                        for(let key in newobj[row]){
                            // This is to not add a comma at the last cell
                            // The '\r\n' adds a new line
                            csv += key + (keysCounter+1 < keysAmount ? ',' : '\r\n' )
                            keysCounter++
                        }
                    }else{
                        for(let key in newobj[row]){
                            csv += newobj[row][key] + (keysCounter+1 < keysAmount ? ',' : '\r\n' )
                            keysCounter++
                        }
                    }
                    keysCounter = 0
                }
                let link = document.createElement('a')
                link.id = 'download-csv'
                link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
                link.setAttribute('download', 'topathemornin.csv');
                document.body.appendChild(link)
                document.querySelector('#download-csv').click()
            }
        }
    },
    computed: {
        ...mapState(['secret']),
        ordersAvailable() {
           return this.$store.state.secret.orders ? true : false;
        },
    }
}
</script>
