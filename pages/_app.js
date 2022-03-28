import { Provider } from 'react-redux';
import '../styles/globals.css';
import { store } from '../store/store';
import Head from 'next/head';
import Navbar from '../components/navbar/Navbar';
import Auth from '../components/auth/Auth';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Animanga</title>
      </Head>
      <Provider store={store}>
        <div className="app bg-black/90 min-h-screen my-auto flex flex-col items-center">
          <Navbar />
          <Auth Component={Component} {...pageProps} />
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
