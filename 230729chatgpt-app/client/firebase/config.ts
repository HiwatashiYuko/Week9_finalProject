// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"; // 追加

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGdAi5FXel-DTsNGFbvT2Tr-RZowG94cw",
  authDomain: "teamb-a39e7.firebaseapp.com",
  projectId: "teamb-a39e7",
  storageBucket: "teamb-a39e7.appspot.com",
  messagingSenderId: "587139849223",
  appId: "1:587139849223:web:d8af4d7aed3b493b83dea2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // authを取得

export { app, auth }; // authをエクスポート
