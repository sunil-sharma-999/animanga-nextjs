import { useRouter } from 'next/router';
import React from 'react';
import { MdNavigateBefore } from 'react-icons/md';

const BackButton = () => {
  const router = useRouter();
  return (
    <div>
      <div className="arrows flex self-center w-full sticky mt-4">
        <p
          className="bg-white py-2 px-3 text-xl text-black cursor-pointer rounded-sm hover:bg-purple-500 hover:text-white"
          onClick={() => router.back()}>
          <MdNavigateBefore />
        </p>
      </div>
    </div>
  );
};

export default BackButton;
