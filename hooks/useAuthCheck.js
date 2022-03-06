import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { authActions } from '../store/slices/authSlice';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const authCheck = useSelector((state) => state.authCheck);
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((data) => {
      data
        ? dispatch(authActions.checkAuth(data.uid))
        : dispatch(authActions.checkAuth(null));
    });
    return subscribe;
  }, [authCheck, dispatch]);

  return authCheck;
};

export default useAuthCheck;
