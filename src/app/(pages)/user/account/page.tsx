'use client'
import { Button } from "@/components/ui/button";
import Navbar from "@/components/user/main-nav";
import ProfileSidebar from "@/components/user/profile-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import avata from '../../../../../public/images/avata.jpg'
import { CalendarDays } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch  } from "react-hook-form"
import { z } from "zod"
import { useEffect } from 'react';

import {useUserStore} from '@/services/store/userStore'

const formUserInfoSchema = z.object({
  Fname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  Lname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string(),
  phone: z.string(),
  avatar: z.string(),
  role: z.string(),
})

const formUserPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters",
  })
})

const Information = () => {
  const formInfo = useForm<z.infer<typeof formUserInfoSchema>>({
    resolver: zodResolver(formUserInfoSchema),
    defaultValues: {
      Fname: "",
      Lname: "",
      email: "",
      phone: "",
      avatar: "",
      role: ""
    },
  })

  const Fname = useWatch({
    control: formInfo.control,
    name: "Fname"
  });

  const Lname = useWatch({
    control: formInfo.control,
    name: "Lname"
  });

  const email = useWatch({
    control: formInfo.control,
    name: "email"
  });

  const phone = useWatch({
    control: formInfo.control,
    name: "phone"
  });

  const avatar = useWatch({
    control: formInfo.control,
    name: "avatar"
  });

  const role = useWatch({
    control: formInfo.control,
    name: "role"
  });

  const formPassword = useForm<z.infer<typeof formUserPasswordSchema>>({
    resolver: zodResolver(formUserPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  
  const getInfo = useUserStore(state => state.getInfo)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getInfo();
        if (userInfo) {
          formInfo.setValue('Fname', userInfo.Fname || '');
          formInfo.setValue('Lname', userInfo.Lname || '');
          formInfo.setValue('email', userInfo.email || '');
          formInfo.setValue('phone', userInfo.phone || '');
          formInfo.setValue('avatar', userInfo.avatar || '');
          formInfo.setValue('role', userInfo.role || '');
        }
        console.log('Response', userInfo)
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchData();
  }, [getInfo]);

  async function onSubmit(values: z.infer<typeof formUserInfoSchema>) {
    try {
       const userInfo = await getInfo()
       console.log("Repsonse ", userInfo)
    } catch (err) {
      console.error(err)
    }
  }

  async function onSubmitPassword(values: z.infer<typeof formUserPasswordSchema>) {
    try {

    } catch (err) {
      console.error(err)
    }
  }

  const fullName = `${formInfo.watch("Fname")} ${formInfo.watch("Lname")}`;
  const userAvatar = formInfo.watch("avatar");

  return (
    <div>
      <div className="sticky z-20">
        <Navbar />
      </div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <ProfileSidebar fullName={fullName} avatar={userAvatar} />
        <div className="flex flex-col h-[89%]">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">
                Thông tin tài khoản
              </h1>
            </div>
            <div
              className="flex flex-1 items-start px-5 py-5 justify-start rounded-lg border border-dashed shadow-sm"
              x-chunk="dashboard-02-chunk-1"
            >
           
              <Tabs defaultValue="account" className="w-[800px] h-[800px]">
                <TabsList className="grid w-1/2 grid-cols-2">
                  <TabsTrigger value="account">Thông tin cá nhân</TabsTrigger>
                  <TabsTrigger value="password">Đổi mật khẩu</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                <Form {...formInfo}>
                <form onSubmit={formInfo.handleSubmit(onSubmit)}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Thông tin cá nhân</CardTitle>
                        <CardTitle>
                          <Image 
                            src = {avata}
                            width={200}
                            height={200}
                            alt = 'avatar'
                            className = 'rounded-full border mt-2'
                          />
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex gap-4">
                          <div className='w-1/2'>
                          <FormField
                              control={formInfo.control}
                              name="Fname"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Họ & Tên đệm</FormLabel>
                                  <FormControl>
                                      <Input placeholder="Họ & Tên đệm" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />
                          </div>
                          <div className='w-1/2 '>
                          <FormField
                              control={formInfo.control}
                              name="Lname"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Tên</FormLabel>
                                  <FormControl>
                                      <Input placeholder="Tên" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className='w-1/2'>
                          <FormField
                              control={formInfo.control}
                              name="phone"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Số điện thoại</FormLabel>
                                  <FormControl>
                                      <Input placeholder="Số điện thoại" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />
                          </div>
                          <div className='w-1/2'>
                            <div className='flex gap-4'>
                              <div className='flex mt-8 gap-2'>
                                <Checkbox id="terms" checked/>
                                <label
                                  htmlFor="males"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Nam
                                </label>
                              </div>
                              <div className='flex mt-8 gap-2'>
                                <Checkbox id="terms" />
                                <label
                                  htmlFor="males"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Nữ
                                </label>
                              </div>
                              <div className='flex mt-8 gap-2'>
                                <Checkbox id="terms" />
                                <label
                                  htmlFor="males"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Khác
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1">
                        <FormField
                              control={formInfo.control}
                              name="email"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                      <Input placeholder="Email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save changes</Button>
                      </CardFooter>
                    </Card>
                    </form>
                 </Form>
                </TabsContent>
                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>Đổi mật khẩu</CardTitle>
                      <CardDescription>
                       Thay đổi mật khẩu của bạn tại đây. Sau khi hoàn tất bạn sẽ phải đăng nhập lại
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                    <Form {...formPassword}>
                    <form onSubmit={formPassword.handleSubmit(onSubmitPassword)}>
                      <div className="space-y-1">
                        <FormField
                              control={formPassword.control}
                              name="password"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Mật khẩu hiện tại</FormLabel>
                                  <FormControl>
                                      <Input placeholder="Mật khẩu hiện tại" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </div>
                      <div className="space-y-1 mt-2">
                      <FormField
                              control={formPassword.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Mật khẩu mới</FormLabel>
                                  <FormControl>
                                      <Input placeholder="Mật khẩu mới" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </div>
                      </form>
                      </Form>
                    </CardContent>
                    <CardFooter>
                      <Button>Lưu mật khẩu</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
             
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Information;
