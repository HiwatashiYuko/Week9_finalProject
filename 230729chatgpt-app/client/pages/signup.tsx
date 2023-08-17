import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { app } from '../firebase/config';
import styles from '../styles/Signup.module.css';
import { useRouter } from 'next/router';
// import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState(''); 

  const auth = getAuth(app);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ユーザー名を表示名として設定
      await updateProfile(user, {
        displayName: userName
      });

      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: userName,
          uid: user.uid
        })
      });

      const responseBody = await response.json();  // JSONデータを読み取る

      console.log(responseBody);

      if (response.status === 200) {
        alert('会員登録が完了しました！');
        setEmail('');
        setPassword('');
        setUserName('');
        router.push('/home');
      } else {
        alert('会員登録に失敗しました。');
      }
    } catch (error) {
      console.error("会員登録エラー:", error);
      alert('会員登録に失敗しました。');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/home'); 
      alert('会員登録が完了しました！');
    } catch (error) {
      alert('Googleログインに失敗しました。');
    }
  };

  return (
    <div>
      <div className={styles.header}>
      <h1 className={styles.title}><strong>CHEER ME</strong></h1>
      <img src="/images/632.png" alt="bouquet" className={styles.image} />
      </div>
      <h2 className={styles.copy}>まいにち頑張っている私を、ほめてあげて、いたわってあげましょう。</h2>
      <div className={styles.item}>
      <div className={styles.container}>
        <p>自分の能力に自信が持てず、毎日が不安…。</p>
        <p>いつか怠けている自分に周囲が気付くのではないか…。</p>
        <p>家事、仕事、育児。自分なりに考えて一生懸命に頑張っているけど、感謝されない…。</p>
        <p>自分のことを褒めるのは苦手…。</p>
        <p>そんなあなたに。</p>
        </div>
        <img src="/images/746.png" alt="bouquet" className={styles.image} />
      </div>  
      <h2 className={styles.copy}>明日いちにち、自信をもって過ごせますように。</h2>

      <div className={styles.container}>
      <div className={styles.item}>
        <p>今日いちにちの出来事をつぶやいて、AIにほめてもらえます。</p>
        <img src="/images/1397.png" alt="Image1" className={styles.png} />
        </div>
        <div className={styles.item}>
        <p>今日の「いいこと」を、３つふりかえってみましょう。</p>
        <img src="/images/795.png" alt="Image2" className={styles.png} />
        </div>
        <div className={styles.item}>
        <p>毎日がんばってきたことが記録できるので、ふりかえってみましょう。</p>
        <img src="/images/1417.png" alt="Image3" className={styles.png} />
        </div>
        <div className={styles.item}>
        <p>「ちいさな目標」を立てて、進んでいく自分を確認してみましょう。</p>
        <img src="/images/807.png" alt="Image4" className={styles.png} />
        </div>
      </div>
      <div className={styles.header}>
      <h2 className={styles.copy}>私って、がんばってるかも。</h2>
      <img src="/images/1012.png" alt="Image3" className={styles.refresh} />
      </div>
      <div className={styles.container}>
        <p>あなたのこころが少しでも軽くなってくれたらうれしいです。</p>
        <p>お試し期間の7日後に、有料期間がはじまります。(月額料金300円)</p>
      
        <h3 className={styles.color}>会員登録はこちらから</h3>
        <input
        type="text"
        value={userName} // ユーザー名の状態変数をvalueにセット
        onChange={(e) => setUserName(e.target.value)} // 状態変数を更新するハンドラ
        placeholder="ユーザー名"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
      />
      <button className={styles.signup_button}onClick={handleSignup}>登録する</button>
      <button className={styles.google_button}onClick={handleGoogleLogin}>Googleアカウントで登録</button>
      </div>
    </div>
  )
}

export default Signup;
