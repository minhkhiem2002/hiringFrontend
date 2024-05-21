"use client";
import { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../../../public/images/Logo.png";
import MiniLogo from "../../../public/images/MiniAvatar.jpg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Login from "./nav-login";
import Register from "./nav-register";
import {useUserStore, useStateLoginStore} from '@/services/store/userStore'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { isLogin, setState } = useStateLoginStore();

  return (
    <header
      className='bg-white py-5 border-b shadow-md sticky top-0 left-0 z-30'
    >
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div>
          <Link href="/">
            <Image
              src={Logo}
              width={100}
              height={50}
              alt="Logo"
              className="w-30 md:w-40 md:h-8 cursor-pointer"
            />
          </Link>
        </div>
        <div className="relative ml-auto flex-1 md:grow-0 md:gap-[2vw] gap-2 mr-2 md:ml-4 md:mr-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <div
          className={`nav-links duration-500 ${menuOpen ? "top-[9%] z-10" : "top-[-100%]"
            } md:static absolute bg-white md:min-h-fit min-h-[15vh]  left-0 w-full flex items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-2">
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-md z-10">
                      Thông tin sân
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-10">
                      <ul className="grid grid-cols-[.5fr_0.75fr] w-[300px] gap-3 p-6 md:w-[400px] md:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Image
                              src={MiniLogo}
                              width={50}
                              height={100}
                              alt="Logo"
                              className="w-full h-full rounded-md"
                            />
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/docs" title="Giới thiệu">
                          Sứ mệnh và tầm nhìn của sân thể thao Spotta
                        </ListItem>
                        <ListItem
                          href="/docs/installation"
                          title="Đặt sân"
                        >
                          Tìm kiếm và đặt sân
                        </ListItem>
                        <ListItem
                          href="/docs/primitives/typography"
                          title="Chính sách và bảo mật"
                        >
                          Chính sách và bảo mật thông tin cho người dùng
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                 
                        Sự kiện
                
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
               
                        Tin tức
              
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/faq" legacyBehavior passHref>
          
                        FAQ
          
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/user/account" legacyBehavior passHref>
                     
                        Liên hệ
                 
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2 md:gap-6">
          <Login/>
          <Register/>
          <div
            onClick={toggleMenu}
            className="text-3xl cursor-pointer md:hidden"
          >
          </div>
        </div>
      </nav>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
