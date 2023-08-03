// import { signIn } from 'next-auth/client';

// export default function Login() {
//   return (
//     <div>
//       {/* ログインフォーム */}
//       <input type="text" placeholder="メールアドレス" />
//         <input type="password" placeholder="パスワード" />
//       <button onClick={() => signIn('google')}>Google でログイン</button>
//     </div>
//   );
// }

// wakayoさんのこぴぺ
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import auth from '../firebase/firebase';
import styles from '../styles/login.module.css';
import Link from 'next/link';
import { Box, Flex, Input, Button, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [isAdmin, setIsAdmin] = useState(false);// 管理者であるか
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態

  const router = useRouter();

  //　ログイン
  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // フォームの送信時にページがリロードされるのを防いでいる

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // authを利用してログイン

      console.log('ログイン成功:', user);

      // ログイン成功時の処理
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      console.error('ログインエラー:', error);
      setErrorMessage('ログインに失敗しました');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // authを利用してログアウト
      setIsLoggedIn(false); // ログアウトしたらログイン状態をfalseに
      //setIsAdmin(false); //　管理者状態もfalseに
      router.push('/login'); // ルートページにリダイレクト
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { //認証の状態が変更されたらコールバック関数が呼ばれる
      if (user) {
        setIsLoggedIn(true);
        console.log('認証状態が変更されました:', user);
      } else {
        setIsLoggedIn(false);
        console.log('認証状態が変更されました: ログアウト済み');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box
      bgImage="/タブレット.jpg"
      bgSize="cover"
      bgPosition="center"
      w="100%"
      h="100vh"
      position="relative"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="rgba(0, 0, 0, 0.5)"
      />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
      >
        <Heading as="h1" size="4xl" color="white" textAlign="center">
          チャチャっと算数
        </Heading>
        {isLoggedIn && (
          <Box textAlign="center" mt={8}>
            <Text fontSize="xl" color="white">
              ログインできました！
            </Text>
            <Text fontSize="xl" color="white" mt={4}>
              問題を解く準備はできたかな？
            </Text>
            <Box mt={12}>
              <Button colorScheme="red" size="lg" mt={8} onClick={() => router.push('/question')}>
                やる気ばっちり！
              </Button>
            </Box>
            <Button colorScheme="blue" size="lg" mt={8} onClick={handleLogout}>
              やっぱり今はやめておく
            </Button>
          </Box>
        )}
        {!isLoggedIn && (
          <Box textAlign="center">
            <form onSubmit={handleLogin}>
              <Input type="email" placeholder="メールアドレス" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} mt={8} />
              <Input type="password" placeholder="パスワード" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} mt={4} />
              {errorMessage && (
                <Text fontSize="xl" color="red.500" mt={4}>
                  {errorMessage}
                </Text>
              )}
              <Button type="submit" colorScheme="blue" size="lg" mt={8}>
                ログイン
              </Button>
            </form>
            {/* <Text fontSize="xl" color="#666666" mt={4}>
              アカウントをお持ちでない方は<Link href="/signup"><a className={styles.link}>新規登録</a></Link>してください。
            </Text> */}
            <Heading as="h4" size="md" color="white" mt={8}>
            管理者画面
            </Heading>
            <Button colorScheme="green" size="lg" mt={4} onClick={() => router.push('/admin')}>
              管理者ログイン
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
}

// export default function Home() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態
  
//     const router = useRouter();
  
//     //　ログイン
//     const handleLogin = async (event: { preventDefault: () => void; }) => {
//       event.preventDefault(); // フォームの送信時にページがリロードされるのを防いでいる
  
//       try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;
//         // authを利用してログイン
  
//         console.log('ログイン成功:', user);

  
//         // ログイン成功時の処理
//         setIsLoggedIn(true);
//         setEmail('');
//         setPassword('');
//         setErrorMessage('');
//       } catch (error) {
//         console.error('ログインエラー:', error);
//         setErrorMessage('ログインに失敗しました');
//       }
//     };
  
//     const handleLogout = async () => {
//       try {
//         await signOut(auth); // authを利用してログアウト
//         setIsLoggedIn(false); // ログアウトしたらログイン状態をfalseに
//         router.push('/login'); // ルートページにリダイレクト
//       } catch (error) {
//         console.error('ログアウトエラー:', error);
//       }
//     };
  
//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (user) => { //認証の状態が変更されたらコールバック関数を呼び出す
//         setIsLoggedIn(!!user); // userオブジェクトが存在したらtrue
//       });
  
//       return () => unsubscribe();
//     }, []);

//     const backStyles = {
//         backgroundImage: "url('/タブレット.jpg')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//       };
      
      
//     return (
//         <div style={backStyles}>
//           <div className={styles.main}>
//             <h1>チャチャっと算数</h1>
//             {isLoggedIn && (
//               <div>
//                 <div>ログインに成功しました</div>
//                 <h4>問題を解く準備はできたかな？</h4>
//                 <Link href="/select">
//                 <button>やる気ばっちり！</button>
//                 </Link>
//                 <button onClick={handleLogout}>やっぱり今はやめておく</button>
//               </div>
//             )}
            
//             {!isLoggedIn && (
//               <div className="login" >
//                 <h4>ログイン</h4>
//                 <form onSubmit={handleLogin}> 
//                   <div>
//                     <label htmlFor="email">メールアドレス：</label>
//                     <input
//                       type="email"
//                       id="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="password">パスワード：</label>
//                     <input
//                       type="password"
//                       id="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>
//                   {errorMessage && <div>{errorMessage}</div>}
//                   <button type="submit">ログイン</button>
//                 </form>
//                 <h4>管理者画面</h4>
//                 <Link href="/admin">
//                 <button>管理者ログイン</button>
//                 </Link>

//               </div>
//             )}
//           </div>
//         </div>
//       );
//     }
    