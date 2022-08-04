// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcjPhaC3A4zPccDpDOyap_GmqR68spiwM",
  authDomain: "learn-online-admin.firebaseapp.com",
  projectId: "learn-online-admin",
  storageBucket: "learn-online-admin.appspot.com",
  messagingSenderId: "825532912418",
  appId: "1:825532912418:web:80be58704d65e7bd6e0b7b",
  measurementId: "G-HGEZRQX1YS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };