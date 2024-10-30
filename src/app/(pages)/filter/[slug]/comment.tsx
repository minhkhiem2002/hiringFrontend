import React, { useState } from 'react';
import { Pagination, Button } from '@mui/material'; 
import Image from 'next/image'; 

const initialComments = [
  {
    id: 1,
    userName: 'Nguyễn Văn A',
    userAvatar: 'https://res.cloudinary.com/dfjlzjnog/image/upload/v1729387360/vzlorzzypfckcbdeh3b7.jpg',
    content: 'Bình luận đầu tiên!',
    date: '2024-10-25',
  },
  {
    id: 2,
    userName: 'Trần Thị B',
    userAvatar: 'https://res.cloudinary.com/dfjlzjnog/image/upload/v1729387360/vzlorzzypfckcbdeh3b7.jpg',
    content: 'Rất hay, cảm ơn bạn!',
    date: '2024-10-26',
  },
];

const commentsPerPage = 5;

const CommentSection = () => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalComments = comments.length;

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: totalComments + 1,
        userName: 'Người dùng', 
        userAvatar: 'https://res.cloudinary.com/dfjlzjnog/image/upload/v1729387360/vzlorzzypfckcbdeh3b7.jpg',
        content: newComment,
        date: new Date().toISOString().split('T')[0],
      };

      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment('');
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const getCurrentComments = () => {
    const startIndex = (currentPage - 1) * commentsPerPage;
    return comments.slice(startIndex, startIndex + commentsPerPage);
  };

  return (
    <div>
      {getCurrentComments().map((comment) => (
        <div key={comment.id} className="flex items-start bg-gray-100 rounded-md p-4 shadow-sm">
          <Image
            alt="User avatar"
            src={comment.userAvatar}
            className="w-10 h-10 rounded-full mr-3"
            width={40}
            height={40}
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <p className="font-semibold">{comment.userName}</p>
              <p className="text-gray-500 text-sm">{comment.date}</p>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-4">
        <Pagination count={Math.ceil(totalComments / commentsPerPage)} onChange={handlePageChange} />
      </div>
      <div className="mt-6">
        <textarea
          placeholder="Thêm bình luận của bạn..."
          className="w-full border border-gray-300 rounded-md p-2 resize-none"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          className="mt-2 bg-[#31AAB7] text-white"
          onClick={handleAddComment}
        >
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
