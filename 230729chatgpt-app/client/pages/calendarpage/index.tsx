import styles from '../../styles/Calendar.module.css';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../.env.local/firebase/config';
import MyCalendar from './date';
// import Calendar from "react-calendar";
// import moment from 'moment';

const MyComponent = () => {
  const date = new Date('2023-08-22');
  // const date = new Date('2023/08/22');
  const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  // const formattedDate = moment(selectedDate).format('YYYY/MM/DD');

  return (
    <div>
      <p>日付: {formattedDate}</p>
    </div>
  );
};




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

  // const CalendarWrapper = () => {
  //   return (
  //     <div>
  //       <Calendar 
  //           locale="ja-JP"
  //        />
  //     </div>
  //   );
  // };


  
  const today = new Date();
  // const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4" style={{ marginTop: '5rem', fontFamily: 'Kiwi Maru, serif', backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'orange', fontSize: '20pt', padding: '2rem' }}>今までの自分ががんばったことの記録をふりかえってみましょう</h1>

      <div className="flex flex-wrap flex-row justify-between">
        <div className="w-1/2">
          <MyCalendar initialDate={today} dateClick={handleDateChange} />
        </div>
        <div className="w-1/2 mt-4 md:mt-0 pl-4">
          <p style={{ fontFamily: 'Kiwi Maru, serif', fontSize: '1.25rem' ,color:'#696969' }}>今までの「いいこと」や「がんばったこと」</p>
          <div style={{ border: '2px solid #f7a65e', padding: '1rem', width: '100%', height: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
            <p>選択された日付: {selectedDate.toLocaleDateString('ja-JP')}</p>
            <ol>
              <li style={{ fontFamily: 'Kiwi Maru, serif', color: '#333' }}>草むしりがんばった</li>
              <li style={{ fontFamily: 'Kiwi Maru, serif', color: '#333' }}>子どもとしっかり遊んだ</li>
              <li style={{ fontFamily: 'Kiwi Maru, serif', color: '#333' }}>暑い日でも料理を作った</li>
            </ol>
          </div>
          <img src="/images/765.png" alt="present" width="200vh" height="200vh" style={{ backgroundColor:'rgba(255, 255, 255, 0.5)', marginTop: '10rem' }} />

        </div>
      </div>
    </div>
  );
};

export default CalendarPage;