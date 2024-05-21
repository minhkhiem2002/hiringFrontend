import Link from "next/link"
import {
  Bell,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import avata from '../../../public/images/avata.jpg'
import Image from 'next/image'
const ProfileSidebar = ({ fullName, avatar }: { fullName: string; avatar: string }) => {
    return (
        <div className="hidden border-r h-[89%] bg-muted/40 md:block">
        <div className="flex h-3/4 flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[80px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <Image
                src = {avata}
                alt = 'avata'
                width = '50'
                height= '50'
                className = 'border rounded-3xl'
              />
              <div className = 'flex flex-col mt-2'>
                <span className = "text-xs text-[#566976]">Tài khoản của</span>  
                <span className="text-md text-[#566976]">{fullName}</span>
              </div>
            </div>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  Thông tin tài khoản
                </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Package2 className="h-4 w-4" />
                Quản lý ký gửi
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                Đơn đặt hàng
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Quản lý đội{" "}
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Menu className="h-4 w-4" />
                Mã khuyến mãi
              </Link>
            </nav>
          </div>
        </div>
      </div>
    )
}

export default ProfileSidebar