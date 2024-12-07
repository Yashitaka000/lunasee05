import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC4AKUojORSGgBgInZyapueb9N5xOgxdEI",
  authDomain: "lunasee-3b60d.firebaseapp.com",
  projectId: "lunasee-3b60d",
  storageBucket: "lunasee-3b60d.appspot.com",
  messagingSenderId: "347482256297",
  appId: "1:347482256297:web:ee8bf8c3e15bff0e58cab8",
  measurementId: "G-T96R4R8VSZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);