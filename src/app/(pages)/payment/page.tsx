'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import Navbar from "@/components/user/main-nav";

const OrderSuccessPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    // Lấy giá trị `status` từ URL
    const status = searchParams.get("status");
    setPaymentStatus(status || null);

    if (status === "success") {
      // Hiệu ứng confetti khi thành công
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [searchParams]);

  const renderContent = () => {
    if (paymentStatus === "success") {
      return (
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-green-100 text-center">
          <div className="text-6xl text-green-500 mb-4">✅</div>
          <h1 className="text-2xl font-bold text-green-700 mb-2">Đặt hàng thành công</h1>
          <p className="text-sm text-gray-600">
            Hệ thống đã ghi nhận thông tin đơn hàng của bạn.
          </p>
        </div>
      );
    } else if (paymentStatus === "false") {
      return (
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-red-100 text-center">
          <div className="text-6xl text-red-500 mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-700 mb-2">Đặt hàng thất bại</h1>
          <p className="text-sm text-gray-600">
            Có lỗi xảy ra trong quá trình xử lý đơn hàng. Vui lòng thử lại.
          </p>
        </div>
      );
    } else {
      return (
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-100 text-center">
          <div className="text-6xl text-gray-500 mb-4">ℹ️</div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Bạn chưa thanh toán đơn hàng nào</h1>
          <p className="text-sm text-gray-600">
            Hãy quay lại và đặt hàng để trải nghiệm dịch vụ của chúng tôi.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-screen bg-[#F9F9F9] flex flex-col">
      {/* Navbar */}
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center px-4">
        {renderContent()} {/* Render nội dung theo trạng thái */}
        <div className="flex justify-center mt-6 space-x-4">
          {/* Button quay lại trang chủ */}
          <Button
            className="bg-[#21717A] text-white"
            onClick={() => router.push("/")}
          >
            Trang Chủ
          </Button>
          {paymentStatus && (
            <Button
              className="bg-gray-400 text-white"
              onClick={() => router.push("/user/order")}
            >
              Lịch sử mua hàng
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
