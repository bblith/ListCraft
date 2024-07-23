import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyBc92C4qj0cgxKFJPXlL98VMEh1Oymdd4c",
  authDomain: "listcraft-34099.firebaseapp.com",
  projectId: "listcraft-34099",
  storageBucket: "listcraft-34099.appspot.com",
  messagingSenderId: "350131155813",
  appId: "1:350131155813:web:0ceb01643d5164062d678c",
  measurementId: "G-VMM3GP8ZGS"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export {storage}; 
export default app;