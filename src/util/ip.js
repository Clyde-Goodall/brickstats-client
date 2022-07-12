import axios from 'axios';

export default async function getIp() {
    const output = await axios.get('/ip', {
        'Access-Control-Allow-Origin' : '*',
    });
    return output.data;
}