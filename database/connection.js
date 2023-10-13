import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../config/firebase_token.js";

const connection = initializeApp(firebaseConfig);
const db = getFirestore(connection);

export default db;
