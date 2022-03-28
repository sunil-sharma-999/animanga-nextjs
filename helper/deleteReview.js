import { deleteField, doc, updateDoc } from '@firebase/firestore';
import { db } from '../firebase';

export const deleteReview = async ({ collectionName, authState }) => {
  const docRef = doc(db, 'reviews', collectionName);
  return await updateDoc(docRef, {
    [authState]: deleteField(),
  });
};
