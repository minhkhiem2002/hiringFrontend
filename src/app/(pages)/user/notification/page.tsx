"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/user/main-nav"; 
import ProfileSidebar from "@/components/user/profile-sidebar"; 
import { Divider, Box, Typography, Pagination } from '@mui/material';
import { useNotificationsStore } from "@/services/store/notificationStore";
import { useRouter } from 'next/navigation';  // Import useRouter

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

const Notification = () => {
  const [fullName, setFullName] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [page, setPage] = useState(1); // State to track the current page
  const pageSize = 5; // PageSize is 5, for pagination

  const count = useNotificationsStore((state) => state.count); // Total notifications count
  const notifications = useNotificationsStore((state) => state.notifications);
  const fetchNotifications = useNotificationsStore(state => state.fetchNotifications);
  
  const router = useRouter();  // Instantiate the router for navigation

  console.log('Total notifications:', count); // Logging the total notifications count

  // Fetch notifications when page changes
  useEffect(() => {
    const params = {
      UserId: sessionStorage.getItem("userId"),
      PageNumber: page,
      PageSize: pageSize,
    };
    fetchNotifications(params);
  }, [page]); // Re-fetch notifications whenever page changes

  const handlePageChange = (event, value) => {
    setPage(value); // Update the page state
  };

  // Calculate total pages based on the count and page size
  const totalPages = Math.ceil(count / pageSize);

  // Handle notification click event to navigate to filter page
  const handleNotificationClick = (endpoint) => {
    if (endpoint) {
      router.push(`/filter/${endpoint}`);  // Navigate to the filter page using Next.js router
    }
  };

  return (
    <div>
      <div className="sticky z-20">
        <Navbar />
      </div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <ProfileSidebar fullName={fullName} avatar={userAvatar} />
        <div className="flex flex-col h-[89%]">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="rounded-lg border border-dashed shadow-sm">
              {notifications.length > 0 ? notifications.map((notification, index) => (
                <React.Fragment key={index}>
                  <Box
                    sx={{ p: 1,m: 2, cursor: notification.endpoint ? 'pointer' : 'default', '&:hover': { backgroundColor: notification.endpoint ? '#f0f0f0' : 'transparent' }}}
                    onClick={() => handleNotificationClick(notification.endpoint)}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {notification.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {notification.content}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', justifyContent: 'flex-end' }}>
                      {formatDate(notification.creatAt)}
                    </Typography>
                  </Box>
                  <Divider />
                </React.Fragment>
              )) : (
                <Box sx={{ p: 1 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Bạn chưa có thông báo nào.
                  </Typography>
                </Box>
              )}
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                count={totalPages} 
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Notification;
