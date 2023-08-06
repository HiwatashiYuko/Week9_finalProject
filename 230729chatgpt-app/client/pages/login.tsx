// chatGPT様のコード

// login.tsx
import React, { useState } from 'react';
import { auth } from '../firebase/config'; // authをインポート
// import { useNavigate } from 'react-router-dom'; // Import useNavigate ルーティングに使用
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import firebaseConfig from '../firebase/config'; // firebase/config.tsの相対パスを指定
import { useRouter } from 'next/router'; // Import useRouter

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
    <div>
      <h1>ログイン</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" />
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={handleGoogleLogin}>Googleでログイン</button>
    </div>
  );
};

export default Login;
