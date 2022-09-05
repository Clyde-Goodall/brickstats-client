import { rewriteDefault } from 'vue/compiler-sfc';
import axios from '../middleware/interceptors.js';

 export default class Api {
    constructor() {
        // console.log('mode: ' + import.meta.env.VITE_NODE_ENV)
        const base = import.meta.env.VITE_NODE_ENV == 'prod' ? import.meta.env.VITE_PROD_ADDR : import.meta.env.VITE_DEV_ADDR
        // console.log(base)
        this.inst  = axios.create({
            baseURL : base,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            transformRequest: [function(data, headers) {
                headers['Authorization'] = 'Bearer ' + $cookies.get('token')
                return data
            }, ...axios.defaults.transformRequest]
        });
    }

    addCollection(data) {
        return this.inst.post('/add-collection', data)
    }

    getCollections() {
        return this.inst.get('/get-collections')
    }

    updateCollection(data) {
        return this.inst.post('/update-collection', data)
    }

    deleteCollection(data) {
        return this.inst.post('/delete-collection', data)
    }

 }