import axios from 'axios';

// api is getting its URL from vite.config.js proxy settings, originally to avoid CORS bullshit 

 export default class Api {
    constructor() {
        this.inst  = axios.create({
            baseURL : 'https://api.cucked.soy:3002/api',
            headers: {
                'Access-Control-Allow-Origin': '*',
             }
        });
    }

    initOnboard(data) {
        console.log(import.meta.env.VITE_WHITELIST_IP);
        const onboard = this.inst.post('/oauthtest', data);
        return onboard.data
    }

    getSecretData() {
        return this.inst.post('/topsecret', {pass: 'fuckcops'});
    }
 }