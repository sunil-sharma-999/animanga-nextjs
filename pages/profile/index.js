import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileDetail from '../../components/ProfileDetail';
import Signin from '../../components/Signin';
import Signup from '../../components/Signup';

const Profile = () => {
  const [type, setType] = useState('signin');
  const authState = useSelector((state) => state.authCheck);

  return (
    <>
      {authState && <ProfileDetail />}
      {!authState && type === 'signup' && <Signup setType={setType} />}
      {!authState && type === 'signin' && <Signin setType={setType} />}
    </>
  );
};

export default Profile;
