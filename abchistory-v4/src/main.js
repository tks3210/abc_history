import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css"

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDIsN2GAl7cRJdnNXP0XmgAYQhbggYuMlg",
  authDomain: "abchistory-aa610.firebaseapp.com",
  databaseURL: "https://abchistory-aa610.firebaseio.com",
  projectId: "abchistory-aa610",
  storageBucket: "abchistory-aa610.appspot.com",
  messagingSenderId: "524270235877",
  appId: "1:524270235877:web:0e00b77cf1d2d40bfe240c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.use(Vuetify);
new Vue({
  vuetify: new Vuetify(),
  router,
  render: h => h(App)
}).$mount('#app')

