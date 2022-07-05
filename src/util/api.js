import axios from 'Axios';

// api is getting its URL from vite.config.js proxy settings, originally to avoid CORS bullshit 

 export default class Api {
    constructor() {
        this.inst  = axios.create({
            baseURL : '/api',
            headers: {
                'Access-Control-Allow-Origin': '*',
             }
        });
    }
    sendFile(data) {
        let formData = new FormData()
        formData.append("csv", data);
        const ob = this.inst.post('/csv', formData);
        return ob;
    }
    getAgg() {
        const agg = this.inst.get('/aggregate');
    }
    initOnboard(data) {
        console.log(data);
        const onboard = this.inst.post('/onboard', data);
    }
 }