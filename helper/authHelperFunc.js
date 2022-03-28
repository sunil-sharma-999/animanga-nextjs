import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  verifyBeforeUpdateEmail,
  updateEmail,
  deleteUser,
} from '@firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  deleteDoc,
} from '@firebase/firestore';
import { auth, db } from '../firebase';
import { authActions } from '../store/slices/authSlice';

export const logOutHandler = () => {
  // localStorage.clear();
  return signOut(auth);
};

export const changePasswordHandler = async (
  e,
  setLoading,
  setError,
  setSuccess,
) => {
  e.preventDefault();
  // reset
  setLoading(false);
  setSuccess(false);
  setError(false);
  try {
    // start loading
    setLoading(true);
    await sendPasswordResetEmail(auth, auth.currentUser.email);
    // stop loading and no error
    setLoading(false);
    setError(false);
    setSuccess(true);
  } catch (error) {
    // stop loading and handle error
    setSuccess(false);
    setLoading(false);
    setError(error.message || 'failed');
    console.log(error);
  }
};

export const deleteUserHandler = async (e, setLoading, setError, dispatch) => {
  e.preventDefault();
  return signinHandler(e, setLoading, setError)
    .then(async (res) => {
      if (res) {
        if (window.confirm('Delete account permanently?')) {
          setLoading(true);
          await deleteDoc(doc(db, 'users', res.user.uid));
          return deleteUser(auth.currentUser);
        } else {
          e.target.reset();
        }
      }
    })
    .then(() => {
      setLoading(false);
      setError(false);
      dispatch(authActions.logout());
    })
    .catch((err) => {
      setLoading(false);
      setError(err.message || 'failed');
    });
};

export const changeEmailHandler = async (
  e,
  setLoading,
  setError,
  setSuccess,
) => {
  const formdata = new FormData(e.target);
  const newEmail = formdata.get('newemail');
  // reset states
  setLoading(false);
  setError(false);
  setSuccess(false);
  try {
    const { user } = await signinHandler(e, setLoading, setError);
    await verifyBeforeUpdateEmail(user, newEmail);
    e.target.reset();
    setSuccess(true);
  } catch (error) {
    setSuccess(false);
    setLoading(false);
    setError(error.code || error.message || 'Failed');
  }
};

export const signinHandler = async (e, setloading, seterror) => {
  e.preventDefault();
  setloading(true);
  seterror(null);
  const formNode = e.target;
  const form = new FormData(formNode);
  const [email, password] = [form.get('email'), form.get('password')];
  if (password.length > 5) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      seterror(null);
      setloading(false);
      return res;
    } catch (err) {
      const errMessage = err.code.split('/')[1];
      seterror(errMessage);
      setloading(false);
      throw new Error(errMessage);
    }
  } else {
    const errMessage = "Password must be of 6 charcaters or long'";
    setloading(false);
    seterror(errMessage);
    throw new Error(errMessage);
  }
};

export const signUpHandler = async (e, setloading, seterror) => {
  e.preventDefault();
  // confirming initial  state
  seterror(null);
  setloading(true);
  // gathering data
  const formNode = e.target;
  const form = new FormData(formNode);
  const [username, email, password, cpassword] = [
    form.get('username').toLowerCase(),
    form.get('email').toLowerCase(),
    form.get('password'),
    form.get('cpassword'),
  ];

  // verification
  if (password.length > 5) {
    // password confirmation
    if (password === cpassword) {
      // query structure for all usernames
      const q = query(
        collection(db, 'users'),
        where('username', '==', username),
      );

      // sending the query
      getDocs(q)
        .then(async (res) => {
          // if it is not empty then username exists already
          if (!res.empty) {
            setloading(false);
            seterror('Username already exists!');
          } else {
            // otherwise new username
            // try block
            try {
              const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
              );
              await setDoc(doc(db, 'users', user.uid), {
                username: username,
                favorites: {},
              });
              await sendEmailVerification(user);
              seterror(null);
              setloading(false);
            } catch (error) {
              // catch block to catch errors thrown by try block
              setloading(false);
              seterror(error.code);
            }
          }
        }) //catch block for query error
        .catch((err) => {
          seterror(err.code);
          setloading(false);
        });
    } else {
      // if password does not match
      setloading(false);
      seterror('Passwords do not match');
    }
  } else {
    // if password is very small word
    seterror('Password must be 6 charcaters or long');
    setloading(false);
  }
};
