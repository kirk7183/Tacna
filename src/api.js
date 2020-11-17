import axios from 'axios';
const API = axios.create({
    baseURL: 'http://031n122.mars1.mars-hosting.com'
});

export default {
    glavna_obavestenja: params => API.get('/TacnaApi/glavni_meni/obavestenja', params),
    provera_privilegija: params => API.post('/TacnaApi/main/provera_privilegija', params)
}