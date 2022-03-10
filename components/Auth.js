import React from 'react';
import useAuthCheck from '../hooks/useAuthCheck';
import useGetDoc from '../hooks/useGetDoc';

const Auth = ({ Component, pageProps }) => {
  const authProp = useAuthCheck();
  useGetDoc('users');
  return <Component {...pageProps} authProp={authProp} />;
};

export default Auth;
