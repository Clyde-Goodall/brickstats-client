import { createStore } from 'vuex';
import Api from '../src/util/api.js';

const inst = new Api();

export let store = createStore({
    state: {
        transforms_data: {
            monthly: {},
            aggregate: {},
        },
        keys: {
            token: null,
            secret: null,
        }
    },
    mutations: {
        setMonthly(state, data) {
            state.transforms_data.monthly.totals = data.totals;
            state.transforms_data.monthly.names = data.names;
        },
        setApiDetails(state, data) {
            if(state.keys.token !== undefined && state.keys.secret !== undefined) {
                state.keys.token = data.token;
                state.keys.secret = data.secret;
            }
        }
    },
    actions: {
        async uploadFile({commit}, file) {
            const upl = await inst.sendFile(file);
            commit('setMonthly', upl.data);
        },
        async getAggregate({commit}) {
            const agg = await inst.getAgg();
            commit('setAggregate', agg);
        },
        async initUserOnboard({commit}, keys) {
            const whitelist_check = await inst.initOnboard(keys);
            commit('setApiDetails', keys);
        }
    },
    getters: {
        isDataAvailable(state) {
            let d = JSON.parse(JSON.stringify(state.transforms_data));
            let check = true;
            for(let key in d) {
                if(d.hasOwnProperty(key)) {
                    if(d[key] && Object.keys(d[key]).length === 0
                    && Object.getPrototypeOf(d[key]) === Object.prototype) {
                        check = false;
                    }
                }
            }
            return check;
        },
        // unfucks the dumbass proxy object that vue is 
        // so inclined to turn everything via mutations into???????

    }
});