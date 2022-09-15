import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC7LUwF-w6GFxL4_Pi60jpCPCBT3oRIBQ",
  authDomain: "autism-dbac7.firebaseapp.com",
  projectId: "autism-dbac7",
  storageBucket: "autism-dbac7.appspot.com",
  messagingSenderId: "127882527419",
  appId: "1:127882527419:web:3b8442e926bbe6e7b91f9e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
