"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/user/main-nav";
import ProfileSidebar from "@/components/user/profile-sidebar";
import { useUserStore } from "@/services/store/userStore";
import { useBookingStore } from "@/services/store/bookingStore";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt, FaFootballBall } from "react-icons/fa";
import Loading from "@/components/user/loading";

const Order = () => {
  const [fullName, setFullName] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);

  const getInfo = useUserStore((state) => state.getInfo);
  const { bookings, loading, error, fetchBookingsByCustomer } = useBookingStore(
    (state) => state
  );

  const userId = sessionStorage.getItem("roleId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getInfo();
        if (userInfo) {
          setFullName(`${userInfo.Fname} ${userInfo.Lname}`);
          setUserAvatar(userInfo.avatar || "");
        }

        if (userId) {
          const params = {
            CustomerId: userId,
            PageSize: 5, // Show 5 bookings per page
            PageNumber: pageNumber,
          };
          await fetchBookingsByCustomer(params);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchData();
  }, [getInfo, fetchBookingsByCustomer, userId, pageNumber]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-xl text-red-600">Error: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="sticky z-20">
        <Navbar />
      </div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <ProfileSidebar fullName={fullName} avatar={userAvatar} />
        <div className="flex flex-col h-full">
          <main className="flex flex-1 flex-col gap-6 p-6 bg-white rounded-t-lg shadow-md">
            <div className="flex flex-1 items-start justify-start rounded-lg border-b-4 border-gray-300">
              <div className="flex flex-col gap-6 w-full">
                {bookings?.count === 0 ? (
                  <div className="text-center text-xl text-gray-500">Chưa có đơn đặt nào</div>
                ) : (
                  <>
                    {bookings?.bookingList?.map((booking) => {
                      // Xác định trạng thái
                      const status =
                        booking.status === "PaymentReceived"
                          ? { label: "Đã thanh toán", color: "text-green-600 bg-green-100" }
                          : booking.status === "Pending"
                          ? { label: "Chưa thanh toán", color: "text-orange-600 bg-orange-100" }
                          : { label: booking.status, color: "text-gray-600 bg-gray-100" };

                      return (
                        <div
                          key={booking.id}
                          className="flex justify-between items-center gap-4 p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                        >
                          {/* Thông tin bên trái */}
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                              <FaFootballBall className="text-blue-600 text-2xl" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-800">
                                {booking.sportFieldName}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                <FaMapMarkerAlt className="text-red-500" />
                                <p>{booking.address}</p>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                <FaCalendarAlt className="text-blue-500" />
                                <p>Ngày: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                <p>Thời gian: {booking.timeSlotBooked.join(", ")}</p>
                              </div>
                            </div>
                          </div>

                          {/* Thông tin bên phải */}
                          <div className="flex flex-col items-end justify-center text-right gap-2">
                            <span className="text-lg font-semibold text-gray-800">
                              <FaMoneyBillWave className="inline-block mr-2 text-green-500" />
                              {booking.totalPrice.toLocaleString()} VND
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                            >
                              {status.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    <Pagination
                      count={Math.ceil(bookings.count / 5)} // 5 items per page
                      page={pageNumber}
                      onChange={handlePageChange}
                      color="primary"
                      className="my-4 flex justify-center"
                    />
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Order;
