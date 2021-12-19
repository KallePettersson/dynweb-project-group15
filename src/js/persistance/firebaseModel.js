import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig';
import { getDatabase } from "firebase/database";

//Firebase connection
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);