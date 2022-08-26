import axios from '../middleware/interceptors.js';
import getIp from './ip.js';

 export default class Api {
    //need cookies for auth headers, jwt token stuff
    constructor() {
        console.log('mode: ' + import.meta.env.VITE_NODE_ENV)
        const base = import.meta.env.VITE_NODE_ENV == 'prod' ? 'https://165.227.220.80:3002/api' : 'https://142.93.74.81:3002/api'
        console.log(base)
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
    
    // gets all API entries in user dicument
    async getApiSources() {
        const res = this.inst.get('/api-sources');
        return res
    }

    // util for api CRUD, but could be useful elsewhere.
    async liveCheck(data) {
        const res = this.inst.post('/api-check', data);
        return res;
    }

    // Triggers after user submits api entry on home page. 
    // This can probably be eventually strreamlined into a general ApiEntry addition and handle the onboarding individually
    async initOnboard(data) {
        const ip = await getIp();
        data['last_ip'] = ip;
        const cred_check = this.inst.post('/oauthcheck', data);
        return cred_check
    }

    // self explanatory. Takes json
    async registerUser(data) {
        const reg = this.inst.post('/register', data);
        // console.log(reg);
        return reg;
    }

    //self explanatory. Takes json
    async loginUser(data) {
        const login = this.inst.post('/login', data);
        // console.log(login);
        return login;
    } 

    // not referenced in store. used for auth midleware in router
    // {'token': token, 'username': username } 
    // Should really move token to authorization header but it doesn't want to play nicely with me
    async getAuth(data) {
        const auth = await this.inst.post('/auth', data);
        console.log('auth: ' + auth.data.auth);
        const tobool = auth.data.auth === 'true' ?  true : false
        // console.log(typeof(tobool))
        return tobool
    }

    // 
    // API Entry CRUD
    // 
    async getUserApiList(data) {
        console.log(this.inst.defaults.headers);
        const list = await this.inst.post('/api-list', data);
        return list.data;
    }
    // adds new
    async submitSingleApi(data) {
        console.log(data);
        const entry = await this.inst.post('/add-source', data)
        return entry.data
    }    
    // updates existing
    async updateApiEntry(data) {
        console.log(data);
        const entry = await this.inst.post('/update-source', data)
        return entry.data
    }
    async deleteApiEntry(data) {
        return await this.inst.post('/delete-source', data)
    }
    async getOrderData(data) {
        console.log(data)
        return await this.inst.post('/get-orders', data)
    }
    async getFreshOrderData() {
        return await this.inst.post('/get-all-raw')
    }
    // for the homies
    async getSecretData(data) {
        return this.inst.post('/topsecret', data)
    }
 }