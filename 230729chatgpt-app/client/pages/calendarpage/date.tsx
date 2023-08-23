// pages/calendar/[date].tsx
// import React from 'react';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { getRecordByDate } from '../../api'; // その日の記録を取得するための関数をインポート

// const CalendarDatePage = () => {
//   const [record, setRecord] = useState([]);
//   const router = useRouter();
//   const { date } = router.query;

//   // date を使ってその日の記録を取得する処理
//   // const record = getRecordByDate(date);
//   useEffect(() => {
//     if (date) {
//       getRecordByDate(date).then(data => setRecord(data));
//     }
//   }, [date]);


//   return (
//     <div>
//       <h1>{date} の記録</h1>
//       <ul>
//         {record.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CalendarDatePage;

import FullCalendar, { FullCalendarProps } from '@fullcalendar/react';
// import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import { Calendar, dayGridPlugin } from '@fullcalendar/core';



export default function MyCalendar({ initialDate, onDateSelect }: FullCalendarProps) {
  const today = initialDate || new Date(); // initialDateが指定されていない場合は、今日の日付を使用する
  const start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 3, 0);

  return (
    // <div>
    //   <FullCalendar
    //     plugins={[dayGridPlugin]}
    //     initialView="dayGridMonth"
    //     initialDate={today}
    //     validRange={{ start, end }}
    //   />
    // </div>
    <div className="overflow-hidden" style={{ backgroundColor: 'white',height: '64vh'}}>
    <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        initialDate={today}
        // validRange={{ start: '2023-01-01', end: '2023-12-31' }}
        validRange={{ start: '2023/01/01', end: '2023/12/31' }}
        contentHeight="auto"
        dateClick={(info: any) => {
          console.log('Date clicked: ' + info.dateStr);
          if (onDateSelect) {
            onDateSelect(info.dateStr);
          }
        }}
      />
    </div>
  );
}