import React, { useEffect, useState } from 'react';
import useAuthCheck from '../../hooks/useAuthCheck';
import { signinHandler } from '../../helper/authHelperFunc';
import Account from '../UI/Account';
import MethodUI from '../UI/MethodUI';
import { useRouter } from 'next/router';
import Input from '../form/Input';

const Signin = () => {
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
      <Account loading={loading} error={error} type="SIGN IN">
        <form
          onSubmit={(e) => {
            signinHandler(e, setloading, seterror).catch((err) =>
              console.log(error),
            );
          }}
          className="flex flex-col w-full gap-4">
          <Input
            label="Email"
            type="email"
            name="email"
            required={true}
            placeholder="test@test.com"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="* * * * * *"
            required={true}
          />
          <MethodUI msg="Wanna Sign Up? Click On Me!" method="signup" />
          <button className="bg-purple-700 rounded-md w-max m-auto py-2 px-4">
            SIGN IN!!!
          </button>
        </form>
      </Account>
    </div>
  );
};

export default Signin;
