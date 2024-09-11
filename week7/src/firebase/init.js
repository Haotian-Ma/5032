import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration 
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCzZWurRlaTdYitYC4GtXSxhIwvBHE5vAc",
  authDomain: "week7-haotian.firebaseapp.com",
  projectId: "week7-haotian",
  storageBucket: "week7-haotian.appspot.com",
  messagingSenderId: "47068670416",
  appId: "1:47068670416:web:9e06f661ad2a57b838b1d5"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db