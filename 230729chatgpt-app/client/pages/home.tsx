import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import CommentForm from '../components/CommentForm';
import { useRouter } from 'next/router';
import { auth } from '../firebase/config';

const HomePage = () => {
  const [praiseList, setPraiseList] = useState<{ comment: string; praise: string }[]>([]);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    // ログイン状態の変更を監視
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        // ログインしていない場合、ログインページにリダイレクト
        router.push('/login'); // ログインページのURLに置き換える
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleSubmitComment = async (comment: string) => {
    try {
        // 一時的にコメントを表示
       setPraiseList(prevList => [...prevList, { comment, praise: '...' }]);

      // APIエンドポイントにコメントを送信
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request_data:comment }),
      });

      if (!response.ok) {
        throw new Error('エラーが発生しました');
      }

      // APIからほめられるコメントを取得
      const data = await response.json();
      console.log(data); // サーバー側の応答をコンソールログに表示
      // 前に表示したコメントを最新のレスポンスで置き換える
      setPraiseList(prevList =>
        prevList.map(item => (item.comment === comment ? { ...item, praise: data.response } : item))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl m-6">今日のがんばりをほめてもらう！</h1>
      <p>仕事のこと・勉強のこと・家事のこと、がんばったことを思い出してみてください</p>
      <div>
        {praiseList.map(({comment, praise}, index)=> {
          return (
            <div key={index}>
              <div className="flex justify-end">
                <p className="bg-grey-120 text-yellow-520 text-left rounded-xl p-4 w-2/3 mr-20 m-5 opacity-90">{comment}</p>
              </div>
              <div className="flex justify-start">
                <p className="bg-grey-120 text-green-700 text-left rounded-xl p-4 w-2/3 ml-20 my-5 opacity-90">{praise}</p>
              </div>
            </div>
          );
        })}
      </div>
      <CommentForm onSubmit={handleSubmitComment} />
    </div>
  );
};

export default HomePage;