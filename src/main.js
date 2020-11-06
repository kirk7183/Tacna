import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app';
import "firebase/analytics";

var firebaseConfig = {
    apiKey: "AIzaSyCtOBQBHq3bzSb0DriVvOn8KA11wG1LgOE",
    authDomain: "tacna-c1c54.firebaseapp.com",
    databaseURL: "https://tacna-c1c54.firebaseio.com",
    projectId: "tacna-c1c54",
    storageBucket: "tacna-c1c54.appspot.com",
    messagingSenderId: "451680143532",
    appId: "1:451680143532:web:c007908c2de754af707709",
    measurementId: "G-VB6MNGTVCH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')