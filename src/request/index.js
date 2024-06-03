import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
console.log('apiUrl', apiUrl)
function request(config) {
    const instance = axios.create({
        // http://42.192.39.253:8085/book/add
        // baseURL: 'http://42.192.39.253:8085',
        baseURL: apiUrl,
        // timeout: 10000
    })

    instance.interceptors.request.use(config => {
        return config
    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        return Promise.reject(err); // reject这个错误信息
    })

    return instance(config)
}

export {
    request
}