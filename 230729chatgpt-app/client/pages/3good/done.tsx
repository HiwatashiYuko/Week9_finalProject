// // pages/3good/done.tsx

// import React, { useEffect } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { useRouter } from 'next/router';
// import { auth } from '../../firebase/config';
// import styles from '../.././styles/done.module.css';

// const ThreeGoodDonePage = () => {
//   const router = useRouter();
  
//   useEffect(() => {
//     // Firebaseの初期化
//     const auth = getAuth();
//     // ログイン状態の変更を監視
//     const unsubscribe = onAuthStateChanged(auth, user => {
//       if (!user) {
//         // ログインしていない場合、ログインページにリダイレクト
//         router.push('/login'); // ログインページのURLに置き換える
//       }
//     });

//     return () => unsubscribe();
//   }, [auth, router]);

//   return (
//     <div className={styles.container}>
//       <h1>「いいこと」や「がんばったこと」が記録されました！</h1>
//       <p>よくがんばりましたね。</p>
//       <img src="/images/940.png" alt="bouquet" className={styles.image} />
//       <img src="/images/910.png" alt="bouquet" className={styles.kurukuru} />
//     </div>
//   );
// };

// export default ThreeGoodDonePage;

// pages/3good/done.tsx

import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/config';
import styles from '../.././styles/done.module.css';

const ThreeGoodDonePage = () => {
  const router = useRouter();
  const [isAnimated, setIsAnimated] = useState(false); // アニメーションの状態

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    // アニメーションをトリガーするタイミングでisAnimatedをtrueに設定
    setIsAnimated(true);

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <div className={styles.container}>
      <h1>「いいこと」や「がんばったこと」が記録されました！</h1>
      <p>よくがんばりましたね。</p>
      <div className={styles.imageContainer}>
        <img src="/images/940.png" alt="bouquet" className={styles.image} />
        <img
          src="/images/910.png"
          alt="bouquet"
          className={`${styles.kurukuru} ${isAnimated ? styles['is-animated'] : ''}`}
        />
      </div>
    </div>
  );
};

// const container = document.querySelector('.container');
// const kurukuru = document.querySelector('.kurukuru');

// // 楕円の半径
// const radiusX = container.clientWidth / 2;
// const radiusY = container.clientHeight / 2;

// // ランダムな角度を生成
// const randomAngle = Math.random() * 2 * Math.PI;

// // 楕円内のランダムな座標を計算
// const x = radiusX * Math.cos(randomAngle);
// const y = radiusY * Math.sin(randomAngle);

// // .kurukuru 要素の位置を設定
// kurukuru.style.left = `${radiusX + x}px`;
// kurukuru.style.top = `${radiusY + y}px`;

// // .kurukuru 要素にアニメーションクラスを追加
// kurukuru.classList.add('is-animated');

export default ThreeGoodDonePage;
