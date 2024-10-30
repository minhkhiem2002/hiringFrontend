"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/user/main-nav"; 
import ProfileSidebar from "@/components/user/profile-sidebar"; 
import dataFieldBooking from "@/ultils/dataFieldBooking.json"; 
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import Image from "next/image";
import { useUserStore } from "@/services/store/userStore";

const Order = () => {
  const [fields, setFields] = useState<any[]>([]);
  const [fullName, setFullName] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");

  const getInfo = useUserStore((state) => state.getInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getInfo();
        if (userInfo) {
          setFullName(`${userInfo.Fname} ${userInfo.Lname}`);
          setUserAvatar(userInfo.avatar || "");
        }
        console.log("Response", userInfo);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchData();
  }, [getInfo]);

  useEffect(() => {
    setFields(dataFieldBooking.fields);
  }, []);

  return (
    <div>
      <div className="sticky z-20">
        <Navbar />
      </div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <ProfileSidebar fullName={fullName} avatar={userAvatar} />
        <div className="flex flex-col h-[89%]">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex flex-1 items-start justify-start rounded-lg border border-dashed shadow-sm">
              <Tabs defaultValue="field" className="w-full h-[630px]">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="field">Đơn đặt sân</TabsTrigger>
                  <TabsTrigger value="equipment">Đơn trang thiết bị</TabsTrigger>
                  <TabsTrigger value="coach">Đơn huấn luyện viên/trọng tài</TabsTrigger>
                </TabsList>
                <TabsContent value="field">
  <div className="flex flex-col gap-4">
    {fields.map((field) => (
      <Grid container key={field.id} className='p-4 border rounded-lg shadow-md'>
        <Grid item xs={1}>
          <Image src={field.image} alt={field.fieldName} width={80} height={80} className="rounded-lg mr-4" />
        </Grid>
        <Grid item xs={9}>
          <div>
            <h3 className="font-semibold">{field.fieldName}</h3>
            <div className="flex">
              <p>{field.location}</p>
              <span className = 'px-4'>|</span>
              <p>Loại: {field.type}</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} className='flex items-center justify-center'>
          <span>Giá: {field.price.toLocaleString()} VND</span>
        </Grid>
        <Grid item xs={12}>
          <hr className="border-t border-gray-300 my-2" /> 
        </Grid>
        <Grid item xs={12} columnSpacing={1} className='flex justify-end'>
            <Button className="mr-2">Đặt lại</Button> 
            <Button>Đánh giá</Button>
        </Grid>
      </Grid>
    ))}
  </div>
</TabsContent>

                <TabsContent value="equipment">
                  {/* Thêm nội dung cho tab equipment tại đây */}
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Order;
