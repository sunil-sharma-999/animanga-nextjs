import { doc, setDoc, Timestamp, updateDoc } from '@firebase/firestore';
import { db } from '../firebase';

const addReview = async ({
  authState,
  username,
  isDocNull,
  collectionName,
  review,
}) => {
  const reviewData = {
    username: username,
    review,
  };
  console.log(review);

  const docRef = doc(db, 'reviews', collectionName);

  if (isDocNull) {
    return await setDoc(docRef, {
      [authState]: { ...reviewData, date: Timestamp.now() },
    });
  } else if (!isDocNull) {
    return await updateDoc(docRef, {
      [authState]: { ...reviewData, date: Timestamp.now() },
    });
  }
};

export default addReview;
