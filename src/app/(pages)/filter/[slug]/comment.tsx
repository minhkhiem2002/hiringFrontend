import React, { useState, useEffect } from 'react';
import { Pagination, Button } from '@mui/material';
import Image from 'next/image';
import { useUserStore } from '@/services/store/userStore';
import { useRatingStore,useFieldStore } from '@/services/store/fieldStore';

interface CommentData {
  customerId: string | null;
  customerName?: string;
  sportFieldId: string;
  comment: string;
  numberOfStar: number;
  avatar?: string | undefined;
}

interface CommentSectionProps {
  id: string;
  comments: CommentData[] | null;
}

const commentsPerPage = 5;

const CommentSection = () => {
  const field = useFieldStore(state => state.field)

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    if (field) {
      setComments(field.ratings)
    }
  }, [field])

  const info = useUserStore((state) => state.userInfo);

  const fetchRating = useRatingStore(state=> state.fetchRating)

  const totalComments = comments.length;

  const handleAddComment = async () => {
    if (newComment.trim() && newRating > 0) {
      const newCommentData: CommentData = {
        customerId: sessionStorage.getItem('roleId'),
        sportFieldId: field.id,
        comment: newComment,
        numberOfStar: newRating,
      };

      await fetchRating(newCommentData)
      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment('')
      setNewRating(0);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const getCurrentComments = () => {
    const startIndex = (currentPage - 1) * commentsPerPage;
    return comments.slice(startIndex, startIndex + commentsPerPage);
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div>
      {getCurrentComments().map((comment, index) => (
        <div key={index} className="flex items-start bg-gray-100 rounded-md p-4 shadow-sm mb-2">
          <Image
            alt="User avatar"
            src={comment.avatar || info?.avatar}
            className="w-10 h-10 rounded-full mr-3"
            width={40}
            height={40}
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <p className="font-semibold">{comment.customerName}</p>
              <p className="text-yellow-500 text-sm">{renderStars(comment.numberOfStar)}</p>
            </div>
            <p className="text-gray-700">{comment.comment}</p>
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
        <div className="flex items-center mt-2">
          <label className="mr-2">Đánh giá:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${star <= newRating ? 'text-yellow-500' : 'text-gray-300'}`}
              onClick={() => setNewRating(star)}
            >
              ★
            </span>
          ))}
        </div>
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
