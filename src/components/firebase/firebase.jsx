// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAASbHZbKLfZHV6gwUIZJ8KKIWlWyOQOtk",
  authDomain: "email-password-authentic-c24c3.firebaseapp.com",
  projectId: "email-password-authentic-c24c3",
  storageBucket: "email-password-authentic-c24c3.appspot.com",
  messagingSenderId: "38038937791",
  appId: "1:38038937791:web:2383c0bb8815b310ab660a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
