'use client'
import Link from "next/link";
import { usePathname } from "next/navigation"; // Sử dụng usePathname thay cho useRouter
import {
  Bell,
  BellRing,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useUserStore } from "@/services/store/userStore";
import { useBookingStore } from "@/services/store/bookingStore";
import { useEffect } from "react";

const ProfileSidebar = ({ fullName, avatar }: { fullName: string; avatar: string }) => {
  const pathname = usePathname(); 

  const isActive = (path: string) => pathname === path;

  const info = useUserStore((state) => state.userInfo);
  const getInfo = useUserStore((state) => state.getInfo);
  const { bookings, orders, loading, error, fetchBookingsByCustomer, fetchOrdersByCustomer } = useBookingStore(
    (state) => state
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userId = sessionStorage.getItem("userId");
  //       const roleId = sessionStorage.getItem("roleId");
  //       const userInfo = await getInfo(userId);
  //       if (userInfo) {
  //         const params = {
  //           Email: userInfo.email,
  //           Status: null,
  //           PageSize: 5, 
  //           PageNumber: 1,
  //         };
  //         await fetchOrdersByCustomer(params)
  //       }

  //       if (roleId) {
  //         const params = {
  //           CustomerId: roleId,
  //           PageSize: 5, 
  //           PageNumber: 1,
  //         };
  //         await fetchBookingsByCustomer(params);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user information:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);



  return (
    <div className="hidden border-r h-[89%] bg-muted/40 md:block">
      <div className="flex h-3/4 flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[80px] lg:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Image
              src={info?.avatar || undefined}
              alt="avata"
              width="50"
              height="50"
              className="border rounded-3xl w-10 h-10"
            />
            <div className="flex flex-col mt-2">
              <span className="text-xs text-[#566976]">Tài khoản của</span>
              <span className="text-md text-[#566976]">{`${info?.firstName} ${info?.lastName}`}</span>
            </div>
          </div>

        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/user/account"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/user/account") ? "bg-muted text-muted-foreground" : "text-muted-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              Thông tin tài khoản
            </Link>
            <Link
              href="/user/notification"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/user/notification") ? "bg-muted text-muted-foreground" : "text-muted-foreground"
              }`}
            >
              <BellRing className="h-4 w-4" />
              Thông báo
            </Link>
            <Link
              href="/user/booking"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/user/booking") ? "bg-muted text-muted-foreground" : "text-muted-foreground"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              Đơn đặt sân
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {bookings?.count || 0}
              </Badge>
            </Link>
            <Link
              href="/user/order"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/user/order") ? "bg-muted text-muted-foreground" : "text-muted-foreground"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              Đơn đặt hàng
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {orders?.count || 0}
              </Badge>
            </Link>
            <Link
              href="/user/team"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/user/team") ? "bg-muted text-muted-foreground" : "text-muted-foreground"
              }`}
            >
              <Package className="h-4 w-4" />
              Quản lý đội
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
