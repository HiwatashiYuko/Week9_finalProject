import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';


const Header = () => {
  const router = useRouter();
  const auth = getAuth();
  const [userName, setUserName] = useState('');
  const [quote, setQuote] = useState('');

  const handleLogout = async () => { 
    try {
      await signOut(auth); // ログアウト処理
      router.push('/login');
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  // ログインページとサインアップページではヘッダーを表示しない
  // if (router.pathname === '/login' || router.pathname === '/signup') {
  //   return null;
  // }
  
  let headerContent = null;
  if (router.pathname !== '/login' && router.pathname !== '/signup' && router.pathname !== '/') {
    headerContent = (
      <>
        <h1 className="font-ubuntu font-bold text-6xl text-yellow-520 text-center">CHEER ME</h1>
        <p className="mx-8 font-kiwi">ようこそ、{userName}さん</p>
        <p className="text-2xl text-center font-kiwi">{quote}</p>
        <div className="flex justify-between m-3 font-kiwi">
          <div>
            <Link href="/home">ほめてもらう</Link>
          </div>
          <div>
            <Link href="/3good">今日の良かったことを記録する</Link>
          </div>
          <div>
            <Link href="/calendarpage">今までの良かったことを見る</Link>
          </div>
          <div>
            <Link href="/progress">「小さな目標」の進みを確認</Link>
          </div>
          <div>
            {/* ログアウトボタンを追加 */}
            <button onClick={handleLogout}>ログアウト</button>
          </div>
        </div>
      </>
    );
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            // console.log(uid)
            try {
              const response = await fetch(`http://localhost:8000/users/${uid}`);
              const data = await response.json();
              // console.log(data)
              setUserName(data.user_name);
            } catch (error) {
              console.error('APIエラー（ユーザー名）:', error)
            }
          }
        });
        
      } catch (error) {
        console.error('onAuthStateChangedエラー:', error)
      }
    };

    fetchUserData();

    fetch('http://localhost:8000/quotes')
      .then(response => response.json())
      .then(data => {
        setQuote(data.quote);
      })
      .catch(error => {
        console.error('APIエラー:', error);
      });
  }, []);

  return (
    <header className="bg-green-510 sticky top-0">
      {headerContent}
    </header>
  );
};


export default Header;

