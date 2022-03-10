import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileDetail from '../components/ProfileDetail';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Loading from '../components/UI/Loading';

const Profile = ({ authProp }) => {
  const [type, setType] = useState('signin');

  return (
    <>
      {authProp === 'loading' && <Loading />}
      {authProp !== 'loading' && authProp && <ProfileDetail />}
      {authProp === null && type === 'signup' && <Signup setType={setType} />}
      {authProp === null && type === 'signin' && <Signin setType={setType} />}
    </>
  );
};

export default Profile;
