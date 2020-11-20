import axios from 'axios';
const API = axios.create({
    baseURL: 'http://031n122.mars1.mars-hosting.com'
});

export default {
    get_glavna_obavestenja: params => API.get('/TacnaApi/glavni_meni/obavestenja', params),
    provera_privilegija: params => API.post('/TacnaApi/outh/provera_privilegija', params),
    novo_obavestenje_post: params => API.post('TacnaApi/main/ExtraOption_Fab', params),
    logout_post: params => API.post('TacnaApi/outh/logout', params)
}