import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase';
import './axios'

const firebaseConfig = {
  apiKey: "AIzaSyDO_zDM64ImITbDbYB7vTiIw_94H5C1lkY",
  authDomain: "vuestagram-1f8ab.firebaseapp.com",
  projectId: "vuestagram-1f8ab",
  storageBucket: "vuestagram-1f8ab.appspot.com",
  messagingSenderId: "769090292501",
  appId: "1:769090292501:web:6100e9a30b59e85f76b71c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
createApp(App).use(store).use(router).mount('#app')
