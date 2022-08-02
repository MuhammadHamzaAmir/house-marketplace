import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBDWfEB9twYaoJQWi80sZrEwytgHsKx-S0",
    authDomain: "react-udemy-course-3b171.firebaseapp.com",
    projectId: "react-udemy-course-3b171",
    storageBucket: "react-udemy-course-3b171.appspot.com",
    messagingSenderId: "1093982784306",
    appId: "1:1093982784306:web:a63f1a466db15c3ab3a52b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()