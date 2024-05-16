// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7bSmoXdQrqmMfu7g2HnjNbGFER5sSqFo",
  authDomain: "ticketbot-51848.firebaseapp.com",
  projectId: "ticketbot-51848",
  storageBucket: "ticketbot-51848.appspot.com",
  messagingSenderId: "874558986495",
  appId: "1:874558986495:web:5e12b192654bf1c61554ca",
  measurementId: "G-7Y8S0XVTW3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);