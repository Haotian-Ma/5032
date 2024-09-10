import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCzZWurRlaTdYitYC4GtXSxhIwvBHE5vAc",
    authDomain: "week7-haotian.firebaseapp.com",
    projectId: "week7-haotian",
    storageBucket: "week7-haotian.appspot.com",
    messagingSenderId: "47068670416",
    appId: "1:47068670416:web:9e06f661ad2a57b838b1d5"
  };
  
    initializeApp(firebaseConfig);

 const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
