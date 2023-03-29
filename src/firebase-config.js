import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore/lite';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_API,
    authDomain: "my-first-project-65c3c.firebaseapp.com",
    projectId: "my-first-project-65c3c",
    storageBucket: "my-first-project-65c3c.appspot.com",
    messagingSenderId: "52944619450",
    appId: "1:52944619450:web:2109e27f3ab1d83764bf83"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);