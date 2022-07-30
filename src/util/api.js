import axios from '../middleware/interceptors.js';
import getIp from './ip.js';

 export default class Api {
    //need cookies for auth headers, jwt token stuff
    constructor() {
        this.inst  = axios.create({
            baseURL : 'https://api.cucked.soy:3002/api',
            headers: {
                'Authorization': 'Bearer ' + $cookies.get('token'),
                'Access-Control-Allow-Origin': '*',
            }
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
    // Should really move token ito authorization header but it doesn't want to play nicely with me
    async getAuth(data) {
        const auth = await this.inst.post('/auth', data);
        // console.log('auth: ' + auth.data.auth);
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

    async updateApiEntry(data) {
        console.log(data);
        const entry = await this.inst.post('/update-source', data)
        return entry.data
    }

    // for the homies
    async getSecretData(data) {
        return this.inst.post('/topsecret', data);
    }
 }