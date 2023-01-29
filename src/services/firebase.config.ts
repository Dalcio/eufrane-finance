import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {collection, getDocs, getFirestore} from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyB8meesBEYpmnpMqJJvmKSRteuM6SSi8WQ',
  authDomain: 'app-gestao-finance.firebaseapp.com',
  projectId: 'app-gestao-finance',
  storageBucket: 'app-gestao-finance.appspot.com',
  messagingSenderId: '751017756798',
  appId: '1:751017756798:web:7d5aca4f22f6f73deaf02f',
  measurementId: 'G-NNDZW9QKZN',
};

const app = initializeApp(firebaseConfig);
const authHandler = getAuth(app);
const db = getFirestore(app);

const getData = async (path: string) => {
  const docSnap = await getDocs(collection(db, path));

  return docSnap;
};

export {getData, db, authHandler};
