import {collection, addDoc} from 'firebase/firestore';
import {db} from 'services/firebase.config';

type StoreItem = {
  pathToStore: string;
  data: Record<string, any>;
};

export const storeItem = async ({pathToStore, data}: StoreItem) =>
  new Promise(async (resolve, reject) => {
    try {
      const docRef = await addDoc(collection(db, pathToStore), data);
      resolve(docRef.id);
    } catch (e) {
      reject('Error adding document: ' + e);
    }
  });
