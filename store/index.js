import { createStore } from 'vuex';
import Api from '../src/util/api.js';
import getIp from '../src/util/ip.js';

const inst = new Api();

// This is for state management inside a single page app. 
// You can use mapActions, mapGetters, or mapState to get or set from these across the whole site.

export let store = createStore({
    state: {
        //this will be used to store data output from python analytics. Will be changed massively.
        transforms_data: {
            monthly: {},
            aggregate: {},
        },
        keys: {
            token: null,
            secret: null,
            ckey: null,
            csecret: null,
        },
        secret: {
            orders: null,
            inventory: null,
        },
    },
    mutations: {
        //will set all api key/token info for onboarding process. 
        //by the time user has been created, their api creds will already be stored in db;
        setLocalEntry(state, data) {
            console.log(keys)
            if(state.keys.token !== undefined && state.keys.secret !== undefined) {
                state.keys.token = data.token;
                state.keys.secret = data.secret;
                state.keys.ckey = data.ckey;
                state.keys.csecret = data.csecret;
            }
            console.log(state.keys);
        },
        //temporary api pulling for 
        setSecretData(state, data) {
            if(data) {
                state.secret.orders = data.data.data;
            }
        }
    },
    actions: {
        // hits /onboard with key info and pings the bricklink api to make sure it works/ks not duplicate before allowing user registration
        async initUserOnboard({commit}, keys) {
            keys.ip = await getIp();
            console.log(keys);
            const cred_check = await inst.initOnboard(keys);
            // console.log(cred_check);
            // commits it to state so it holds the info during registration. 
            // Will be used to permit access to /register only if keys have value
            // Should still be corroborrated with the ApiEntry in the DB to make sure no one is abusing
            if(cred_check == true) {
                commit('setLocalEntry', keys);
            }
            return cred_check;
        },
        async getTopSecret({commit}, data) {
            console.log(data);
            const res = await inst.getSecretData(data);
            commit('setSecretData', res);
            return res.data;
        }
    },
    getters: {
        //this is what was initially supposed to be a middleware. 
        //tests to see if any data from csv(defunct) is available and will do something if there isn't.
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
    }
});