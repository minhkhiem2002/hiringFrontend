"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/images/Logo.png";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import UserIcon from '../../../public/icons/User.svg'
import LogoutIcon from '../../../public/icons/Logout Rounded.svg'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useUserStore } from "@/services/store/userStore";
import { useRouter } from "next/navigation";
import Loading from "@/components/user/loading";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { useAuthStore } from "@/services/store/authStore";

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

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (id) {
      getInfo(id);
    } else {
      setState(false);
      setInfo(null);
    }
  }, [getInfo, setState, setInfo]);

  useEffect(() => {
    if (putSuccess) {
      const id = sessionStorage.getItem("userId");
      if (id) {
        getInfo(id);
      } else {
        setState(false);
        setInfo(null);
      }
    }
  }, [putSuccess, getInfo, setState, setInfo]);

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
    setAnchorEl(event.currentTarget);
  };

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
              <>
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
              </>
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
