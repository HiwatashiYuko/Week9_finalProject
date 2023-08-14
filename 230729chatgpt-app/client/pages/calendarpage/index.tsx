import styles from '../../styles/Calendar.module.css';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/config';

const CalendarPage = () => {
  
  const [selectedDate, setSelectedDate] = useState(new Date()); // 選択した日付を格納する state
  const router = useRouter();

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

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  return (
    <div className={styles.container}>
      <h1>がんばったこと、よかったこと記録をふりかえってみましょう</h1>
      
          <input 
          type="date"
          value={selectedDate.toISOString().substr(0, 10)} // YYYY-MM-DD 形式に変換
          onChange={handleDateChange} // 日付が変更されたときに呼び出される関数を指定
        />
       
      
    </div>
  );
};

export default CalendarPage;
