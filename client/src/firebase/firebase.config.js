// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { apiKey, messagingSenderId, appId } from "../../constants";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "mern-book-shop.firebaseapp.com",
  projectId: "mern-book-shop",
  storageBucket: "mern-book-shop.appspot.com",

  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
