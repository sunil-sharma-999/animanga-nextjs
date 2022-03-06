import { useState } from 'react';
import ProfileDetail from '../../components/ProfileDetail';
import Signin from '../../components/Signin';
import Signup from '../../components/Signup';
import useAuthCheck from '../../hooks/useAuthCheck';

const Profile = () => {
  const [type, setType] = useState('signin');
  const authState = useAuthCheck();

  return (
    <>
      {authState && <ProfileDetail />}
      {!authState && type === 'signup' && <Signup setType={setType} />}
      {!authState && type === 'signin' && <Signin setType={setType} />}
    </>
  );
};

export default Profile;
