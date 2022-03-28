import React, { useState } from 'react';
import { changePasswordHandler } from '../../helper/authHelperFunc';
import Account from '../UI/Account';
import OptionWrapper from './OptionWrapper';

export const ChangePassword = ({
  settingState,
  setsettingState,
  initialSettingState,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <OptionWrapper
      option="changePassword"
      label="Change Password"
      setsettingState={setsettingState}
      initialSettingState={initialSettingState}
      settingState={settingState}>
      {settingState.changePassword && (
        <Account loading={loading} error={error}>
          {success && (
            <p className="text-green-500 text-center">
              Check The Mail Box for Instructions
            </p>
          )}
          <button
            className="bg-green-500 mt-4 mb-8 text-white rounded-md w-max m-auto py-2 px-4"
            onClick={async (e) => {
              await changePasswordHandler(e, setLoading, setError, setSuccess);
            }}>
            Send Reset Password Link
          </button>
        </Account>
      )}
    </OptionWrapper>
  );
};

export default ChangePassword;
