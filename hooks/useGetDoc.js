import { doc, getDoc } from '@firebase/firestore';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { db } from '../firebase';
import { userActions } from '../store/slices/userSlice';

export const useGetDoc = (collectionName) => {
  const dispatch = useDispatch();
  const { userData, authState } = useSelector((state) => state);

  useEffect(() => {
    if (!authState) {
      return;
    }
    getDoc(doc(db, collectionName, authState))
      .then((res) => res.data())
      .then((data) => dispatch(userActions.setData(data)))
      .catch((err) => console.log(err));
  }, [authState, dispatch, collectionName]);

  return { userData };
};

export default useGetDoc;
