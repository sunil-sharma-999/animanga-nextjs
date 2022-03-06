import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = ({ type }) => {
  return (
    <>
      {!type && (
        <AiOutlineLoading3Quarters className="text-purple-400 animate-spin text-3xl mx-auto" />
      )}
      {!!type && (
        <div className="w-full h-1 bg-gradient-to-r from-purple-500 via-red-500 to-purple-500 filter bg-[length:200px] animate-progres my-2" />
      )}
    </>
  );
};

export default Loading;
