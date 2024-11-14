"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/images/Logo.png";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import UserIcon from '../../../public/icons/User.svg'
import LogoutIcon from '../../../public/icons/Logout Rounded.svg'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useUserStore } from "@/services/store/userStore";
import { useRouter } from "next/navigation";
import Loading from "@/components/user/loading";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Popper,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAuthStore } from "@/services/store/authStore";
import { useNotificationsStore } from "@/services/store/notificationStore";
import { NotificationParams } from "@/services/api/notificationApi";

function formatDate(dateString:any) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLogin = useAuthStore((state) => state.isLogin);
  const info = useUserStore((state) => state.userInfo);
  const loading = useUserStore((state) => state.loading);
  const putSuccess = useUserStore((state) => state.putSuccess);
  const setState = useUserStore((state) => state.setState);
  const setInfo = useUserStore((state) => state.setInfo);
  const getInfo = useUserStore((state) => state.getInfo);
  const notificationCount = useNotificationsStore((state) => state.notificationCount);
  const fetchNotificationCount = useNotificationsStore(state => state.fetchNotificationCount);
  const  fetchNotifications = useNotificationsStore(state => state.fetchNotifications);
  const notifications = useNotificationsStore((state) => state.notifications);

  // useEffect(() => {
  //   if (putSuccess) {
  //     const id = sessionStorage.getItem("userId");
  //     if (id) {
  //       getInfo(id);
  //       fetchNotificationCount(id);
  //     } 
  //   }
  // }, [putSuccess]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setState(false);
    setInfo(null);
    sessionStorage.removeItem("userId");
    router.push("/login", { scroll: false });
  };

  const handleRegister = () => {
    router.push("/register", { scroll: false });
  };

  const handleLogin = () => {
    router.push("/login", { scroll: false });
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerMatKhau, setOpenDrawerMatKhau] = useState(false);
  const [anchorElNoti, setAnchorElNoti] = useState<null | HTMLElement>(null);
  const openNoti = Boolean(anchorElNoti);
  const handleClickNoti = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null)
    const params: NotificationParams = {
      UserId: sessionStorage.getItem("userId"),
      PageNumber: 1,
      PageSize: 5
    }
    setAnchorElNoti(anchorElNoti ? null : event.currentTarget);
    await fetchNotifications(params)
    await fetchNotificationCount(sessionStorage.getItem("userId"));
  };
  const idNoti = openNoti ? 'simple-popper' : undefined;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const thongtinTaikhoan = () => {
    router.push("/user/account", { scroll: false });
  };
  const doimatkhau = () => {
    setOpenDrawerMatKhau(true);
  };
  const chuyenPhanhe = () => {
    // sessionStorage.setItem("phanhe", null);
    // navigate("/phanhe");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: any) => {
    setAnchorElNoti(null)
    setAnchorEl(event.currentTarget);
  };

  console.log('Notify Nav', notifications)

  return (
    <Box className="w-full bg-slate-100">
      <Grid
        container
        alignItems="center"
        spacing={2}
        className="bg-white py-4 border-b shadow-md sticky top-0 z-30 px-5"
      >
        {/* Logo */}
        <Grid item xs={1.5}>
          <Link href="/">
            <Image
              src={Logo}
              width={100}
              height={50}
              alt="Logo"
              className="w-30 md:w-40 md:h-8 cursor-pointer"
            />
          </Link>
        </Grid>

        {/* Navigation Links */}
        <Grid item xs={7.5} container spacing={2} justifyContent="start" alignItems="center" className = 'mt-1'>
          <Input
            type="search"
            placeholder="Search..."
            className="rounded-lg bg-background pl-8 ml-4 w-[400px]"
          />
          <Link href="/filter" className="mx-3">Thông tin sân</Link>
          <Link href="/docs" className="mx-3">Sự kiện</Link>
          <Link href="/docs" className="mx-3">Tin tức</Link>
          <Link href="/faq" className="mx-3">FAQ</Link>
          <Link href="/contact" className="mx-3">Liên hệ</Link>
        </Grid>

        {/* User Info and Buttons */}
        <Grid item xs={3} container alignItems="center" justifyContent="flex-end">
          {loading ? <Loading /> : (
          <Box className="flex items-center gap-2">
            {sessionStorage.getItem('userId') ? (
              <div className="flex justify-center items-center gap-4">
                <button aria-describedby={idNoti} type="button" onClick={handleClickNoti}>
                  <Badge color="secondary" badgeContent={notificationCount} showZero>
                      <NotificationsIcon />
                    </Badge>
                </button>
                <Popper id={idNoti} open={openNoti} anchorEl={anchorElNoti} sx={{ zIndex: 31 }}  placement="bottom-end">
                <Box sx={{ border: '1px solid', borderColor: 'grey.300', p: 1, bgcolor: 'background.paper', borderRadius: 1, width: 300 }}>
                {notifications.length > 0 ? notifications.map((notification, index) => (
                  <>
                  <Box key={index} sx={{ p: 1 }}>
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
                  </>
                )) : (
                  <>
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Bạn chưa có thông báo nào.
                    </Typography>
                  </Box>
                  <Divider />
                  </>
                )}
                  <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={handleClickNoti}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      Xem tất cả
                    </Typography>
                  </Box>
                </Box>
                </Popper>


                <p>{info?.firstName} {info?.lastName}</p>
                <Tooltip title="Tài khoản của tôi">
                  <IconButton size="small" onClick={handleClick}>
                    <Avatar
                      className="w-10 h-10"
                      alt="User Avatar"
                      src={info?.avatar || undefined}
                    >
                      {!info?.avatar && `${info?.firstName} ${info?.lastName}`}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <>
                <Button onClick={handleRegister} className="bg-red-500 hover:bg-red-300">
                  Đăng ký
                </Button>
                <Button onClick={handleLogin} className="bg-red-500 hover:bg-red-300">
                  Đăng nhập
                </Button>
              </>
            )}
          </Box>
           )}
        </Grid>
      </Grid>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            marginTop: '4px',
            border: '1px solid #d3d4d5',
            boxShadow: '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
            borderRadius: '10px'
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={thongtinTaikhoan}>
          <div className='w-full flex py-1'>
            <img
              src={UserIcon}
              alt="icon_menu_users"
              width={20}
              className="mr-2"
            />
            Thông tin tài khoản
          </div>
        </MenuItem>

        <MenuItem onClick={doimatkhau}>
          <div className='w-full flex py-1'>
            <img
              src={UserIcon}
              alt="icon_menu_password"
              width={20}
              className="mr-2"
            />
            Đổi mật khẩu
          </div>
        </MenuItem>

        <MenuItem onClick={chuyenPhanhe}>
          <div className='w-full flex py-1'>
            <img
              src={UserIcon}
              alt="icon_menu_change"
              width={20}
              className="mr-2"
            />
            Chuyển phần mềm
          </div>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          className='mt-1'
        >
          <div className='w-full flex py-1'>
            <img
              src={LogoutIcon}
              alt="icon_menu_logout"
              width={20}
              className="mr-2"
            />
            Đăng xuất
          </div>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
