import axios from 'axios';

export default async function getIp() {
    const output = await axios.get('https://api.ipify.org/?format=json', {
        'Access-Control-Allow-Origin' : '*',
    });
    print(output);
    return output.data.ip;
}