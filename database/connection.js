import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebase_token.js";

const connection = initializeApp(firebaseConfig);

export default connection;
