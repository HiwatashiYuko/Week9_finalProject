import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { app } from '../firebase/config';
import styles from '../styles/Signup.module.css';
import { useRouter } from 'next/router';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState(''); 

  const auth = getAuth(app);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ユーザー名を表示名として設定
      await updateProfile(user, {
        displayName: displayName
      });

      // 決済Linkのウィンドウを開く　TODO：URLパラメータclient_reference_idにuser_idを渡す
      const stripePaymentLinkUrl = `https://buy.stripe.com/test_00gdUkcZNfVIe7C289?prefilled_email=${email}`;
      window.open(stripePaymentLinkUrl, '_blank')

      alert('会員登録が完了しました！');
       // 会員登録成功後に入力欄をリセット
       setEmail('');
       setPassword('');
       setUsername('');
       router.push('/home');
    } catch (error) {
      console.error("会員登録エラー:", error);
      alert('会員登録に失敗しました。');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // ログインが成功した場合、次に遷移するページにリダイレクト
      const stripePaymentLinkUrl = `https://buy.stripe.com/test_00gdUkcZNfVIe7C289`;
      window.open(stripePaymentLinkUrl, '_blank')

      router.push('/home'); // Redirect to /home on successful Google login
      alert('会員登録が完了しました！');
    } catch (error) {
      alert('Googleログインに失敗しました。');
    }
  };

  return (
    <div>
      <h1 className={styles.title}><strong>CHEER ME</strong></h1>
      <h2 className={styles.copy}>まいにち頑張っている私を、ほめてあげて、いたわってあげましょう。</h2>
      <div className={styles.container}>
        <p>自分の能力に自信が持てず、毎日が不安…。</p>
        <p>いつか怠けている自分に周囲が気付くのではないか…。</p>
        <p>家事、仕事、育児。自分なりに考えて一生懸命に頑張っているけど、感謝されない…。</p>
        <p>自分のことを褒めるのは苦手…。</p>
        <p>そんなあなたに。</p>
      </div>  
      <h2 className={styles.copy}>明日いちにち、自信をもって過ごせますように。</h2>

      <div className={styles.container}>
        <p>今日いちにちの出来事をつぶやいて、AIにほめてもらえます。</p>
        <p>今日の「いいこと」を、３つふりかえってみましょう。</p>
        <p>毎日がんばってきたことが記録できるので、ふりかえってみましょう。</p>
        <p>「ちいさな目標」を立てて、進んでいく自分を確認してみましょう。</p>
      </div>
      <h2 className={styles.copy}>私って、がんばってるかも。</h2>
      <div className={styles.container}>
        <p>あなたのこころが少しでも軽くなってくれたらうれしいです。</p>
        <p>お試し期間の7日後に、有料期間がはじまります。(月額料金300円)</p>
      
        <h3>会員登録はこちらから</h3>
        <input
        type="text"
        value={username} // ユーザー名の状態変数をvalueにセット
        onChange={(e) => setUsername(e.target.value)} // 状態変数を更新するハンドラ
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
      <button onClick={handleSignup}>登録する</button>
      <button onClick={handleGoogleLogin}>Googleアカウントで登録</button>
      </div>
    </div>
  )
}

export default Signup;
