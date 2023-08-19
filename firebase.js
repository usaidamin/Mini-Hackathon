import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCF9gXc-hUaFzRTOssWEfXr2p4ZhQYb_mU",
    authDomain: "mini-hackathon-27b12.firebaseapp.com",
    projectId: "mini-hackathon-27b12",
    storageBucket: "mini-hackathon-27b12.appspot.com",
    messagingSenderId: "728148720090",
    appId: "1:728148720090:web:0bce089e3959c4887528e3"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();

  export{
    app,
    db,
    auth,
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    updateDoc,
    getDoc
  }