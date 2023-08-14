// chatGPT様のコード firebaseに登録されていれば、ログイン➝ページ遷移可能。

// login.tsx
import React, { useState } from 'react';
import { auth } from '../firebase/config'; 
// import { useNavigate } from 'react-router-dom'; 
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import firebaseConfig from '../firebase/config'; 
import { useRouter } from 'next/router'; 
import styles from '../styles/Login.module.css';

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
      <h1>Log in</h1>
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

// monica様のコード　axiosを使用　バックエンドへのリクエスト
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router'; // useRouterをインポート

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter(); // useRouterを初期化

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('/api/login', {
//         idToken: 'ここにIDトークンを入力'
//       });
//       const uid = response.data.uid;
//       // ログインが成功した場合、次に遷移するページにリダイレクト
//       router.push('/home');
//     } catch (error) {
//       alert('ログインに失敗しました。');
//     }
//   };

//   return (
//     <div>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>ログイン</button>
//     </div>
//   );
// };

// export default Login;

// chatGPT様のコード
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { app } from '../firebase/config';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = async () => {
//     try {
//       // Firebase Authenticationでログインを試みる
//       const auth = getAuth(app);
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
//       // ログインが成功した場合、IDトークンを取得してバックエンドに送信する
//       const idToken = await userCredential.user.getIdToken();
//       const response = await axios.post('/api/login', { idToken });

//       // バックエンドからのレスポンスを受け取り、次に遷移するページにリダイレクト
//       const uid = response.data.uid;
//       router.push('/home');
//     } catch (error) {
//       alert('ログインに失敗しました。');
//     }
//   };

//   return (
//     <div>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>ログイン</button>
//     </div>
//   );
// };

// export default Login;

// wakayoさんのコード
// import { useState, useEffect } from "react";
// import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// import { useRouter } from "next/router";
// // import auth from '../firebase/firebase';
// import styles from '../styles/login.module.css';
// import Link from 'next/link';
// import { Box, Flex, Input, Button, Heading, Text } from "@chakra-ui/react";

// export default function Home() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   // const [isAdmin, setIsAdmin] = useState(false);// 管理者であるか
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態

//   const router = useRouter();

//   //　ログイン
//   const handleLogin = async (event: { preventDefault: () => void; }) => {
//     event.preventDefault(); // フォームの送信時にページがリロードされるのを防いでいる

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       // authを利用してログイン

//       console.log('ログイン成功:', user);

//       // ログイン成功時の処理
//       setIsLoggedIn(true);
//       setEmail('');
//       setPassword('');
//       setErrorMessage('');
//     } catch (error) {
//       console.error('ログインエラー:', error);
//       setErrorMessage('ログインに失敗しました');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth); // authを利用してログアウト
//       setIsLoggedIn(false); // ログアウトしたらログイン状態をfalseに
//       //setIsAdmin(false); //　管理者状態もfalseに
//       router.push('/login'); // ルートページにリダイレクト
//     } catch (error) {
//       console.error('ログアウトエラー:', error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => { //認証の状態が変更されたらコールバック関数が呼ばれる
//       if (user) {
//         setIsLoggedIn(true);
//         console.log('認証状態が変更されました:', user);
//       } else {
//         setIsLoggedIn(false);
//         console.log('認証状態が変更されました: ログアウト済み');
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <Box
//       bgImage="/タブレット.jpg"
//       bgSize="cover"
//       bgPosition="center"
//       w="100%"
//       h="100vh"
//       position="relative"
//     >
//       <Box
//         position="absolute"
//         top="0"
//         left="0"
//         w="100%"
//         h="100%"
//         bg="rgba(0, 0, 0, 0.5)"
//       />
//       <Flex
//         direction="column"
//         alignItems="center"
//         justifyContent="center"
//         position="absolute"
//         top="0"
//         left="0"
//         w="100%"
//         h="100%"
//       >
//         <Heading as="h1" size="4xl" color="white" textAlign="center">
//           チャチャっと算数
//         </Heading>
//         {isLoggedIn && (
//           <Box textAlign="center" mt={8}>
//             <Text fontSize="xl" color="white">
//               ログインできました！
//             </Text>
//             <Text fontSize="xl" color="white" mt={4}>
//               問題を解く準備はできたかな？
//             </Text>
//             <Box mt={12}>
//               <Button colorScheme="red" size="lg" mt={8} onClick={() => router.push('/question')}>
//                 やる気ばっちり！
//               </Button>
//             </Box>
//             <Button colorScheme="blue" size="lg" mt={8} onClick={handleLogout}>
//               やっぱり今はやめておく
//             </Button>
//           </Box>
//         )}
//         {!isLoggedIn && (
//           <Box textAlign="center">
//             <form onSubmit={handleLogin}>
//               <Input type="email" placeholder="メールアドレス" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} mt={8} />
//               <Input type="password" placeholder="パスワード" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} mt={4} />
//               {errorMessage && (
//                 <Text fontSize="xl" color="red.500" mt={4}>
//                   {errorMessage}
//                 </Text>
//               )}
//               <Button type="submit" colorScheme="blue" size="lg" mt={8}>
//                 ログイン
//               </Button>
//             </form>
//             {/* <Text fontSize="xl" color="#666666" mt={4}>
//               アカウントをお持ちでない方は<Link href="/signup"><a className={styles.link}>新規登録</a></Link>してください。
//             </Text> */}
//             <Heading as="h4" size="md" color="white" mt={8}>
//             管理者画面
//             </Heading>
//             <Button colorScheme="green" size="lg" mt={4} onClick={() => router.push('/admin')}>
//               管理者ログイン
//             </Button>
//           </Box>
//         )}
//       </Flex>
//     </Box>
//   );
// }