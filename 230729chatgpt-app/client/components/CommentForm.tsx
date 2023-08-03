// components/CommentForm.tsx

import { useState, FormEvent } from 'react';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
}

function CommentForm({ onSubmit }:CommentFormProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="コメントを入力してください"
        rows={4}
        cols={100}
      />
      <button type="submit">入力完了</button>
    </form>
  );
};

export default CommentForm;
