import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { authActions } from '../store/slices/authSlice';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const { authState } = useSelector((state) => state);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((data) => {
      if (data) {
        return dispatch(authActions.checkAuth(data.uid));
      }
      dispatch(authActions.checkAuth(null));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return authState;
};

export default useAuthCheck;
