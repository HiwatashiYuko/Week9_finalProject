import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/config';
import styles from '../.././styles/3Good.module.css';

const ThreeGoodThings = () => {
  const [goodThings, setGoodThings] = useState(['', '', '']);
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Firebaseの初期化
    const auth = getAuth();
    // ログイン状態の変更を監視
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        // ログインしていない場合、ログインページにリダイレクト
        router.push('/login'); // ログインページのURLに置き換える
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleInputChange = (index, value) => {
    setGoodThings(prevGoodThings => {
      const newGoodThings = [...prevGoodThings];
      newGoodThings[index] = value;
      return newGoodThings;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {

      date: selectedDate.toISOString().substr(0, 10),
      goodThings: goodThings,
    
    };

  try {
    const data = {
      // threeGood_id: 'threeGood_id',
      date: formData.date,
      good_thing_1: formData.goodThings[0],
      good_thing_2: formData.goodThings[1],
      good_thing_3: formData.goodThings[2],
      // user_id: 'user_id'
    };
  
    console.log('送信するデータ:', data); 
    console.log(formData.goodThings);
    
    const response = await fetch('http://localhost:8000/api/3good', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      data,
      mode: 'cors',
      }) // この行を追加
    });
  
    console.log('レスポンス:', response);

    if (!response.ok) {
      throw new Error('エラーが発生しました');
    }
  
    const responseData = await response.json();
    console.log('成功レスポンスデータ:', responseData);
  
    // データの送信に成功した場合、入力欄をリセットする
    setGoodThings(['', '', '']);
  
    // ページ遷移などの処理を行う
    router.push('/3good/done'); // 遷移先の URL に置き換える
  } catch (error) {
    console.error('データ送信エラー:', error);
  }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="text-2xl m-3" style={{ color: '#f7a65e' }}>
        1日の中であった「いいこと」や「がんばったこと」を、<br />３つふりかえってみましょう
        </h1>
        <img src="/images/795.png" alt="bouquet" className={styles.image} />
      </div>
      <p>仕事のこと・勉強のこと・家事のこと、よかったことやがんばったことを思い出してみてください</p>
      <form onSubmit={handleSubmit}>
      <input
          type="date"
          value={selectedDate.toISOString().substr(0, 10)} // YYYY-MM-DD 形式に変換
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
        {goodThings.map((value, index) => (
          <input
            className={styles.form}
            key={index}
            type="text"
            value={value}
            onChange={e => handleInputChange(index, e.target.value)}
            placeholder={`「いいこと」「がんばったこと」${index + 1}`}
            required
          />
    
        ))}
       
       <div className={styles.item}>
        <button  className={styles.buttonStyle}type="submit">記録する</button>
        <img src="/images/803.png" alt="Image3" className={styles.png} />
        </div>
      </form>
    
    </div>
  );
};

export default ThreeGoodThings;
