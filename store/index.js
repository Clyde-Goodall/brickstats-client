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
            consumer_token: null,
            consumer_secret: null,
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
        api_sources: [],
        api_errors: {}
    },
    mutations: {
        //will set all api key/token info for onboarding process. 
        //by the time user has been created, their api creds will already be stored in db;
        setLocalEntry(state, data) {
            state.keys.token = data.token
            state.keys.secret = data.secret
            state.keys.consumer_token = data.consumer_token
            state.keys.consumer_secret = data.consumer_secret
            state.api_name = data.api_name
        },
        // set local copy of list
        setApiList(state, data){
            state.api_list = data
        },
        // update either error or local ecopy
        setUpdatedEntry(state, data) {
            if(typeof data.error == 'string') {
                state.api_errors[data.api_name] = data.error
            }
            else { // gay code
                console.log(state.api_list)
                if(state.api_list.length > 0) {
                    state.api_list.forEach(s => {
                        console.log(data.data.tid)
                        //updates changes, but this is likely redundant because of how the changes are already stored in state.api_list
                        if(s.title == data.data.title) {
                            s.token = data.data.token
                            s.new = false
                            s.secret = data.data.secret
                            s.consumer_token = data.data.consumer_token
                            s.consumer_secret = data.data.consumer_secret
                            s.title = data.data.title
                            s.tid = data.data.tid
                        }
                        // console.log(state.api_errors[data.data.api_name])
                        delete state.api_errors[data.data.api_name]
                    })
                }
            }
        },
        // add new entry will lead to this, ads to api_list
        setProvisional(state, data) {
            state.api_list.push({
                api_name: data['api_name'],
                new: true,
                token: '',
                secret: '',
                title: '',
                consumer_token: '',
                consumer_secret: '',
                type: data['type']
            })
        },
        // gets rid of entry from api_list
        setRemoval(state, tid) {
            console.log(tid)
            state.api_list = state.api_list.filter( l => l.tid !== tid)
        },
        // spit out the user's sources that (are most likely) vetted by test in the backend
        setSources(state, data) {
            if(data) {
                state.api_sources = data
            }
        }

    },
    actions: {

        // 
        //  USER REGISTRATION/LOGIN/AUTHENTICATION
        //  This should be more or less complete for now barring any bugs
        // 

        // hits /onboard with key info and pings the bricklink api to make sure it works/ks not duplicate before allowing user registration
        async initUserOnboard({commit}, data) {
            // uses ip to tie creds to an individual pc
            data.ip = await getIp()
            console.log(data);
            const cred_check = await inst.initOnboard(data)
            // commits it to state so it holds the info during registration. 
            // Will be used to permit access to /register only if keys have value
            // Should still be corroborrated with the ApiEntry in the DB to make sure no one is abusing
            console.log(cred_check)
            if(cred_check.data == false || cred_check.data == 'user_none') {
                // console.log('COMMITTING')
                commit('setLocalEntry', data)
            }
            return cred_check;
        },

        async attemptRegister(_, data) {
            // use ip to get api cred entry tied to the computer and update it server-side w/ user info
            data.ip = await getIp();
            const reg = await inst.registerUser(data)
            // console.log(reg)
            if(reg.data.token && reg.data.username){
                $cookies.set('token', reg.data.token)
                $cookies.set('username', reg.data.username)
            }

            return reg;
        },

        async attemptLogin(_, data) {
            data.ip = await getIp();
            const login = await inst.loginUser(data)
            // console.log(login.data.token);
            if(login.data.token && login.data.username) {
                console.log('passed');
                $cookies.set('token', login.data.token)
                $cookies.set('username', login.data.username)
                return login
            }
            return 'Could not login';
        },

        async checkAuth(_, data) {
            const auth = await inst.getAuth(data)
            // console.log('auth: ' + auth);
            return auth;
        },

        // 
        //  UNSORTED UTILS
        // 

        async getTopSecret({commit}, data) {
            // console.log(data);
            const res = await inst.getSecretData(data)
            commit('setSecretData', res);
            return res.data;
        },

        async getSources({commit}) {
            const res = await inst.getApiSources();
            commit('setSources', res.data);
            return res.data
        },

        async liveApiCheck(_, data) {
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
            commit('setApiList', res.data)
            return res.data
        },

        // updates api cred definitions, mainly through SavedApiView
        async updateSingleApi({commit}, data) {
            const res = await inst.updateApiEntry(data)
            console.log(res)
            commit('setUpdatedEntry', res);
            return res.data
        },

        async addSingleApi({commit}, data) {
            const res = await inst.submitSingleApi(data)
            commit('setUpdatedEntry', res);
            return res.data
        },

        // adds entry, no api data
        async addProvisionalEntry({commit}, data)  {
            commit('setProvisional', data)
        },
        // removes api entry if user hasn't actually added anything to it
        // @setRemoval()
        async removeEntry({commit}, tid)  {
            console.log('r2')
            commit('setRemoval', tid)
            await inst.deleteApiEntry({data: tid})
        }
    },
    getters: {
        //this is what was initially supposed to be a middleware. 
        //tests to see if any data from csv(defunct) is available and will do something if there isn't.
        // currently unused
        isDataAvailable(state) {
            let d = JSON.parse(JSON.stringify(state.transforms_data))
            let check = true;
            for(let key in d) {
                if(d.hasOwnProperty(key)) {
                    if(d[key] && Object.keys(d[key]).length === 0
                    && Object.getPrototypeOf(d[key]) === Object.prototype) {
                        check = false;
                    }
                }
            }
            return check
        },
    }
});