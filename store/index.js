import { createStore } from 'vuex';
import Api from '../src/util/api.js';

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
        }
    },
    mutations: {
        //will set all api key/token info for onboarding process. 
        // By the time user has been created, their api creds will already be stored in db;
        setApiDetails(state, data) {
            if(state.keys.token !== undefined && state.keys.secret !== undefined) {
                state.keys.token = data.token;
                state.keys.secret = data.secret;
                state.keys.ckey = data.ckey;
                state.csecret = data.csecret;
            }
        }
    },
    actions: {
        // hits /onboard with key info and pings the bricklink api to make sure it works before allowing user registration
        async initUserOnboard({commit}, keys) {
            const whitelist_check = await inst.initOnboard(keys);
            //this just sets the values. Vue has some oddball state stuff but it is convenient so I'm not complaining.
            commit('setApiDetails', keys);
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
        // unfucks the dumbass proxy object that vue is 
        // so inclined to turn everything via mutations into???????

    }
});