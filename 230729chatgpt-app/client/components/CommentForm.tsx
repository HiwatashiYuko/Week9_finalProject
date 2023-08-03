// components/CommentForm.tsx

import { useState, FormEvent } from 'react';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="コメントを入力してください"
        rows={4}
        cols={100}
      />
      <button type="submit">入力完了</button>
    </form>
  );
};

export default CommentForm;
