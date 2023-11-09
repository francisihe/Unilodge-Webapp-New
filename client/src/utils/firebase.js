// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "unilodge-webapp.firebaseapp.com",
  projectId: "unilodge-webapp",
  storageBucket: "unilodge-webapp.appspot.com",
  messagingSenderId: "1059611901133",
  appId: "1:1059611901133:web:1ce4756e28ab2caf943d84"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);