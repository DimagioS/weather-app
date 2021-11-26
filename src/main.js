import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

firebase.initializeApp({
  apiKey: "AIzaSyCrIA0fkmYWWTgFqD6A13Ixo5YckGTj_ps",
  authDomain: "vue-http-b91f8.firebaseapp.com",
  databaseURL: "https://vue-http-b91f8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-http-b91f8",
  storageBucket: "vue-http-b91f8.appspot.com",
  messagingSenderId: "387901176093",
  appId: "1:387901176093:web:87466fb37e0d4b6d0949f4"
})

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .mount('#app')
  }
})

