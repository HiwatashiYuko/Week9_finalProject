// pages/3good/done.tsx

import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/config';
import styles from '../.././styles/3Good.module.css';

const ThreeGoodDonePage = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Firebaseの初期化
    const auth = getAuth();
    // ログイン状態の変更を監視
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        // ログインしていない場合、ログインページにリダイレクト
        router.push('/login'); // ログインページのURLに置き換える
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <div className={styles.container}>
      <h1>「いいこと」や「がんばったこと」が記録されました！</h1>
      <p>よくがんばりましたね。</p>
      
    </div>
  );
};

export default ThreeGoodDonePage;
