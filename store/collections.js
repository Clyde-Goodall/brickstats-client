import { createStore } from 'vuex';
import Api from '../src/util/api.js';
import getIp from '../src/util/ip.js';

const inst = new Api();

// This is for state management inside a single page app. 
// You can use mapActions, mapGetters, or mapState to get or set from these across the whole site.

export const collections = {
    namespaced: true,
    state: {
        collections: [],
        collection_items: []
    },
    mutations: {
        //will set all api key/token info for onboarding process. 
        //by the time user has been created, their api creds will already be stored in db;
        setLocalCollection(state, data) {
            state.keys.token = data.token
            state.keys.secret = data.secret
            state.keys.consumer_token = data.consumer_token
            state.keys.consumer_secret = data.consumer_secret
            state.api_name = data.api_name
        },
        // update either error or local ecopy
        setUpdatedEntry(state, data) {
            if(typeof data.error == 'string') {
                state.api_errors[data.api_name] = data.error
            }
            else { // gay code
                console.log(state.collections)
                if(state.collections.length > 0) {
                    state.collections.forEach(c => {
                        console.log(data.data.tid)
                        //updates changes, but this is likely redundant because of how the changes are already stored in state.api_list
                        if(c.title == data.data.title) {
                            c.new = false
                            c.title = data.data.api_name
                            c.cost = data.data.cost
                            c.weight = data.data.weight
                            c.unit = data.data.unit
                            c.tid = data.data.tid
                        }
                        delete state.api_errors[data.data.name]
                    })
                }
            }
        },
        // add new collection will lead to this, adds to collections
        setProvisional(state, data) {
            state.api_list.push({
                name: data['name'],
                new: true,
                title: data.data.api_name,
                cost: data.data.cost,
                weight: data.data.weight,
                unit: data.data.unit
            })
        },
        // gets rid of entry from api_list
        setRemoval(state, tid) {
            console.log(tid)
            state.collections = state.collections.filter( l => l.tid !== tid)
        },
        // sets/gets items on order entries
        setCollectionItems(state, data) {

        }
    },
    actions: {

        // 
        //  COLLECTIONS CRUD
        //  I should maybe reorder this so it's actually in the order CRUD but I'm lazy :')

        async addProvisionalCollection({commit}, data)  {
            commit('setProvisional', data)
        },
         // the actual add api function
         async addCollection({commit}, data) {
            const res = await inst.submitSingleApi(data)
            commit('setUpdatedEntry', res);
            // should probably unify everything and get rid of returns to suggest proper usage of states
            return res.data
        },
       
        // updates api cred definitions, mainly through SavedApiView
        async updateCollection({commit}, data) {
            const res = await inst.updateApiEntry(data)
            console.log(res)
            commit('setUpdatedEntry', res);
            return res.data
        },
        // adds entry after button press, no api data

        async removeCollection({commit}, tid)  {
            console.log('r2')
            commit('setRemoval', tid)
            await inst.deleteApiEntry({data: tid})
        },


        // COLLECTION ITEM CRUD AND SCAFFOLDING

        buildCollectionScaffolding({commit}, data) {
            commit('setCollectionItems', data)
        }

    },
}