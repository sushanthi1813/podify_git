// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx5IfDH1z62ZJOW8WFnfU-aiBsXpjh0Lg",
  authDomain: "podify-5d4de.firebaseapp.com",
  projectId: "podify-5d4de",
  storageBucket: "podify-5d4de.appspot.com",
  messagingSenderId: "329054634425",
  appId: "1:329054634425:web:a258168c31489b4efaf668",
  measurementId: "G-JL145TY1S2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app)