// chatGPT様のコード firebaseに登録されていれば、ログイン➝ページ遷移可能。

// login.tsx
import React, { useState } from 'react';
import { app, auth } from '../firebase/config'; 
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import firebaseConfig from '../firebase/config'; 
import { useRouter } from 'next/router'; 
import styles from '../styles/Login.module.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const auth = getAuth(app); // authオブジェクトを取得
  // const navigate = useNavigate(); // useNavigateを使用
    const router = useRouter(); // Initialize useRouter

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // ログインが成功した場合、次に遷移するページにリダイレクト
      router.push('/home');
    } catch (error) {
      alert('ログインに失敗しました。');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // ログインが成功した場合、次に遷移するページにリダイレクト
      router.push('/home'); // Redirect to /home on successful Google login
    } catch (error) {
      alert('Googleログインに失敗しました。');
    }
  };

  return (
    <div className={styles.container}>
       <div className={styles.header}>
         <h1 className={styles.title}><strong>CHEER ME</strong></h1>
         <img src="/images/632.png" alt="bouquet" className={styles.image} />
        </div>
        <h1 className={styles.login_title}>Log in</h1>
       <div className={styles['input_container']}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" />
       </div>
       <div className={styles['input_container']}>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" />
       </div>
       <div className={styles.button_container}>
          <button className={styles.login_button} onClick={handleLogin}>ログイン</button>
          <button className={styles.google_button} onClick={handleGoogleLogin}>Googleでログイン</button>
          <a className={styles.signup_button} href='/signup'>新規会員登録はこちらへ</a>
       </div>
     </div>
  );
};

export default Login;

