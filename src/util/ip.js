import axios from 'axios';
// wtf WHY am I getting ip client side when I can just get it server side holy shit dumbass
export default async function getIp() {
    const output = await axios.get('/ip', {
        'Access-Control-Allow-Origin' : '*',
    });
    return output.data;
}