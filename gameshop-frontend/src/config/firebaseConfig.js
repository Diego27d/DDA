
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBY1niBtasNPHb2ZeHMs9FsGSfm9y8KssM",
  authDomain: "game-shop-f126b.firebaseapp.com",
  projectId: "game-shop-f126b",
  storageBucket: "game-shop-f126b.appspot.com",
  messagingSenderId: "709046825793",
  appId: "1:709046825793:web:dcdd71584f977454c167c0",
  measurementId: "G-ZYE7KRHFTY",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app); 
export const db = getFirestore(app); 
export const storage = getStorage(app); 
export default app;
