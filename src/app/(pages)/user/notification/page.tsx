"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/user/main-nav";
import ProfileSidebar from "@/components/user/profile-sidebar";
import { Divider, Box, Typography, Pagination, Avatar, Badge } from "@mui/material";
import { NotificationsActive, Info, CheckCircle } from "@mui/icons-material";
import { useNotificationsStore } from "@/services/store/notificationStore";
import { useRouter } from "next/navigation";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

const Notification = () => {
  const [fullName, setFullName] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const count = useNotificationsStore((state) => state.count);
  const notifications = useNotificationsStore((state) => state.notifications);
  const fetchNotifications = useNotificationsStore((state) => state.fetchNotifications);
  const router = useRouter();

  useEffect(() => {
    const params = {
      UserId: sessionStorage.getItem("userId"),
      PageNumber: page,
      PageSize: pageSize,
    };
    fetchNotifications(params);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(count / pageSize);

  const handleNotificationClick = (endpoint) => {
    if (endpoint) {
      router.push(`/filter/${endpoint}`);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return <Info sx={{ color: "#1976d2", fontSize: 28 }} />;
      case "success":
        return <CheckCircle sx={{ color: "#4caf50", fontSize: 28 }} />;
      default:
        return <NotificationsActive sx={{ color: "#ff9800", fontSize: 28 }} />;
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
            <div className="rounded-lg border border-dashed shadow-md bg-white">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <React.Fragment key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        cursor: notification.endpoint ? "pointer" : "default",
                        "&:hover": {
                          backgroundColor: notification.endpoint ? "#f0f0f0" : "transparent",
                        },
                      }}
                      onClick={() => handleNotificationClick(notification.endpoint)}
                    >
                      <Badge
                        badgeContent={getNotificationIcon(notification.type)}
                        overlap="circular"
                        anchorOrigin={{ vertical: "top", horizontal: "left" }}
                      >
                        <Avatar sx={{ bgcolor: "#e0f7fa", width: 48, height: 48 }}>
                          {notification.title.charAt(0).toUpperCase()}
                        </Avatar>
                      </Badge>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", color: "#333" }}
                        >
                          {notification.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", mb: 1 }}
                        >
                          {notification.content}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "#757575" }}
                        >
                          {formatDate(notification.creatAt)}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider />
                  </React.Fragment>
                ))
              ) : (
                <Box sx={{ p: 2, textAlign: "center" }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "#757575" }}
                  >
                    Bạn chưa có thông báo nào.
                  </Typography>
                </Box>
              )}
            </div>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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
