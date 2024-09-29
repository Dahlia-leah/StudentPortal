// Import the functions you need from the SDKs you need
import "firebase/compat/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABfR4CAXjTmm8RNOzVhPERIawUWSF_QvQ",
  authDomain: "studentportal-f1111.firebaseapp.com",
  projectId: "studentportal-f1111",
  storageBucket: "studentportal-f1111.appspot.com",
  messagingSenderId: "143646022494",
  appId: "1:143646022494:web:142e73d39fa0bd02b74dcf",
  measurementId: "G-43Q4Z0XEQ5"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

const auth = firebase.auth();


export { auth,db, storage  };


