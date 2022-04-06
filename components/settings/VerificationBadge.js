import { sendEmailVerification } from 'firebase/auth';
import React, { useRef } from 'react';
import { GoVerified } from 'react-icons/go';

const VerificationBadge = ({ emailVerified }) => {
  const verifRef = useRef();
  return (
    <div className="text flex items-center text-md">
      <GoVerified
        className={`mr-2 text-3xl ${
          emailVerified ? 'text-green-500' : 'text-red-500'
        }`}
      />
      {emailVerified ? (
        <p>Verified Account</p>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <button
            ref={verifRef}
            className="bg-green-500 text-lg px-2 py-1 rounded-sm"
            onClick={() =>
              sendEmailVerification(auth.currentUser)
                .then((res) => {
                  verifRef.current.textContent = 'Email Sent';
                  verifRef.current.classList.remove('bg-red-500');
                })
                .catch((error) => {
                  verifRef.current.textContent =
                    'Error Occured! Try again later!';
                  verifRef.current.classList.add('bg-red-500');
                })
            }>
            Get Verification Email
          </button>
        </div>
      )}
    </div>
  );
};

export default VerificationBadge;
