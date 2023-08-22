import styles from '../../styles/Calendar.module.css';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/config';
import MyCalendar from './date';

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

  const handleDateChange = (dateStr) => {
    console.log(dateStr);
    setSelectedDate(new Date(dateStr));
    router.push(`/calendar/${dateStr}`);
  };

  // const handleDateChange = (e) => {
  // //   setSelectedDate(new Date(e.target.value));
  // setSelectedDate(new Date(e.target.value));
  // router.push(`/calendar/${e.target.value}`);
  // };

  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  return (
    <div className="container mx-auto px-4">
        {/* {user_name && (
        <h2 className="text-lg font-bold mb-2">{`${user_name}さんのページ`}</h2>
      )} */}
           <h1 className="text-2xl font-bold mb-4">がんばったこと、よかったこと記録をふりかえってみましょう</h1>
           <div className="flex flex-wrap flex-row justify-between">
        <div className="w-1/2">
          {/* <MyCalendar initialDate={today} onDateSelect={handleDateChange} /> */}
          <MyCalendar initialDate={new Date()} onDateSelect={handleDateChange} />
        </div>
        <div className="w-1/2 mt-4 md:mt-0 pl-4">
          <div style={{ border: '2px solid #f7a65e', padding: '1rem', width: '100%', height: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <p style={{ fontSize: '1.25rem' }}>今までにがんばってきたこと</p>
            <p>選択された日付: {selectedDate.toLocaleDateString()}</p>
            <ol>
            <li style={{ color: '#333' }}>草むしりがんばった</li>
            <li style={{ color: '#333' }}>運動を続けた</li>
            <li style={{ color: '#333' }}>新しい料理を作ってみた</li>
            </ol>
          </div>
        </div>
      <img src="/images/765.jpg"  />
      </div>
    </div>
  );
};



export default CalendarPage;
