import React from 'react';
import useAuthCheck from '../../hooks/useAuthCheck';
import useGetDoc from '../../hooks/useGetDoc';

const Auth = ({ Component, pageProps }) => {
  useAuthCheck();
  useGetDoc('users');
  return <Component {...pageProps} />;
};

export default Auth;
