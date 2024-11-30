"use client";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/user/main-nav";
import ProfileSidebar from "@/components/user/profile-sidebar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "@/services/store/userStore";

const formUserInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  location: z.string(),
  phoneNumber: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  avatar: z.string(),
  role: z.string()
});

const formSkillSchema = z.object({
  interest: z.string(),
  height: z.union([z.string(), z.number()]), // Chấp nhận cả string và number
  weight: z.union([z.string(), z.number()]),
  skills: z
    .string(),
  address: z.string(),
  time: z.string()
});

const formUserPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
});

const Information = () => {
  const [imagePreview, setImagePreview] = useState<string>("");

  const formInfo = useForm<z.infer<typeof formUserInfoSchema>>({
    resolver: zodResolver(formUserInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      location: "",
      phoneNumber: "",
      gender: "Nam",
      dateOfBirth: "",
      avatar: "",
      role: ""
    }
  });

  const formSkill = useForm<z.infer<typeof formSkillSchema>>({
    resolver: zodResolver(formSkillSchema),
    defaultValues: {
      interest: "",
      height: "",
      weight: "",
      skills: "",
      address: "",
      time: ""
    }
  });

  const avatar = useWatch({ control: formInfo.control, name: "avatar" });

  const formPassword = useForm<z.infer<typeof formUserPasswordSchema>>({
    resolver: zodResolver(formUserPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" }
  });

  const getSkill = useUserStore((state) => state.getSkill);
  const updateSkill = useUserStore((state) => state.updateSkill);
  const customerDetail = useUserStore((state) => state.customerDetail);

  useEffect(() => {
    if (userInfo) {
      formInfo.setValue("firstName", userInfo.firstName || "");
      formInfo.setValue("lastName", userInfo.lastName || "");
      formInfo.setValue("phoneNumber", userInfo.phoneNumber || "");
      formInfo.setValue("location", userInfo.location || "");
      formInfo.setValue("gender", userInfo.gender || "");
      formInfo.setValue("dateOfBirth", userInfo.dateOfBirth || "");
      formInfo.setValue("avatar", userInfo.avatar || "");
      formInfo.setValue("role", userInfo.role || "");
      setImagePreview(userInfo.avatar || "");
    } 
    getSkill(sessionStorage.getItem('roleId'))
  }, []);

  useEffect(() => {
    if (customerDetail) {
      formSkill.setValue("interest", customerDetail.interest || "");
      formSkill.setValue("height", customerDetail.height || "");
      formSkill.setValue("weight", customerDetail.weight || "");
      formSkill.setValue("skills", customerDetail.skills || "");
      formSkill.setValue("address", customerDetail.address || "");
      formSkill.setValue("time", customerDetail.time || "");
    } 
  }, [getSkill]);

  const updateInfo = useUserStore((state) => state.updateInfo);
  const updateAvatar = useUserStore((state) => state.updateAvatar);
  const userInfo = useUserStore((state) => state.userInfo);

  async function onSubmit(values: z.infer<typeof formUserInfoSchema>) {
    try {
      const userId = sessionStorage.getItem("userId");
      const updatedUserInfo = {
        userId,
        ...values
      };
      const userInfo = await updateInfo(updatedUserInfo);
      console.log("User Info", userInfo);
      if (Boolean(userInfo)) {
        toast.success("Chỉnh sửa thông tin thành công", { autoClose: 1500 });
      }
    } catch (err) {
      toast.error("Chỉnh sửa thông tin không thành công", { autoClose: 1500 });
      console.error(err);
    }
  }

  async function onSubmitSkill(values: z.infer<typeof formSkillSchema>) {
    try {
      const customerId = sessionStorage.getItem("roleId");
      const updatedUserSkill = {
        customerId,
        ...values
      };
      const userInfo = await updateSkill(updatedUserSkill);
      if (Boolean(userInfo)) {
        toast.success("Chỉnh sửa thông tin thành công", { autoClose: 1500 });
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra khi lưu.", { autoClose: 1500 });
      console.error(err);
    }
  }

  const updatePassword = useUserStore((state) => state.updatePassword);

  async function onSubmitPassword(
    values: z.infer<typeof formUserPasswordSchema>
  ) {
    try {
      const userPassword = await updatePassword(values);
      console.log("Response Update Password", userPassword);
    } catch (err) {
      console.error(err);
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setImagePreview(imagePreviewUrl);

      const userId = sessionStorage.getItem("userId");
      const formData = new FormData();

      formData.append("AvatarUpdate", file);
      formData.append("UserId", userId || "");

      try {
        console.log("Uploading avatar...");
        const response = await updateAvatar(formData);
        if (Boolean(response)) {
          toast.success("Chỉnh sửa ảnh thành công", { autoClose: 1500 });
        }
      } catch (error) {
        toast.error("Chỉnh sửa ảnh không thành công", { autoClose: 1500 });
      }
    } else {
      console.log("No file selected");
    }
  };

  return (
    <>
      <div>
        <div className="sticky z-20">
          <Navbar />
        </div>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <ProfileSidebar
            fullName={`${formInfo.watch("firstName")} ${formInfo.watch(
              "lastName"
            )}`}
            avatar={imagePreview}
          />
          <div className="flex flex-col h-[89%]">
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                  Thông tin tài khoản
                </h1>
              </div>
              <div className="flex flex-1 items-center px-5 py-5 justify-center rounded-lg border border-dashed shadow-sm">
                <Tabs defaultValue="account" className="w-[1000px] h-[630px]">
                  <TabsList className="grid w-1/2 grid-cols-3">
                    <TabsTrigger value="account">Thông tin cá nhân</TabsTrigger>
                    <TabsTrigger value="skill">Thông tin kĩ năng</TabsTrigger>
                    <TabsTrigger value="password">Đổi mật khẩu</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <Form {...formInfo}>
                      <form onSubmit={formInfo.handleSubmit(onSubmit)}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Thông tin cá nhân</CardTitle>
                            <label
                              htmlFor="avatar-upload"
                              className="cursor-pointer"
                            >
                              <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                onChange={handleAvatarChange}
                              />
                              <img
                                src={userInfo.avatar}
                                alt="Avatar"
                                width={200}
                                height={200}
                                className="rounded-full border mt-2 min-h-[200px] min-w-[200px]"
                              />
                            </label>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex gap-4">
                              <div className="w-1/2">
                                <FormField
                                  control={formInfo.control}
                                  name="firstName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Họ & Tên đệm</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Họ & Tên đệm"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="w-1/2">
                                <FormField
                                  control={formInfo.control}
                                  name="lastName"
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
                              <div className="w-1/2">
                                <FormField
                                  control={formInfo.control}
                                  name="phoneNumber"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Số điện thoại</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Số điện thoại"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="w-1/2">
                                <FormField
                                  control={formInfo.control}
                                  name="location"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Địa chỉ</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Địa chỉ"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div className="w-1/2">
                                <FormField
                                  control={formInfo.control}
                                  name="dateOfBirth"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Ngày sinh</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="datetime-local"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="w-1/2">
                                <FormField
                                  control={formInfo.control}
                                  name="gender"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Giới tính</FormLabel>
                                      <FormControl>
                                        <div className="flex gap-2">
                                          <Checkbox
                                            checked={field.value === "Nam"}
                                            onCheckedChange={() =>
                                              formInfo.setValue("gender", "Nam")
                                            }
                                          />
                                          <Label>Nam</Label>
                                          <Checkbox
                                            checked={field.value === "Nữ"}
                                            onCheckedChange={() =>
                                              formInfo.setValue("gender", "Nữ")
                                            }
                                          />
                                          <Label>Nữ</Label>
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button type="submit">Cập nhật</Button>
                          </CardFooter>
                        </Card>
                      </form>
                    </Form>
                  </TabsContent>
                  <TabsContent value="skill">
                    <Form {...formSkill}>
                      <form
                        onSubmit={formSkill.handleSubmit(onSubmitSkill)}
                        className="space-y-4"
                      >
                        <Card>
                          <CardContent className="space-y-2 mt-8">
                            <div className="flex gap-4">
                              <div className="w-1/2">
                                <FormField
                                  control={formSkill.control}
                                  name="height"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Chiều cao (cm):</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          placeholder="Nhập chiều cao"
                                          {...field}
                                          className="border p-2 w-full"
                                        />
                                      </FormControl>
                                      <FormMessage>
                                        {
                                          formSkill.formState.errors.height
                                            ?.message
                                        }
                                      </FormMessage>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="w-1/2">
                                <FormField
                                  control={formSkill.control}
                                  name="weight"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Cân nặng (kg):</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          placeholder="Nhập cân nặng"
                                          {...field}
                                          className="border p-2 w-full"
                                        />
                                      </FormControl>
                                      <FormMessage>
                                        {
                                          formSkill.formState.errors.weight
                                            ?.message
                                        }
                                      </FormMessage>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              </div>
                              <div className="flex gap-4">
                              <div className="w-1/2">
                                <FormField
                                  control={formSkill.control}
                                  name="interest"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Tên sở thích:</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          placeholder="Nhập sở thích"
                                          {...field}
                                          className="border p-2 w-full"
                                        />
                                      </FormControl>
                                      <FormMessage>
                                        {
                                          formSkill.formState.errors.interest
                                            ?.message
                                        }
                                      </FormMessage>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="w-1/2">
                                <FormField
                                  control={formSkill.control}
                                  name="skills"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Tên kỹ năng:</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          placeholder="Nhập tên kỹ năng"
                                          {...field}
                                          className="border p-2 w-full"
                                        />
                                      </FormControl>
                                      <FormMessage>
                                        {
                                          formSkill.formState.errors.skills
                                            ?.message
                                        }
                                      </FormMessage>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              </div>
                              <div className="flex gap-4">
                              <div className="w-1/2">
                                <FormField
                                  control={formSkill.control}
                                  name="address"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Địa điểm:</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          placeholder="Nhập địa điểm"
                                          {...field}
                                          className="border p-2 w-full"
                                        />
                                      </FormControl>
                                      <FormMessage>
                                        {
                                          formSkill.formState.errors.address
                                            ?.message
                                        }
                                      </FormMessage>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="w-1/2">
                                <FormField
                                  control={formSkill.control}
                                  name="time"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Thời gian:</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          placeholder="Nhập thời gian"
                                          {...field}
                                          className="border p-2 w-full"
                                        />
                                      </FormControl>
                                      <FormMessage>
                                        {
                                          formSkill.formState.errors.time
                                            ?.message
                                        }
                                      </FormMessage>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button type="submit">Cập nhật</Button>
                          </CardFooter>
                        </Card>
                      </form>
                    </Form>
                  </TabsContent>
                  <TabsContent value="password">
                    <Form {...formPassword}>
                      <form
                        onSubmit={formPassword.handleSubmit(onSubmitPassword)}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle>Đổi mật khẩu</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex gap-4">
                              <div className="w-1/2">
                                <FormField
                                  control={formPassword.control}
                                  name="password"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Mật khẩu</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="password"
                                          placeholder="Mật khẩu"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="w-1/2">
                                <FormField
                                  control={formPassword.control}
                                  name="confirmPassword"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Xác nhận mật khẩu</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="password"
                                          placeholder="Xác nhận mật khẩu"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button type="submit">Cập nhật</Button>
                          </CardFooter>
                        </Card>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Information;
