import { createStore } from 'vuex'
import {base} from './base.js'
import {collections} from './collections.js'

// remember to pick namespace when using mapState, mapActions, etc
// ...mapState('base', ['thingymabobber'])
export let store = createStore({
    modules: {
        base: base,
        collections: collections
    }
})


