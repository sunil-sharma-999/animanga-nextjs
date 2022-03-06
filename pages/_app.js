import { Provider } from 'react-redux';
import '../styles/globals.css';
import { store } from '../store/store';
import Head from 'next/head';
import Navbar from '../components/navbar/Navbar';
import useAuthCheck from '../hooks/useAuthCheck';
import useGetDoc from '../hooks/useGetDoc';

function MyApp({ Component, pageProps }) {
  useAuthCheck();
  useGetDoc('users');
  return (
    <>
      <Head>
        <title>Animanga</title>
      </Head>
      <Provider store={store}>
        <div className="app bg-black/90 min-h-screen my-auto flex flex-col items-center">
          <Navbar />
          return <Component {...pageProps} />;
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
