import React from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBfCXohVcPKR9TP-1Wc7c3e1lmjfyeP6PQ",
  authDomain: "netfloux-58c06.firebaseapp.com",
  projectId: "netfloux-58c06",
  storageBucket: "netfloux-58c06.appspot.com",
  messagingSenderId: "305339214191",
  appId: "1:305339214191:web:3294dee484b4f5b7b6a09a",
  measurementId: "G-QMQ6LGJD99"
});

// Initialize Firebase
const analytics = getAnalytics(firebaseConfig);
const auth = getAuth(firebaseConfig);
const firestore = getFirestore(firebaseConfig);


//Detect auth state 
onAuthStateChanged(auth, (user) => {
    if (user){
        console.log("User Logged in");
    }else{
        console.log("No User logged In")
        }
});