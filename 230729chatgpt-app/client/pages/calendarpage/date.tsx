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


import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


export default function MyCalendar({ initialDate, onDateSelect }) {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

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
      initialDate={initialDate}
      validRange={{ start, end }}
      contentHeight="auto"
      dateClick={(info) => {
        if (typeof onDateSelect === 'function') {
          onDateSelect(info.dateStr);
        }
      }}
    />
    </div>
  );
}