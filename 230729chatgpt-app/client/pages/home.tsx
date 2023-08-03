import React, { useState } from 'react';
import CommentForm from '../components/CommentForm';

const HomePage = () => {
  const [praiseList, setPraiseList] = useState<{ comment: string; praise: string }[]>([]);

  const handleSubmitComment = async (comment: string) => {
    try {
      // APIエンドポイントにコメントを送信
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error('エラーが発生しました');
      }

      // APIからほめられるコメントを取得
      const data = await response.json();
      setPraiseList(prevList => [...prevList, {comment,praise: data.praise}]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>今日のがんばりをほめてもらう！</h1>
      <p>仕事のこと・勉強のこと・家事のこと、がんばったことを思い出してみてください</p>
      <div>
        {praiseList.map(({comment, praise}, index)=> {
            <div key={index}>
                <p>{comment}</p>
                <p>{praise}</p>
            </div>
        })}
      </div>
      <CommentForm onSubmit={handleSubmitComment} />
    </div>
  );
};

export default HomePage;