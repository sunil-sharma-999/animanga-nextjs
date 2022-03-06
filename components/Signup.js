import { useState } from 'react';
import useAuthCheck from '../hooks/useAuthCheck';
import Account from './UI/Account';
import MethodUI from './UI/MethodUI';
import authHelperFunc from '../helper/authHelperFunc';
import { motion } from 'framer-motion';
import Input from './Input';
import { useRouter } from 'next/router';

const Signup = ({ setType }) => {
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const authState = useAuthCheck();
  const { signUpHandler } = authHelperFunc();
  const router = useRouter();

  if (authState) {
    return router.push('/profile');
  }

  return (
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

        <MethodUI
          msg="Want to Sign In? Click On Me"
          method="signin"
          setType={setType}
        />
        <motion.button className="bg-purple-700 rounded-md w-max m-auto py-2 px-4">
          SIGN UP!!!
        </motion.button>
      </form>
    </Account>
  );
};

export default Signup;
