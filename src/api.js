import axios from 'axios';
const API = axios.create({
    baseURL: 'http://031n122.mars1.mars-hosting.com'
});

export default {
    get_obavestenja: params => API.post('/TacnaApi/glavni_meni/show_obavestenja', params),
    provera_privilegija: params => API.post('/TacnaApi/outh/provera_privilegija', params),
    novo_obavestenje_post: params => API.post('/TacnaApi/glavni_meni/add_obavestenje', params),
    edit_obavestenje_post: params => API.post('/TacnaApi/glavni_meni/edit_obavestenje', params),
    logout_post: params => API.post('TacnaApi/outh/logout', params),
    post_delete_obavestenja: params => API.post('TacnaApi/glavni_meni/delete_obavestenja', params),
}