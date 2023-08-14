// pages/calendar/[date].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { getRecordByDate } from '../../api'; // その日の記録を取得するための関数をインポート

const CalendarDatePage = () => {
  const router = useRouter();
  const { date } = router.query;

  // date を使ってその日の記録を取得する処理
  const record = getRecordByDate(date);

  return (
    <div>
      <h1>{date} の記録</h1>
      <ul>
        {record.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarDatePage;
