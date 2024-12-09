import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import Image from 'next/image';
import { useUserStore } from '@/services/store/userStore';
import { useEquipmentStore } from '@/services/store/equipmentStore';

interface CommentData {
  customerId: string | null;
  customerName?: string;
  sportFieldId: string;
  comment: string;
  numberOfStar: number;
  avatar?: string;
}

const commentsPerPage = 5;

const CommentSection = () => {
  const equipment = useEquipmentStore(state => state.equipment);
  const [comments, setComments] = useState<CommentData[]>([]); // Correct type for comments
  const [currentPage, setCurrentPage] = useState(1);
  const info = useUserStore((state) => state.userInfo);
  const totalComments = comments.length;

  useEffect(() => {
    if (equipment) {
      setComments(equipment.ratings);
    }
  }, [equipment]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const getCurrentComments = () => {
    const startIndex = (currentPage - 1) * commentsPerPage;
    return comments.slice(startIndex, startIndex + commentsPerPage);
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>★</span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white p-8 mt-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Đánh giá và Bình luận</h2>
      
      {getCurrentComments().map((comment, index) => (
        <div key={index} className="flex items-start bg-gray-50 rounded-lg p-6 mb-4 shadow-lg border border-gray-300">
          <Image
            alt="User avatar"
            src={comment.avatar || info?.avatar || '/default-avatar.png'} // Default avatar fallback
            className="w-14 h-14 rounded-full mr-6"
            width={56}
            height={56}
          />
          <div className="flex flex-col w-full">
              <div className="flex justify-between mb-3">
                <p className="text-xl font-semibold text-gray-900"> {comment.firstName} {comment.lastName}</p>
                <p className="text-gray-900 text-lg"> Size: {comment.sizeValue}   Màu: {comment.colorName}</p>
                <p className="text-yellow-500 text-lg">{renderStars(comment.startRating)}</p>
              </div>
              <p className="text-gray-700">{comment.comment}</p>
            </div>
        </div>
      ))}

      <div className="flex justify-center mt-6">
        <Pagination count={Math.ceil(totalComments / commentsPerPage)} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default CommentSection;
