import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        IsLoggedIn: false,
        Facebook_user_data: {
            user_displayName: 'niste logovani',
            user_pic: null,
        },
        show_dialog_da_ne: false,
        show_dialog_loading: false,
        show_dialog_for_login: false
    },
    getters: {
        Facebook_user_data: (state) => {
            return state.Facebook_user_data;
        },
        get_dialog_for_login(state) {
            return state.show_dialog_for_login;
        },
        get_showDialog_da_ne: (state) => {
            return state.show_dialog_da_ne;
        },
        get_dialog_loading_status: (state) => {
            return state.show_dialog_loading;
        },
    },
    mutations: {
        FB_USER_DATA(state, payload) {
            state.Facebook_user_data.user_displayName = payload.user_displayName;
            state.Facebook_user_data.user_pic = payload.fb_profile_pic;
        },
        IS_LOGGED_IN(state, payload) {
            state.IsLoggedIn = payload.IsLoggedIn;
        },
        SHOW_DIALOG_FOR_LOGIN(state, payload) {
            state.show_dialog_for_login = payload
        },
        SHOW_DIALOG_DA_NE(state, payload) {
            state.show_dialog_da_ne = payload;
        }
    },
    actions: {
        Facebook_login({ commit }) {
            this.state.show_dialog_loading = true;

            //obavezno u main.js mora biti importovan import "firebase/auth" inace login preko fb nece da radi;
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase
                .auth()
                .signInWithPopup(provider)
                .then((result) => {
                    if (result) {

                        //USER DISPLAY NAME ON FB
                        let user_displayName = result.user.displayName;

                        //FULL PATH OF PROFILE IMAGE ON FB
                        let user_id = result.additionalUserInfo.profile.id;
                        let access_token = result.credential.accessToken;
                        //access_token stavljamo u local storage zato sto kad se ugasi browser ili refreshstranica
                        //ne moze da se dodje do njega osim ako se negde u bazu ne snimi
                        window.localStorage.setItem('access_token', access_token);
                        let fb_profile_pic = "https://graph.facebook.com/" +
                            user_id +
                            "/picture?access_token=" +
                            access_token;

                        commit("FB_USER_DATA", {
                                user_displayName,
                                fb_profile_pic
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
                })
                .catch((error) => {
                    console.log(error.code);
                });
        },
        dialog_for_login({ commit }, newValue) {
            commit("SHOW_DIALOG_FOR_LOGIN", newValue)
        },
        Facebook_logout_store({ commit }) {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                commit("FB_USER_DATA", {
                    user_displayName: 'niste logovani',
                    fb_profile_pic: null
                })

                commit('IS_LOGGED_IN', {
                        IsLoggedIn: false
                    })
                    //brisanje access_token iz local storage
                window.localStorage.removeItem('access_token');
            }).catch(function(error) {
                console.log(error)
            });
        },

        set_showDialog_da_ne({ commit }, newValue) {
            commit('SHOW_DIALOG_DA_NE', newValue)
        },
        check_is_user_logged_in({ commit }) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    let result = firebase.auth().currentUser;
                    let user_displayName = result.providerData[0].displayName;

                    //FULL PATH OF PROFILE IMAGE ON FB
                    let user_id = result.providerData[0].uid;
                    let access_token = window.localStorage.getItem('access_token');
                    let fb_profile_pic = "https://graph.facebook.com/" +
                        user_id +
                        "/picture?access_token=" +
                        access_token;

                    commit("FB_USER_DATA", {
                            user_displayName,
                            fb_profile_pic
                        }),
                        commit("IS_LOGGED_IN", {
                            IsLoggedIn: true
                        })
                }
            });
        },
    },
    modules: {}
})