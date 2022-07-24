export default function setCookie(data) {
    for(key in data) {
        $cookies.set(key, data[key], {expires: 7});
    }
}