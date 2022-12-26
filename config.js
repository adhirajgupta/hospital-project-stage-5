// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQT9lWIsqqKyTU24GBzsm_l1yJXO-el_I",
  authDomain: "hospital-project-c723e.firebaseapp.com",
  projectId: "hospital-project-c723e",
  storageBucket: "hospital-project-c723e.appspot.com",
  messagingSenderId: "1078466638420",
  appId: "1:1078466638420:web:d37e958f3b26a61e2bb3c1"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyC1S4OdYvpNvbqAU7x8lHlyJJOQ1mDKuXQ",
//   authDomain: "hospital-project-f2.firebaseapp.com",
//   projectId: "hospital-project-f2",
//   storageBucket: "hospital-project-f2.appspot.com",
//   messagingSenderId: "88978410731",
//   appId: "1:88978410731:web:219eccc6e66e20b17c42ae"
// };
// Initialize Firebase
// export const db = initializeApp(firebaseConfig);

 const db = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export default db

// firebase.firestore.settings({ experimentalForceLongPolling: true });
