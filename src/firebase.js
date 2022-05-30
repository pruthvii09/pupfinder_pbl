import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAnGeKpOkg9owXfcUMqnUvKrVceebGgORM',
  authDomain: 'pupfinder-13f78.firebaseapp.com',
  projectId: 'pupfinder-13f78',
  storageBucket: 'pupfinder-13f78.appspot.com',
  messagingSenderId: '634770883451',
  appId: '1:634770883451:web:93b3bbe38ecd83e905f3de',
  measurementId: 'G-W0WVBNRQ71',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
