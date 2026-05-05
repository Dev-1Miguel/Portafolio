import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../../environment';

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
