import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logOutHandler } from '../helper/authHelperFunc';
import { authActions } from '../store/slices/authSlice';
import Router from 'next/router';
import useAuthCheck from '../hooks/useAuthCheck';
import DeleteAccount from '../components/settings/DeleteAccount';
import { AiOutlineLogout } from 'react-icons/ai';
import { GoVerified } from 'react-icons/go';
import { auth } from '../firebase';
import { ChangePassword } from '../components/settings/ChangePassword';
import ChangeEmail from '../components/settings/ChangeEmail';
import { sendEmailVerification } from 'firebase/auth';
import { useRef } from 'react';
import VerificationBadge from '../components/settings/VerificationBadge';

const initialSettingState = {
  changePassword: false,
  delete: false,
  verifyEmail: false,
  changeUsername: false,
  changeEmail: false,
};

const Settings = () => {
  const [settingState, setsettingState] = useState(initialSettingState);

  const authState = useAuthCheck();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!authState) {
      Router.push('/signin');
    }
  }, [authState]);

  const emailVerified = auth.currentUser
    ? auth.currentUser.emailVerified
    : false;

  return (
    <div className="grid max-w-screen-lg w-10/12 text-white my-20">
      <div className="flex w-full justify-between text-2xl items-center mb-8">
        <VerificationBadge emailVerified={emailVerified} />
        <button
          className="w-max bg-red-500 sm:mx-0 px-4 py-2 text-white"
          onClick={() => {
            logOutHandler().then(() => {
              dispatch(authActions.logout());
              Router.push('/manga/1');
            });
          }}>
          <AiOutlineLogout />
        </button>
      </div>
      <div className="setting-options flex flex-col sm:w-8/12 w-4/5 max-w-md m-auto text-black p-2 gap-4">
        <ChangeEmail
          setsettingState={setsettingState}
          settingState={settingState}
          initialSettingState={initialSettingState}
        />
        <ChangePassword
          setsettingState={setsettingState}
          settingState={settingState}
          initialSettingState={initialSettingState}
        />
        <DeleteAccount
          setsettingState={setsettingState}
          settingState={settingState}
          initialSettingState={initialSettingState}
        />
        {/* <ChangeUsername /> */}
      </div>
    </div>
  );
};

export default Settings;
