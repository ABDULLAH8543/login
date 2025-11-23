import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBqsqdfylmiSBEun5QvYeDlLgbQ5safPa0",
    authDomain: "testing-6a52f.firebaseapp.com",
    projectId: "testing-6a52f",
    storageBucket: "testing-6a52f.firebasestorage.app",
    messagingSenderId: "884434417725",
    appId: "1:884434417725:web:1f12dee6328c9f07071254",
    measurementId: "G-DPLZQEFZ2K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
