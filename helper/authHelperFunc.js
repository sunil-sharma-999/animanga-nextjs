import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from '@firebase/firestore';
import { auth, db } from '../firebase';

const authHelperFunc = () => {
  const logOutHandler = () => {
    localStorage.clear();
    return signOut(auth);
  };

  const signinHandler = async (e, setloading, seterror) => {
    e.preventDefault();
    setloading(true);
    seterror(null);
    const formNode = e.target;
    const form = new FormData(formNode);
    const [email, password] = [form.get('email'), form.get('password')];
    if (password.length > 5) {
      try {
        await signInWithEmailAndPassword(auth, email, password);

        seterror(null);
        setloading(false);
      } catch (err) {
        seterror(err.code.split('/')[1]);
        setloading(false);
      }
    } else {
      setloading(false);
      seterror('Password must be of 6 charcaters or long');
    }
  };

  const signUpHandler = async (e, setloading, seterror) => {
    e.preventDefault();
    seterror(null);
    setloading(true);
    const formNode = e.target;
    const form = new FormData(formNode);
    const [username, email, password, cpassword] = [
      form.get('username').toLowerCase(),
      form.get('email').toLowerCase(),
      form.get('password'),
      form.get('cpassword'),
    ];

    if (password.length > 5) {
      if (password === cpassword) {
        const q = query(
          collection(db, 'users'),
          where('username', '==', username),
        );

        getDocs(q)
          .then(async (res) => {
            if (!res.empty) {
              setloading(false);
              seterror('Username already exists!');
            } else {
              const {
                user: { uid },
              } = await createUserWithEmailAndPassword(auth, email, password);
              await setDoc(doc(db, 'users', uid), {
                username: username,
                favorites: {},
              });
              seterror(null);
              setloading(false);
            }
          })
          .catch((err) => {
            seterror(err.code);
            setloading(false);
          });
      } else {
        setloading(false);
        seterror('Passwords do not match');
      }
    } else {
      seterror('Password must be 6 charcaters or long');
      setloading(false);
    }
  };

  return { logOutHandler, signUpHandler, signinHandler };
};

export default authHelperFunc;
