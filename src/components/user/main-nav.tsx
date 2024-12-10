"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/images/Logo.png";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { AiOutlineUser, AiOutlineLogout, AiOutlineBell } from "react-icons/ai";
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
import {
  Bell,
  BellRing,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useAuthStore } from "@/services/store/authStore";
import { useNotificationsStore } from "@/services/store/notificationStore";
import { NotificationParams } from "@/services/api/notificationApi";
import { useCartStore } from "@/services/store/cartStore";
import axios from "axios";

// Hàm format ngày giờ
function formatDate(dateString: any) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

// Component Navbar
const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [suggestions, setSuggestions] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const isLogin = useAuthStore((state) => state.isLogin);
  const info = useUserStore((state) => state.userInfo);
  const loadingUser = useUserStore((state) => state.loading);
  const putSuccess = useUserStore((state) => state.putSuccess);
  const setState = useUserStore((state) => state.setState);
  const setInfo = useUserStore((state) => state.setInfo);
  const getInfo = useUserStore((state) => state.getInfo);
  const notificationCount = useNotificationsStore((state) => state.notificationCount);
  const fetchNotificationCount = useNotificationsStore(state => state.fetchNotificationCount);
  const fetchNotifications = useNotificationsStore(state => state.fetchNotifications);
  const fetchCart = useCartStore(state => state.fetchCart);
  const { quantity } = useCartStore();
  const notifications = useNotificationsStore((state) => state.notifications);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
    getInfo(sessionStorage.getItem('userId'));
    if (typeof window !== "undefined") {
      setUserId(sessionStorage.getItem("userId"));
    }
  }, []);

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState(null);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://sportappdemo.azurewebsites.net/api/SportField/GetSportFields`,
        {
          params: {
            PageSize: 5, // Số lượng kết quả mỗi trang
            PageNumber: 1, // Trang hiện tại
            Search: query || null, // Từ khóa tìm kiếm
          },
        }
      );
      setSuggestions(response.data); // Cập nhật danh sách gợi ý từ API
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setState(false);
    setInfo(null);
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("roleId");
    sessionStorage.removeItem("email");
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

  return (
    <Box className="w-full bg-slate-100">
      <Grid container alignItems="center" spacing={2} className="bg-white py-4 border-b shadow-md sticky top-0 z-30 px-5">
        {/* Logo */}
        <Grid item xs={1.5}>
          <Link href="/">
            <Image src={Logo} width={100} height={50} alt="Logo" className="w-30 md:w-40 md:h-8 cursor-pointer" />
          </Link>
        </Grid>

        {/* Tìm kiếm */}
        <Grid item xs={7.5} container spacing={2} justifyContent="start" alignItems="center" className="mt-1">
        <Input
  type="search"
  value={searchTerm}
  onChange={handleSearchChange}
  placeholder="Tìm kiếm..."
  className="rounded-lg bg-background pl-8 ml-4 w-[400px] relative z-10" // Giữ w-[400px] để đảm bảo chiều rộng giống ô tìm kiếm
/>

{/* Gợi ý tìm kiếm */}
{loading && (
  <div className="absolute top-full left-[190px]  w-[500px] p-2 text-gray-500 z-20 bg-white rounded-md shadow-lg">
    Đang tìm kiếm...
  </div>
)}

{suggestions?.count > 0 && !loading && (
  <ul className="absolute top-full left-[190px] w-[500px] bg-white border border-gray-300 rounded-md mt-2 shadow-lg z-20 max-h-64 overflow-y-auto">
    {suggestions.fields.map((field, index) => (
      <li
        key={index}
        className="p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition-all duration-200"
      >
        <Link href={`/filter/${field.endPoint}`}>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{field.name}</h2>
          <div className="flex items-center space-x-3">
            <img
              src={field.pictureUrl}
              alt={field.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-sm text-gray-600">{field.address}</p>
              <p className="text-sm text-gray-600">Sân: {field.sport}</p>
              <p className="text-sm text-gray-600">Giá: {field.priceRange}</p>
              <p className="text-sm text-gray-600">Đánh giá: {field.stars}</p>
            </div>
          </div>
        </div>
        </Link>
      </li>
    ))}
  </ul>
)}

          <Link href="/filter" className="mx-3">Thông tin sân</Link>
          <Link href="/equipment" className="mx-3">Thiết bị</Link>
          <Link href="/team" className="mx-3">Team</Link>
          <Link href="/news" className="mx-3">Tin tức</Link>
          <Link href="/faq" className="mx-3">FAQ</Link>
          <Link href="/contact" className="mx-3">Liên hệ</Link>
        </Grid>

        {/* Các liên kết và thông tin người dùng */}
        <Grid item xs={3} columnSpacing={1} container alignItems="center" justifyContent="flex-end">
          {loading ? <Loading /> : (
          <Box className="flex items-center gap-2">
            <button type="button" onClick={() => router.push('/cart')}>
                  <Badge color="secondary" badgeContent={quantity} showZero>
                    <ShoppingCartIcon />
                  </Badge>
                </button>
            {userId ? (
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
                {/* <Button onClick={handleRegister} className="bg-red-500 hover:bg-red-300">
                  Đăng ký
                </Button>
                <Button onClick={handleLogin} className="bg-red-500 hover:bg-red-300">
                  Đăng nhập
                </Button> */}
                <Button 
                  onClick={handleRegister} 
                  className="px-6 py-2 text-sm font-medium text-white transition duration-300 transform bg-green-300 rounded-lg shadow-md hover:bg-green-400 hover:scale-105 focus:ring-2 focus:ring-green-200 ml-2"
                >
                  Đăng ký
                </Button>
                <Button 
                  onClick={handleLogin} 
                  className="px-6 py-2 text-sm font-medium text-white transition duration-300 transform bg-green-300 rounded-lg shadow-md hover:bg-green-400 hover:scale-105 focus:ring-2 focus:ring-green-200"
                >
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
          <div className='flex items-center gap-3 rounded-lg px-3 py-2'>
          <Users className="h-4 w-4" />
            Thông tin tài khoản
          </div>
        </MenuItem>

        <MenuItem onClick={() => router.push("/user/notification", { scroll: false })}>
        <div className='flex items-center gap-3 rounded-lg px-3 py-2'>
          <BellRing className="h-4 w-4" />
            Thông báo
          </div>
        </MenuItem>
        <MenuItem onClick={() => router.push("/user/booking", { scroll: false })}>
        <div className='flex items-center gap-3 rounded-lg px-3 py-2'>
          <ShoppingCart className="h-4 w-4" />
            Đơn đặt sân
          </div>
        </MenuItem>
        <MenuItem onClick={() => router.push("/user/order", { scroll: false })}>
        <div className='flex items-center gap-3 rounded-lg px-3 py-2'>
          <ShoppingCart className="h-4 w-4" />
            Đơn đặt hàng
          </div>
        </MenuItem>
        <MenuItem onClick={() => router.push("/user/team", { scroll: false })}>
        <div className='flex items-center gap-3 rounded-lg px-3 py-2'>
          <Package className="h-4 w-4" />
            Quản lý đội
          </div>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          className='mt-1'
        >
          <div className='flex items-center gap-3 rounded-lg px-3 py-2'>
          <AiOutlineLogout className="mr-2" size={20} />
            Đăng xuất
          </div>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
