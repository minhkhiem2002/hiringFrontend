"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/user/main-nav";
import ProfileSidebar from "@/components/user/profile-sidebar";
import { useUserStore } from "@/services/store/userStore";
import { useBookingStore } from "@/services/store/bookingStore";
import { FaFilter, FaShippingFast, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { MdPendingActions, MdOutlineDone, MdError, MdAttachMoney, MdLocalShipping, MdCancel  } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import Loading from "@/components/user/loading";
import { Button } from "@/components/ui/button";
import ModalComment from './modalcomment';
import { useRouter } from 'next/navigation';

const Order = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [addCommentModal, setAddCommentModal] = useState(false)
  const [idComment, setIdComment] = useState("")

  const getInfo = useUserStore((state) => state.getInfo);
  const { orders, loading, fetchOrdersByCustomer } = useBookingStore((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = sessionStorage.getItem("email");
        if (!email) return;
        const params = {
          Email: email,
          Status: selectedStatus,
          PageSize: 5,
          PageNumber: pageNumber,
        };
        await fetchOrdersByCustomer(params);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [pageNumber, selectedStatus]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const handleFilterStatus = (status: string | null) => {
    setSelectedStatus(status);
    setPageNumber(1); 
  };

  const handleCancelOrder = (orderId: string) => {
    console.log(`Hủy đơn hàng: ${orderId}`);
  };

  const handleCommentOrder = (orderId: string) => {
    setAddCommentModal(true)
    setIdComment(orderId)
    console.log(`Bình luận đơn hàng: ${orderId}`);
  };

  const handleResetItem = (endpoint: string) => {
    router.push(`/equipment/${endpoint}`);
  };

  if (loading) return <Loading />;


  console.log('Id comment send',idComment)
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="sticky z-20">
        <Navbar />
      </div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <ProfileSidebar fullName={fullName} avatar={userAvatar} />
        <div className="flex flex-col h-full">
          <main className="flex flex-1 mt-6 flex-col gap-6 p-6 bg-white rounded-t-lg shadow-md">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <FaShippingFast />
                Quản lý đơn hàng
              </h1>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleFilterStatus(null)}
                  className={`${
                    selectedStatus === null ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                  } flex items-center gap-2 px-4 py-2 rounded-lg`}
                >
                  <FaFilter />
                  Tất cả
                </Button>
                <Button
                  onClick={() => handleFilterStatus("Pending")}
                  className={`${
                    selectedStatus === "Pending" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
                  } flex items-center gap-2 px-4 py-2 rounded-lg`}
                >
                  <FaCalendarAlt />
                  Đang xử lý
                </Button>
                <Button
                  onClick={() => handleFilterStatus("PaymentReceived")}
                  className={`${
                    selectedStatus === "PaymentReceived"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } flex items-center gap-2 px-4 py-2 rounded-lg`}
                >
                  <FaMoneyBillWave />
                  Thành công
                </Button>
                <Button
                  onClick={() => handleFilterStatus("PaymentFailed")}
                  className={`${
                    selectedStatus === "PaymentFailed" ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-600"
                  } flex items-center gap-2 px-4 py-2 rounded-lg`}
                >
                  <MdAttachMoney />
                  Thất bại
                </Button>
                <Button
                  onClick={() => handleFilterStatus("Transporting")}
                  className={`${selectedStatus === "Transporting" ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-600"} flex items-center gap-2 px-4 py-2 rounded-lg`}
                >
                  <MdLocalShipping />
                  Đang vận chuyển
                </Button>
                <Button
                  onClick={() => handleFilterStatus("Completed")}
                  className={`${selectedStatus === "Completed" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"
                    } flex items-center gap-2 px-4 py-2 rounded-lg`}
                >
                  <MdOutlineDone />
                  Đã nhận hàng
                </Button>
                <Button
                  onClick={() => handleFilterStatus("Rejected")}
                  className={`${selectedStatus === "Rejected" ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-600"} flex items-center gap-2 px-4 py-2 rounded-lg`}
                >
                  <MdCancel />
                  Đã hủy
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {orders?.orders?.length === 0 ? (
                <div className="text-center text-xl text-gray-500">Chưa có đơn đặt nào</div>
              ) : (
                <>
                  {orders?.orders?.map((order, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <FaCalendarAlt />
                            Ngày đặt: {new Date(order.orderDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                            Trạng thái:{" "}
                            <span
                              className={`font-medium px-2 py-1 rounded-lg ${
                                order.orderStatus === "Pending"
                                ? "bg-yellow-200 text-yellow-800"
                                : order.orderStatus === "PaymentReceived"
                                ? "bg-teal-100 text-teal-700"
                                : order.orderStatus === "PaymentFailed"
                                ? "bg-red-100 text-red-800" 
                                : order.orderStatus === "Transporting"
                                ? "bg-blue-100 text-blue-800"
                                : order.orderStatus === "Complete"
                                ? "bg-green-100 text-green-800"
                                : order.orderStatus === "Rejected"
                                ? "bg-pink-200 text-pink-800" 
                                : ""
                              }`}
                            >
                              {order.orderStatus === "Pending"
                                ? "Đang xử lý"
                                : order.orderStatus === "PaymentReceived"
                                ? "Thanh toán thành công"
                                : order.orderStatus === "PaymentFailed"
                                ? "Thanh toán thất bại"
                                : order.orderStatus === "Transporting"
                                ? "Đang vận chuyển"
                                : order.orderStatus === "Complete"
                                ? "Đã nhận hàng"
                                : order.orderStatus === "Rejected"
                                ? "Đã hủy"
                                : ""}
                            </span>

                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Tổng cộng: {order.subTotal.toLocaleString()} VND
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-600">Địa chỉ giao hàng:</h4>
                          <p className="text-sm text-gray-600">
                            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                          </p>
                          <p className="text-sm text-gray-600">{order.shippingAddress.addressLine}</p>
                        </div>
                      </div>

                      {/* Hiển thị các mặt hàng trong đơn hàng */}
                      <div className="flex flex-col gap-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-4 p-2 border rounded-lg">
                            <img
                              src={item.pictureUrl}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                              <h5 className="font-semibold text-sm text-gray-800">{item.name}</h5>
                              <div className="text-sm text-gray-600">
                                <span>Màu sắc: {item.colorName}</span> |{" "}
                                <span>Kích cỡ: {item.sizeName}</span>
                              </div>
                              <div className="text-sm text-gray-600">
                                Số lượng: {item.quantity} x {item.price.toLocaleString()} VND
                              </div>
                            </div>

                            {/* Các nút điều khiển cho từng sản phẩm */}
                            <div className="flex gap-2 ml-auto">
                              {order.orderStatus === "Complete" && (
                                <Button
                                  onClick={() => handleCommentOrder(item.id)}
                                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                >
                                  Bình luận
                                </Button>
                              )}

                              {["Pending", "PaymentReceived","Transporting"].includes(order.orderStatus) && (
                                <Button
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                  Hủy đơn hàng
                                </Button>
                              )}

                      {["Complete", "Rejected"].includes(order.orderStatus) && (
                                <Button
                                  onClick={() => handleResetItem(item.endPoint)}
                                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                >
                                  Đặt lại
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Pagination */}
            <Pagination
                    count={Math.ceil(orders.count / 5)}
                    page={pageNumber}
                    onChange={handlePageChange}
                    color="primary"
                    className="my-4 flex justify-center"
                  />
            <ModalComment addCommentModal={addCommentModal} setAddCommentModal={setAddCommentModal} orderItemId = {idComment}/>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Order;
