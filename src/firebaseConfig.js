// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmm3yS_x1MDl03HzTSIkomBV1mXaG54Rw",
  authDomain: "telkom-dbt-frontend.firebaseapp.com",
  projectId: "telkom-dbt-frontend",
  storageBucket: "telkom-dbt-frontend.appspot.com",
  messagingSenderId: "967455644515",
  appId: "1:967455644515:web:2efd796bbd6d7617085156",
  measurementId: "G-SZFEWJ33QZ"
};
export default firebaseConfig;


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);