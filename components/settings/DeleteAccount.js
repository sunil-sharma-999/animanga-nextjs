import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserHandler } from '../../helper/authHelperFunc';
import Input from '../form/Input';
import Account from '../UI/Account';
import OptionWrapper from './OptionWrapper';

export const DeleteAccount = ({
  setsettingState,
  settingState,
  initialSettingState,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!settingState['delete'] && error) {
      setError(false);
    }
  }, [settingState, error]);

  return (
    <OptionWrapper
      option="delete"
      label="Delete Account"
      setsettingState={setsettingState}
      initialSettingState={initialSettingState}
      settingState={settingState}>
      {settingState.delete && (
        <Account loading={loading} error={error}>
          <form
            className="flex flex-col  text-black gap-4 pb-2"
            onSubmit={async (e) => {
              await deleteUserHandler(e, setLoading, setError, dispatch);
            }}>
            <Input
              label="Email"
              name="email"
              placeholder="test@test.com"
              required={true}
              type="email"
            />
            <Input
              label="Password"
              name="password"
              placeholder="* * * * * * *"
              required={true}
              type="password"
            />
            <button className="bg-red-500 text-white rounded-md w-max m-auto py-2 px-4">
              Confirm
            </button>
          </form>
        </Account>
      )}
    </OptionWrapper>
  );
};

export default DeleteAccount;
