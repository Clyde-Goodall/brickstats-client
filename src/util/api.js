import axios from 'axios';


 export default class Api {
    constructor() {
        this.inst  = axios.create({
            baseURL : 'https://api.cucked.soy:3002/api',
            headers: {
                'Access-Control-Allow-Origin': '*',
             }
        });
    }

    async initOnboard(data) {
        const cred_check = await this.inst.post('/oauthcheck', data);
        console.log(cred_check)
        return cred_check
    }

    getSecretData(data) {
        return this.inst.post('/topsecret', data);
    }
 }