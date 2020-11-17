import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import api from "@/api.js";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        IsLoggedIn: false,
        Facebook_user_data: {
            user_displayName: 'Niste logovani',
            user_pic: null,
            user_email: null
        },
        show_dialog_da_ne: false,
        show_dialog_loading: false,
        show_dialog_for_login: false,
        snackbar: {
            boolean: false,
            message: '',
            color: '',
        },
        reg_korisnik: {
            sid: '',
            podaci: {
                korisnik_id: '',
                ime: '',
                prezime: '',
                email: '',
                datum_reg: null,
                dozvola: null,
                datum_log: null,
                happy_coin: '0',
                happy_coin_rez: null,
                status: ""
            }
        },
        privilegije_boolean: false
    },
    getters: {
        get_IsLoggedIn: (state) => {
            return state.IsLoggedIn
        },
        Facebook_user_data: (state) => {
            return state.Facebook_user_data;
        },
        get_dialog_for_login: (state) => {
            return state.show_dialog_for_login;
        },
        get_showDialog_da_ne: (state) => {
            return state.show_dialog_da_ne;
        },
        get_dialog_loading_status: (state) => {
            return state.show_dialog_loading;
        },
        get_snackbar_status: (state) => {
            return state.snackbar;
        },
        get_reg_korisnik: (state) => {
            return state.reg_korisnik;
        },
        get_glavna_obavestenja: (state) => {
            return state.glavna_obavestenja
        },
        get_privilegije_boolean: (state) => {
            return state.privilegije_boolean
        }
    },
    mutations: {
        FB_USER_DATA(state, payload) {
            state.Facebook_user_data.user_displayName = payload.user_displayName;
            state.Facebook_user_data.user_pic = payload.fb_profile_pic;
            state.Facebook_user_data.user_email = payload.user_email
        },
        IS_LOGGED_IN(state, payload) {
            state.IsLoggedIn = payload.IsLoggedIn;
        },
        SHOW_DIALOG_FOR_LOGIN(state, payload) {
            state.show_dialog_for_login = payload
        },
        SHOW_DIALOG_DA_NE(state, payload) {
            state.show_dialog_da_ne = payload;
        },
        TOGGLE_SNACKBAR(state, payload) {
            state.snackbar.boolean = payload.boolean;
            state.snackbar.message = payload.message;
            state.snackbar.color = payload.color;
        },
        PODACI_REG_KORISNIKA(state, payload) {
            state.reg_korisnik.sid = payload.sid;
            state.reg_korisnik.podaci = payload.podaci
        },
        PRIVILEGIJE_PRIKAZI(state, payload) {
            state.privilegije_boolean = payload
        }
    },

    actions: {
        Facebook_login({ commit }) {
            let user_displayName;
            let user_id;
            let user_email;
            let access_token_fb;
            this.state.show_dialog_loading = true;
            //obavezno u main.js mora biti importovan import "firebase/auth" inace login preko fb nece da radi;
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase
                .auth()
                .signInWithPopup(provider)
                .then((result) => {

                    if (result) {
                        //USER DISPLAY NAME ON FB
                        user_displayName = result.user.displayName;
                        //NEED ID FOR FULL PATH OF PROFILE IMAGE ON FB JUST LIKE access_token
                        user_id = result.additionalUserInfo.profile.id;
                        //E-MAIL OF USER
                        user_email = result.additionalUserInfo.profile.email;
                        //NEED ACCESS TOKEN FOR FULL PATH OF PROGLE IMAGE ON FB JUST LIKE user_id
                        access_token_fb = result.credential.accessToken;
                        //access_token sa Facebooka stavljamo u local storage zato sto kad se ugasi browser ili refresh stranica
                        //ne moze da se dodje do njega osim ako se negde u bazu ne snimi
                        window.localStorage.setItem('access_token_fb', access_token_fb);
                        let fb_profile_pic = "https://graph.facebook.com/" +
                            user_id +
                            "/picture?access_token=" +
                            access_token_fb;

                        commit("FB_USER_DATA", {
                                user_displayName,
                                fb_profile_pic,
                                user_email
                            }),
                            commit("IS_LOGGED_IN", {
                                IsLoggedIn: true
                            })
                    } else {
                        commit("IS_LOGGED_IN", {
                            IsLoggedIn: false
                        })
                    }
                }).then(() => {
                    this.state.show_dialog_loading = false;
                    commit('TOGGLE_SNACKBAR', {
                            boolean: true,
                            message: 'Uspešno ste se prijavili',
                            color: 'success'
                        })
                        //     //poziva api iz "_API" modula i action "api_is_reg_check"
                        // dispatch('_API/api_is_reg_check', user_email, { root: true })
                })
                .catch((error) => {
                    console.log(error.code);
                    commit('TOGGLE_SNACKBAR', {
                        boolean: true,
                        message: 'Došlo je do greške',
                        color: 'error'
                    })
                });
        },

        Facebook_logout_store({ commit }) {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                commit("FB_USER_DATA", {
                    user_displayName: 'Niste logovani',
                    fb_profile_pic: null
                })
                commit('IS_LOGGED_IN', {
                    IsLoggedIn: false
                })
                commit('TOGGLE_SNACKBAR', {
                        boolean: true,
                        message: 'Uspešno ste se odjavili',
                        color: 'success'

                    })
                    //KADA SE IZLOGUJE BRISANJE SIDA I PODATAKA 
                commit('PODACI_REG_KORISNIKA', {
                        sid: '',
                        podaci: {
                            korisnik_id: '',
                            ime: '',
                            prezime: '',
                            email: '',
                            datum_reg: null,
                            dozvola: null,
                            datum_log: null,
                            happy_coin: null,
                            happy_coin_rez: null,
                            status: ""
                        }
                    })
                    //brisanje access_token iz local storage
                window.localStorage.removeItem('access_token_fb');
            }).catch(function(error) {
                console.log(error)
            });
        },
        //PROVERA DA LI JE KORISNIK LOGOVAN AKO SE UGASI BROWSER ILI SE REFRESH STRANICA
        check_is_user_logged_in({ commit, dispatch }) {
            this.state._API.glavna_obavestenja = ""
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    let result = firebase.auth().currentUser;
                    let user_displayName = result.providerData[0].displayName;
                    let user_email = result.providerData[0].email;
                    //FULL PATH OF PROFILE IMAGE ON FB
                    let user_id = result.providerData[0].uid;
                    let access_token_fb = window.localStorage.getItem('access_token_fb');
                    let fb_profile_pic = "https://graph.facebook.com/" +
                        user_id +
                        "/picture?access_token=" +
                        access_token_fb;
                    //izvlacenje iz localStorage zato sto se posle refresh ili gasenja strane gube podaci
                    commit("FB_USER_DATA", {
                            user_displayName,
                            fb_profile_pic,
                            user_email
                        }),
                        commit("IS_LOGGED_IN", {
                            IsLoggedIn: true
                        })

                    //PROVERA NA MARSU DA LI JE REGISTROVAN (uporedjivane mail-a) I AKO JESTE 
                    //VRACAJU SE PODACI IZ BAZE
                    //poziva api iz "_API" modula i action "api_is_reg_check"
                    dispatch('_API/api_is_reg_check', user_email, { root: true })
                }

            })
        },
        set_dialog_for_login({ commit }, newValue) {
            commit("SHOW_DIALOG_FOR_LOGIN", newValue)
        },
        set_showDialog_da_ne({ commit }, newValue) {
            commit('SHOW_DIALOG_DA_NE', newValue)
        },
        set_snackbar({ commit }, newValue) {
            commit('TOGGLE_SNACKBAR', {
                boolean: newValue, //ovo je false kada se klikne na dugme zatvori
                message: '',
                color: ''
            })
        },
        show_privilegije({ commit }, newValue) {
            commit('PRIVILEGIJE_PRIKAZI', newValue)
        }
    },
    modules: {
        _API: {
            namespaced: true,
            state: () => ({
                glavna_obavestenja: ""
            }),
            getters: {
                get_glavna_obavestenja(state) {
                    return state.glavna_obavestenja;
                }
            },
            mutations: {
                GLAVNA_OBAVESTENJA(state, payload) {
                    state.glavna_obavestenja = payload;
                }
            },
            actions: {
                //PROVERA NA MARSU DA LI JE REGISTROVAN (uporedjivane mail-a) I AKO JESTE 
                //VRACAJU SE PODACI IZ BAZE
                api_is_reg_check({ commit }, user_email) {
                    api.provera_privilegija({ user_mail: user_email }).then(response => {
                        commit('PODACI_REG_KORISNIKA', {
                            sid: response.data.sid,
                            podaci: response.data.reg_korisnik
                        }, { root: true });
                    })
                },
                //GLAVNA OBAVESTENJA IZ BAZE - MARS
                api_glavna_obavestenja({ commit }) {
                    api.glavna_obavestenja().then((response) => {
                        let lista_obavestenja = response.data.result;
                        commit('GLAVNA_OBAVESTENJA', lista_obavestenja)
                    });
                },

            }
        }
    }
})