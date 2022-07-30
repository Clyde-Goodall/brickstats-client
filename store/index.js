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
            api_name:  null,
        },
        secret: {
            orders: null,
            inventory: null,
        },
        user: {
            token: null,
            user: null,
            authenticated: false,
        },
        api_list: [],
        api_sources: []
    },
    mutations: {
        //will set all api key/token info for onboarding process. 
        //by the time user has been created, their api creds will already be stored in db;
        setLocalEntry(state, data) {
            state.keys.token = data.token;
            state.keys.secret = data.secret;
            state.keys.ckey = data.consumer_token;
            state.keys.csecret = data.consumer_secret;
            state.api_name = data.api_name
            console.log(data);
        },
        setApiList(state, data){
            state.api_list = data
        },
        setUpdatedApi(state, data) {
            return
        },
        //temporary api pulling for 
        setSecretData(state, data) {
            if(data) {
                state.secret.orders = data.data.data;
            }
        },
        setSources(state, data) {
            if(data) {
                state.api_sources = data;
            }
        }

    },
    actions: {

        // 
        //  USER REGISTRATION/LOGIN/AUTHENTICATION
        //  This should be complete for now barring any bugs
        // 

        // hits /onboard with key info and pings the bricklink api to make sure it works/ks not duplicate before allowing user registration
        async initUserOnboard({commit}, keys) {
            // uses ip to tie creds to an individual pc
            keys.ip = await getIp();
            // console.log(keys);
            const cred_check = await inst.initOnboard(keys);
            // commits it to state so it holds the info during registration. 
            // Will be used to permit access to /register only if keys have value
            // Should still be corroborrated with the ApiEntry in the DB to make sure no one is abusing
            console.log(cred_check);
            if(cred_check.data == false || cred_check.data == 'user_none') {
                commit('setLocalEntry', keys);
            }
            return cred_check;
        },
        async attemptRegister(_, data) {
            // use ip to get api cred entry tied to the computer and update it server-side w/ user info
            data.ip = await getIp();
            const reg = await inst.registerUser(data);
            // console.log(reg);
            if(reg.data.token && reg.data.username){
                $cookies.set('token', reg.data.token);
                $cookies.set('username', reg.data.username);
            }
            return reg;
        },

        async attemptLogin(_, data) {
            data.ip = await getIp();
            const login = await inst.loginUser(data);
            // console.log(login.data.token);
            if(login.data.token && login.data.username) {
                console.log('passed');
                $cookies.set('token', login.data.token);
                $cookies.set('username', login.data.username);
                return login;
            }
            return 'Could not login';
        },

        async checkAuth(_, data) {
            const auth = await inst.getAuth(data);
            // console.log('auth: ' + auth);
            return auth;
        },

        // 
        //  UNSORTED UTILS
        // 

        async getTopSecret({commit}, data) {
            // console.log(data);
            const res = await inst.getSecretData(data);
            commit('setSecretData', res);
            return res.data;
        },

        async getSources({commit}) {
            const res = await inst.getApiSources();
            commit('setSources', res.data);
            return res.data
        },

        async lieApiCheck(_, data) {
            const res = await inst.liveCheck(data)
            return res.data
        },

        // 
        //  API CRUD
        // 

        // fetches current list of apis associated wuth account
        async getApiList({commit}) {
            const res = await inst.getUserApiList({'token': $cookies.get('token')});
            // console.log(res.data)
            commit('setApiList', res.data);
            return res.data
        },
        // updates api cred definitions, mainly through SavedApiView
        async updateSingleApi({commit}, data) {
            const res = await inst.updateApiEntry(data);
            if(res.data.error) {
                return res.data;
            }
            commit('setUpdatedEntry', data);
        },

        async submitNew({commit}, data)  {
            console.log(data);
        }
    },
    getters: {
        //this is what was initially supposed to be a middleware. 
        //tests to see if any data from csv(defunct) is available and will do something if there isn't.
        // currently unused
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