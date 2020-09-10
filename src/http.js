import axios from 'axios';
axios.defaults.baseURL = 'https://weather01.market.alicloudapi.com';
axios.interceptors.request.use(request => {
    request.headers.Authorization = 'APPCODE 96751c655d84464ab7c4b91eb647cb03';
    return request
})
axios.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data.showapi_res_body;
    }
    return response
})
export default axios;