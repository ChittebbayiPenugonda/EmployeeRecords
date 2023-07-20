// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSmqjQ9tVSf0qauDcsp8FO5fX0XHqGUXo",
  authDomain: "employeerecords-9a95b.firebaseapp.com",
  projectId: "employeerecords-9a95b",
  storageBucket: "employeerecords-9a95b.appspot.com",
  messagingSenderId: "848420877356",
  appId: "1:848420877356:web:b688bd767535dcbe428d89",
  measurementId: "G-N2T6Z3287S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 
export const db = getFirestore(app);
export const storage = getStorage(app);
