"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import DetailImage from "../../../../../public/images/Detail.jpg";
import { Button } from "@/components/ui/button";
import { RiSendPlaneFill } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import ViewPriceDialog from "@/components/user/view-price";
import Navbar from "@/components/user/main-nav";
import { TiNews } from "react-icons/ti";
import axios from "axios";
import { Grid } from "@mui/material";
import { useRouter } from 'next/navigation'
import CommentSection from './comment'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRatingStore, useFieldStore } from "@/services/store/fieldStore";
import { ImageField, CommentData, DetailData} from "@/services/interfaces/fieldInterface"
import Loading from "@/components/user/loading";

const formatDateTime = (dateTime: any) => {
  const date = new Date(dateTime);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function Detail({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const id = params.slug;

  const position = [10.84488722399991, 106.63925902499713];

  const isSuccess = useRatingStore(state => state.isSuccess)

    const fetchFieldData = useFieldStore(state => state.fetchFieldData)
    const field = useFieldStore(state => state.field)
    const loading = useFieldStore(state => state.loading)

    useEffect(() => {
      fetchFieldData(id)
    },[])

    useEffect(() => {
      if (isSuccess) {
        fetchFieldData(id)
      }
    },[isSuccess])

  const handleBooking = async () => {
    router.push(`/filter/${id}/booking`)
  };

  return (
    <div>
  <Navbar />
  {loading ? (
    <Loading />
  ) : (
    <div className="flex w-full pl-16 mt-4 gap-4">
      {/* Left Section */}
      <div className="w-2/5">
        <Card className="overflow-hidden">
          <CardContent className="flex flex-col pt-5">
            <div className="flex-grow grid gap-2">
              <Image
                alt="Product image"
                className="w-full rounded-md h-[300px]"
                height="200"
                width="300"
                src={field?.images[0].pictureUrl || ''}
              />
              <div className="grid grid-cols-3 gap-2">
                <Image
                  alt="Product image"
                  className="w-full rounded-md h-[120px]"
                  height="56"
                  src={field?.images[0].pictureUrl || ''}
                  width="84"
                />
                <Image
                  alt="Product image"
                  className="w-full rounded-md h-[120px]"
                  height="56"
                  src={field?.images[0].pictureUrl || ''}
                  width="84"
                />
                <Button className="flex w-84 h-[120px] items-center justify-center rounded-md border border-dashed">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Upload</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Section */}
      <div className="w-[55%] space-y-6 pt-4 pl-4">
        <p className="text-4xl font-semibold">{field?.name}</p>
        <p className="text-lg font-medium text-[#7D92A1]">Địa chỉ: {field?.address}</p>
        <div className="flex">
          <Badge className="flex items-center bg-green-500 text-sm text-white rounded-md">
            {field?.stars} <FaStar className="size-4 text-white ml-1" />
          </Badge>
          <p className="text-base font-medium ml-2">200 Đã Đặt Sân | {field?.numberOfReviews}+ Reviews</p>
        </div>
        <p className="flex text-base space-x-2 font-medium my-2">
          <CiLocationOn className="size-5" /> <span>{field?.address}</span>
        </p>
        <p className="flex text-base space-x-2 font-medium my-2">
          <TiNews className="size-5" /> <span>{field?.description}</span>
        </p>
        <p className="flex text-base space-x-2 font-medium my-2">
          <RiSendPlaneFill className="size-5" /> <span>{field?.type}</span>
        </p>
        <p className="text-base space-x-2 font-medium my-2">
          <span>
            Mức giá: <span className="text-[#DC0F0F]">{field?.priceRange}</span> / giờ
          </span>
        </p>
        <div className="flex gap-12">
          <ViewPriceDialog />
          <Button className="bg-[#31AAB7] text-white px-4 py-0 text-md hover:bg-[#6DCDD8]" onClick={handleBooking}>
            <FaCartShopping className="size-4 text-white mr-2" /> Đặt sân
          </Button>
          <Button variant="outline" className="border-[#28A745] text-[#28A745] px-4 py-0 text-md hover:text-[#28A745]">
            <FaRegHeart className="size-4 text-[#28A745] mr-2" /> Theo dõi
          </Button>
        </div>
      </div>
    </div>
  )}

  {/* Main Content Section */}
  <div className="flex pl-16 mt-4 gap-4">
    <div className="w-[72%]">
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <p className="text-2xl font-semibold border-b-2 border-[#28A745] inline-block">Mô tả sân</p>
          <p className="text-base font-normal my-2">
            Sân bóng đá Khu A là sân bóng lâu đời, mới được chủ đầu tư chỉnh trang, nâng cấp và đang là một trong những
            sân bóng đẹp nhất Làng Đại Học Quốc Gia.
          </p>
          <p className="text-base font-normal my-2">
            Sân bóng rất đông và luôn kín lịch, bạn muốn thuê sân vào các giờ cao điểm giờ đây sẽ rất khó khăn.
          </p>
          <p className="text-base font-normal my-2">
            Cụm sân gồm 4 sân bóng đá mini, cũng giúp dễ dàng tổ chức thi đấu bóng đá cũng như thi đấu sân bóng 11 người dễ dàng.
          </p>
        </Grid>

        {/* Additional Sections */}
        <Grid item xs={12}>
          <p className="text-2xl font-semibold border-b-2 border-[#28A745] inline-block">Bao gồm</p>
          <p className="text-base font-normal my-2">- Sân bóng đá chất lượng cao.</p>
          <p className="text-base font-normal my-2">- Đội ngũ nhân viên hỗ trợ tận tình.</p>
          <p className="text-base font-normal my-2">- Dịch vụ đặt sân trực tuyến tiện lợi.</p>
        </Grid>
        <Grid item xs={12}>
          <p className="text-2xl font-semibold border-b-2 border-[#28A745] inline-block">Quy định</p>
          <p className="text-base font-normal my-2">- Khách hàng vui lòng đến đúng giờ đã đặt.</p>
          <p className="text-base font-normal my-2">- Không mang thức ăn và đồ uống vào sân.</p>
          <p className="text-base font-normal my-2">- Giữ gìn vệ sinh chung và không xả rác.</p>
        </Grid>
        <Grid item xs={12}>
          <p className="text-2xl font-semibold border-b-2 border-[#28A745] inline-block">Tiện nghi</p>
          <p className="text-base font-normal my-2">- Phòng thay đồ và phòng tắm sạch sẽ.</p>
          <p className="text-base font-normal my-2">- Bãi đỗ xe an toàn và miễn phí.</p>
          <p className="text-base font-normal my-2">- Wifi miễn phí cho tất cả khách hàng.</p>
        </Grid>
        <Grid item xs={12}>
          <CommentSection />
        </Grid>
      </Grid>
    </div>

    {/* Voucher and Map Section */}
    <div className="w-[23%] pl-4 gap-4">
      <p className="text-2xl font-semibold border-b-2 border-[#28A745] inline-block">Mã giảm giá của sân</p>
      {field?.vouchers.map((voucher, index) => (
        <div key={index} className="flex w-full border rounded-md px-2 py-2 gap-2 mt-4 bg-[#Fde7e7]">
          <div className="w-full">
            <p className="text-sm font-normal text-[#DC3545]">Giảm {voucher.percentSale}%</p>
            <p className="text-sm font-normal text-[#DC3545]">Đơn tối thiểu {voucher.minPrice.toLocaleString()}đ</p>
            <p className="text-sm font-normal text-[#DC3545]">Giảm tối đa {voucher.maxSale.toLocaleString()}đ</p>
            <p className="text-sm font-normal">HSD: {formatDateTime(voucher.endTime)}</p>
          </div>
          <div className="w-[25%] flex justify-center items-center">
            <button className="bg-[#DC3545] hover:bg-[#ff6550] text-white px-4 py-2 rounded-md">Lưu</button>
          </div>
        </div>
      ))}
      <p className="text-2xl mt-2 py-2 font-semibold border-b-2 border-[#28A745] inline-block">Vị trí sân</p>
      <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position}>
          <Popup>Location: 10.8449, 106.6393</Popup>
        </Marker>
      </MapContainer>
    </div>
  </div>
</div>

  );
}

export default Detail;
