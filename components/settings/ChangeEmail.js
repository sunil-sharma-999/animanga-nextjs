import React, { useState } from 'react';
import { changeEmailHandler } from '../../helper/authHelperFunc';
import Input from '../form/Input';
import Account from '../UI/Account';
import OptionWrapper from './OptionWrapper';

export const ChangeEmail = ({
  setsettingState,
  settingState,
  initialSettingState,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  return (
    <OptionWrapper
      option="changeEmail"
      label="Change Email"
      setsettingState={setsettingState}
      initialSettingState={initialSettingState}
      settingState={settingState}>
      {settingState.changeEmail && (
        <div className="mb-4">
          <Account loading={loading} error={error}>
            {success && (
              <p className="text-green-500 text-xl mb-2 text-center">
                Email Sent Succesfully!!!
                <p className="text-black/80 text-xs">
                  Click the link in New Email address to confirm
                </p>
              </p>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                changeEmailHandler(e, setLoading, setError, setSuccess);
              }}
              className="flex flex-col text-black/80 gap-4">
              <Input
                label="Old Email"
                type="email"
                name="email"
                required
                placeholder="old@old.com"
              />
              <Input
                label="New Email"
                type="email"
                name="newemail"
                required
                placeholder="old@old.com"
              />
              <Input
                label="Password"
                type="password"
                name="password"
                required
                placeholder="* * * * * *"
              />
              <button className="bg-green-500 text-white rounded-md w-max m-auto py-2 px-4 justify-self-end">
                Submit
              </button>
            </form>
          </Account>
        </div>
      )}
    </OptionWrapper>
  );
};

export default ChangeEmail;
