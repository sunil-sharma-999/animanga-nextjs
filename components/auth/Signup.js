import { useEffect, useState } from 'react';
import Account from '../components/UI/Account';
import MethodUI from '../components/UI/MethodUI';
import { signUpHandler } from '../helper/authHelperFunc';
import { motion } from 'framer-motion';
import Input from '../../components/form/Input';
import { useRouter } from 'next/router';
import useAuthCheck from '../../hooks/useAuthCheck';

const Signup = () => {
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const authState = useAuthCheck();

  useEffect(() => {
    if (authState) {
      router.push('/profile');
    }
  }, [authState, router]);

  return (
    <div className="my-14">
      <Account loading={loading} error={error} type="SIGN UP">
        <form
          onSubmit={(e) => signUpHandler(e, setloading, seterror)}
          className="flex flex-col w-full gap-4">
          <Input
            type="email"
            label="Email"
            required={true}
            name="email"
            placeholder="test@test.com"
          />
          <Input
            type="text"
            label="Username"
            required={true}
            name="username"
            placeholder="michael_scott"
          />
          <Input
            type="password"
            label="Password"
            required={true}
            name="password"
            placeholder="* * * * * *"
          />
          <Input
            type="password"
            label="Confirm Password"
            required={true}
            name="cpassword"
            placeholder="* * * * * *"
          />

          <MethodUI msg="Want to Sign In? Click On Me" method="signin" />
          <motion.button className="bg-purple-700 rounded-md w-max m-auto py-2 px-4">
            SIGN UP!!!
          </motion.button>
        </form>
      </Account>
    </div>
  );
};

export default Signup;
