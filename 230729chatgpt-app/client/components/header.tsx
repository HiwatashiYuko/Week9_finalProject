import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAuth, signOut } from 'firebase/auth';


const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    
    const auth = getAuth(); // authオブジェクトを取得
    try {
      await signOut(auth); // ログアウト処理
      router.push('/login');
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  // ログインページとサインアップページではヘッダーを表示しない
  if (router.pathname === '/login' || router.pathname === '/signup') {
    return null;
  }
  const [quote, setQuote] = useState('');
  useEffect(() => {
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
      <h1 className="font-ubuntu font-bold text-6xl text-yellow-520 text-center">CHEER ME</h1>
      <p className="text-2xl font-yomogi text-center">{quote}</p>
      <div className="flex justify-between mt-2">
        <div>
          <Link href="/home">ほめてもらう</Link>
        </div>
        {/* リンク要修正 */}
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
    </header>
  );
};


export default Header;

