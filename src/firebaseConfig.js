import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCQg2zfD_iatEZAYRePoq8b476WXBxXtrk",
    authDomain: "typing-website-8fbed.firebaseapp.com",
    projectId: "typing-website-8fbed",
    storageBucket: "typing-website-8fbed.appspot.com",
    messagingSenderId: "270946101619",
    appId: "1:270946101619:web:b85f31ed1796813db37d06",
    measurementId: "G-WWZJN7N76L"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebaseApp.firestore();

  export {auth,db};