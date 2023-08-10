import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout';
import React from 'react';
// import firebase from './firebase/config'; // firebaseディレクトリからconfig.jsをインポート
import 'firebase/auth';

// Firebaseの初期化コードはここで実行
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
