import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyABeiyCjZ5oDGCK2wlxtBTd8GddnlEYHaI",
  authDomain: "zirve-gold.firebaseapp.com",
  projectId: "zirve-gold",
  storageBucket: "zirve-gold.appspot.com",
  messagingSenderId: "849655230552",
  appId: "1:849655230552:web:7081ace888158e17cd1a2d",
  measurementId: "G-PSESKS1D2Y"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, app, db, storage };