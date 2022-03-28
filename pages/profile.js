import { useSelector } from 'react-redux';
import ProfileDetail from '../components/ProfileDetail';
import Signin from '../components/auth/Signin';

const Profile = () => {
  const { authState } = useSelector((state) => state);
  return (
    <>
      {authState && <ProfileDetail />}
      {authState === null && <Signin />}
    </>
  );
};

export default Profile;
