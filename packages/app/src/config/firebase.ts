// Modular Firebase v.9 Initialization.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyB-jOmZIpluQlDUBA_szh2HQsQK3wJDgew",
    authDomain: "zoo-merch.firebaseapp.com",
    projectId: "zoo-merch",
    storageBucket: "zoo-merch.appspot.com",
    messagingSenderId: "709696329472",
    appId: "1:709696329472:web:9355ca00b5c6e62a7a45e5"
};
// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

function initFirebase() {
    if (typeof window !== undefined) {
        initializeApp(firebaseConfig);
        console.log("Firebase has been init successfully");
    }
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export { initFirebase, db, getAuth };
