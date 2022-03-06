import { doc, getDoc } from '@firebase/firestore';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { db } from '../firebase';
import { userActions } from '../store/slices/userSlice';

const useGetDoc = (collectionName) => {
  const dispatch = useDispatch();
  const { userData, authCheck } = useSelector((state) => state);

  useEffect(() => {
    if (!authCheck) {
      return;
    }
    getDoc(doc(db, collectionName, authCheck))
      .then((res) => res.data())
      .then((data) => dispatch(userActions.setData(data)))
      .catch((err) => console.log(err));
  }, [authCheck, dispatch, collectionName]);

  return { userData };
};

export default useGetDoc;
