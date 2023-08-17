import React from 'react';
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
  
  return (
    <header className="bg-green-510 sticky top-0">
      <h1 className="font-bold text-8xl text-yellow-520 text-center">Cheer Me</h1>
      <div className="flex justify-between">
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

