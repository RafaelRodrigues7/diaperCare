import * as firebase from "firebase";

import 'firebase/storage';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBuW-qvOocRGtE5Ts4cew9-68pwYLDBkro",
    authDomain: "diapercare.firebaseapp.com",
    projectId: "diapercare",
    storageBucket: "diapercare.appspot.com",
    messagingSenderId: "678192060356",
    appId: "1:678192060356:web:2b079ac1c65bbae7cb3691",
    measurementId: "G-XRVVV0THE5"
  };
  // Initialize Firebase
  firebase.default.initializeApp(firebaseConfig);
  // firebase.default.analytics();

  export const database = firebase.default.firestore();

