import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutHandler } from '../helper/authHelperFunc';
import { authActions } from '../store/slices/authSlice';
import Favorites from './Favorites';
import { motion } from 'framer-motion';

const ProfileDetail = () => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  return (
    <div className="profile text-center text-white my-4 p-4 w-full sm:max-w-screen-lg ">
      <div>
        <div
          className="card flex flex-col sm:flex-row-reverse sm:
        justify-between">
          <button
            className=" bg-white w-max mb-4 text-black py-2 px-4 self-end sm:m-0"
            onClick={() => {
              logOutHandler().then((res) => {
                dispatch(authActions.logout());
              });
            }}>
            Logout
          </button>
          {userData.username && (
            <div className="text-4xl mx-auto flex-col sm:flex-row sm:m-0 flex">
              Welcome
              <motion.h1
                className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-700 via-orange-500 to-yellow-500 filter saturate-150 brightness-110"
                initial={{ x: 100 }}
                animate={{ x: 0 }}>
                @{userData.username}
              </motion.h1>
            </div>
          )}
        </div>
        <p className="text-xl my-2 mx-[5vw] sm:max-w-none">
          Now you can track your favorite Manga and Anime !!!
        </p>
        <Favorites data={userData.favorites} />
      </div>
    </div>
  );
};

export default ProfileDetail;
