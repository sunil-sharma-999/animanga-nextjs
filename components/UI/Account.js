import { motion } from 'framer-motion';
import React from 'react';
import Loading from './Loading';

const Account = ({ children, loading, error, type }) => {
  return (
    <div className="flex flex-col my-0 text-white w-full">
      <div className="w-max mx-auto">
        {type && (
          <motion.h1
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            className="text-5xl font-sans text-center mb-4">
            {type}
          </motion.h1>
        )}
        {!loading && !!type && (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="w-full h-1 bg-gradient-to-r from-[#EB1D02] via-[#DB00CD] to-[#500CE8]"
          />
        )}
        {loading && <Loading type={type} />}
      </div>
      {error && (
        <h1 className="text-rose-500 rounded-sm text-center py-2 my-2 ">
          {error}
        </h1>
      )}
      <br />

      {children}
    </div>
  );
};

export default Account;
