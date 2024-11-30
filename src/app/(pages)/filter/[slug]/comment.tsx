import React, { useState, useEffect } from 'react';
import { Pagination, Button } from '@mui/material';
import Image from 'next/image';
import { useUserStore } from '@/services/store/userStore';
import { useRatingStore, useFieldStore } from '@/services/store/fieldStore';
import ModalUnlogin from "@/components/user/card-team/modal-unlogin";

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
  const field = useFieldStore(state => state.field);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    if (field) {
      setComments(field.ratings);
    }
  }, [field]);

  const info = useUserStore((state) => state.userInfo);

  const fetchRating = useRatingStore(state => state.fetchRating);

  const totalComments = comments.length;

  const [openUnlogin, setOpenUnlogin] = useState(false);

  const handleAddComment = async () => {
    const user = sessionStorage.getItem('roleId');
    if (!user) {
      setOpenUnlogin(true);
    } else {
      if (newComment.trim() && newRating > 0) {
        const newCommentData: CommentData = {
          customerId: sessionStorage.getItem('roleId'),
          sportFieldId: field.id,
          comment: newComment,
          numberOfStar: newRating,
        };

        await fetchRating(newCommentData);
        setComments((prevComments) => [...prevComments, newCommentData]);
        setNewComment('');
        setNewRating(0);
      }
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
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Đánh giá và Bình luận</h2>
      
      {getCurrentComments().map((comment, index) => (
        <div key={index} className="flex items-start bg-gray-50 rounded-lg p-6 mb-4 shadow-lg border border-gray-300">
          <Image
            alt="User avatar"
            src={comment.avatar || info?.avatar}
            className="w-14 h-14 rounded-full mr-6"
            width={56}
            height={56}
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between mb-2">
              <p className="text-xl font-semibold text-gray-900">{comment.customerName}</p>
              <p className="text-yellow-500 text-lg">{renderStars(comment.numberOfStar)}</p>
            </div>
            <p className="text-gray-700">{comment.comment}</p>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-6">
        <Pagination count={Math.ceil(totalComments / commentsPerPage)} onChange={handlePageChange} />
      </div>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Thêm bình luận của bạn</h3>
        <textarea
          placeholder="Chia sẻ cảm nhận của bạn về dịch vụ..."
          className="w-full border-2 border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#31AAB7] transition duration-200"
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex items-center mt-4">
          <label className="mr-3 text-gray-700 font-semibold">Đánh giá:</label>
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
          className="mt-6 bg-[#31AAB7] text-white w-full py-3 rounded-lg hover:bg-[#269d91] transition duration-200"
          onClick={handleAddComment}
        >
          Gửi Bình Luận
        </Button>
      </div>

      <ModalUnlogin open={openUnlogin} onClose={() => setOpenUnlogin(false)} />
    </div>
  );
};

export default CommentSection;
