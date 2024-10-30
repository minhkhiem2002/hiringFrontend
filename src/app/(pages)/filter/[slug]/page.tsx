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
import data from "@/ultils/data.json";
import Navbar from "@/components/user/main-nav";
import { TiNews } from "react-icons/ti";
import axios from "axios";
import { Grid } from "@mui/material";
import { useRouter } from 'next/navigation'
import CommentSection from './comment.tsx'

interface DetailData {
  id: string;
  title: string;
  owner?: string;
  contact?: string;
  rating: number;
  bookings?: number;
  reviews: number;
  location: string;
  description: string;
  priceRange: string;
}

function Detail({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const id = params.slug;

  const [detailData, setDetailData] = useState<DetailData | null>(null);

  useEffect(() => {
    if (id) {
      const decodedTitle = decodeURIComponent(id);
      console.log(decodedTitle);
      const item = data.find((item: DetailData) => item.title == decodedTitle);
      console.log(item);
      setDetailData(item || null);
    }
  }, []); // Theo dõi id

  const handleBooking = async () => {
    router.push(`/filter/${id}/booking`)
  };

  if (!detailData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex w-full pl-16 mt-4 gap-4">
        <div className="w-2/5">
          <Card className="overflow-hidden">
            <CardContent className="flex flex-col pt-5">
              <div className="flex-grow grid gap-2">
                <Image
                  alt="Product image"
                  className="w-full rounded-md h-[300px]"
                  height="200"
                  src={DetailImage}
                />
                <div className="grid grid-cols-3 gap-2">
                  <Image
                    alt="Product image"
                    className="w-full rounded-md h-[120px]"
                    height="56"
                    src={DetailImage}
                    width="84"
                  />

                  <Image
                    alt="Product image"
                    className="w-full rounded-md h-[120px]"
                    height="56"
                    src={DetailImage}
                    width="84"
                  />
                  <Button className="flex w-84 h-[120px]  items-center justify-center rounded-md border border-dashed">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Upload</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-[55%] space-y-6 pt-4 pl-4">
          <p className="text-4xl font-semibold">{detailData.title}</p>
          <p className="text-lg font-medium text-[#7D92A1]">
            Chủ sân: {detailData.owner || "Chưa có"} - Liên hệ:{" "}
            {detailData.contact || "Chưa có"}
          </p>
          <div className="flex">
            <Badge className="flex items-center bg-green-500 text-sm text-white rounded-md">
              {detailData.rating} <FaStar className="size-4 text-white ml-1" />
            </Badge>
            <p className="text-base font-medium ml-2">
              200 Đã Đặt Sân | {detailData.reviews}+ Reviews
            </p>
          </div>
          <p className="flex text-base space-x-2 font-medium my-2">
            <CiLocationOn className="size-5" />{" "}
            <span>{detailData.location}</span>
          </p>
          <p className="flex text-base space-x-2 font-medium my-2">
            <TiNews className="size-5" />
            <span>{detailData.description}</span>
          </p>
          <p className="flex text-base space-x-2 font-medium my-2">
            <RiSendPlaneFill className="size-5" /> <span> Sân 5 </span>
          </p>
          <p className="flex text-base space-x-2 font-medium my-2">
            <RiSendPlaneFill className="size-5" /> <span> Sân 7 </span>
          </p>
          <p className="text-base space-x-2 font-medium my-2">
            <span>
              {" "}
              Mức giá:{" "}
              <span className="text-[#DC0F0F]">{detailData.priceRange}</span> /
              giờ{" "}
            </span>
          </p>
          <div className="flex gap-12">
            <ViewPriceDialog />
            <Button
              className="bg-[#31AAB7] text-white px-4 py-0 text-md hover:bg-[#6DCDD8]"
              onClick={handleBooking}
            >
              <FaCartShopping className="size-4 text-white mr-2" /> Đặt sân
            </Button>
            <Button
              variant="outline"
              className="border-[#28A745] text-[#28A745] px-4 py-0 text-md hover:text-[#28A745]"
            >
              <FaRegHeart className="size-4 text-[#28A745] mr-2" /> Theo dõi
            </Button>
          </div>
        </div>
      </div>

      <div className="flex pl-16 mt-4 gap-4">
        <div className="w-[77%]">
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <p className="text-2xl font-semibold border-b-2 border-[#28A745] inline-block">
                Mô tả sân
              </p>
              <p className="text-base font-normal my-2">
                Sân bóng đá Khu A là sân bóng lâu đời, mới được chủ đầu tư chỉnh
                trang, nâng cấp và đang là một trong những sân bóng đẹp nhất
                Làng Đại Học Quốc Gia. Với vị trí vô cùng thuận lợi, nằm ngay
                mặt đường chính, đối diện là khu KTX khu A, sân bóng đá khu A đã
                trở thành địa điểm giao lưu hàng đầu.
              </p>
              <p className="text-base font-normal my-2">
                Sân bóng rất đông và luôn kín lịch, bạn muốn thuê sân vào các
                giờ cao điểm giờ đây sẽ rất khó khăn, hãy liện hệ chủ sân hoặc
                đặt sân trực tiếp để chọn cho mình khoảng thời gian phù hợp tham
                gia vào các trận đấu. Đồng thời cũng có thể áp dụng các mã giảm
                giá để giảm được chi phí đi hơn nhiều
              </p>
              <p className="text-base font-normal my-2">
                Cụm sân gồm 4 sân bóng đá mini, cũng giúp dễ dàng tổ chức thi
                đấu bóng đá cũng như thi đấu sân bóng 11 người dễ dàng
              </p>
            </Grid>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <p className="text-2xl font-semibold border-b-2 border-[#28A745] inline-block">
                  Bao gồm
                </p>
                <p className="text-base font-normal my-2">
                  - Sân bóng đá chất lượng cao.
                </p>
                <p className="text-base font-normal my-2">
                  - Đội ngũ nhân viên hỗ trợ tận tình.
                </p>
                <p className="text-base font-normal my-2">
                  - Dịch vụ đặt sân trực tuyến tiện lợi.
                </p>
              </Grid>
              <Grid item xs={12}>
                <p className="text-2xl font-semibold border-b-2 border-[#28A745] inline-block">
                  Quy định
                </p>
                <p className="text-base font-normal my-2">
                  - Khách hàng vui lòng đến đúng giờ đã đặt.
                </p>
                <p className="text-base font-normal my-2">
                  - Không mang thức ăn và đồ uống vào sân.
                </p>
                <p className="text-base font-normal my-2">
                  - Giữ gìn vệ sinh chung và không xả rác.
                </p>
              </Grid>
              <Grid item xs={12}>
                <p className="text-2xl font-semibold border-b-2 border-[#28A745] inline-block">
                  Tiện nghi
                </p>
                <p className="text-base font-normal my-2">
                  - Phòng thay đồ và phòng tắm sạch sẽ.
                </p>
                <p className="text-base font-normal my-2">
                  - Bãi đỗ xe an toàn và miễn phí.
                </p>
                <p className="text-base font-normal my-2">
                  - Wifi miễn phí cho tất cả khách hàng.
                </p>
              </Grid>
            </Grid>
            <Grid item xs = {12}>
              <CommentSection/>
            </Grid>
          </Grid>
        </div>
        <div className="w-[18%] pl-4 gap-4">
          <p className="text-2xl font-semibold border-b-2 border-[#28A745] inline-block">
            Mã giảm giá của sân
          </p>
          <div className="flex w-full border rounded-md px-2 py-2 gap-2 mt-4 bg-[#Fde7e7]">
            <div className="w-full">
              <p className="text-sm font-normal text-[#DC3545]">Giảm 30%</p>
              <p className="text-sm font-normal text-[#DC3545]">
                Đơn tối thiểu 300k
              </p>
              <p className="text-sm font-normal text-[#DC3545]">
                Giảm tối đa 30k
              </p>
              <div className="border rounded-sm px-2 border-[#DC3545]">
                <p className="text-xs font-normal text-[#DC3545]">Sân 7,9</p>
              </div>
              <p className="text-sm font-normal">HSD: 12.06.2024</p>
            </div>
            <div className="w-[25%] flex justify-center items-center">
              <Button className="bg-[#DC3545] hover:bg-[#ff6550]">Lưu</Button>
            </div>
          </div>
          <div className="flex w-full border rounded-md px-2 py-2 gap-2 mt-4 bg-[#Fde7e7]">
            <div className="w-full">
              <p className="text-sm font-normal text-[#DC3545]">Giảm 30%</p>
              <p className="text-sm font-normal text-[#DC3545]">
                Đơn tối thiểu 300k
              </p>
              <p className="text-sm font-normal text-[#DC3545]">
                Giảm tối đa 30k
              </p>
              <div className="border rounded-sm px-2 border-[#DC3545]">
                <p className="text-xs font-normal text-[#DC3545]">Sân 7,9</p>
              </div>
              <p className="text-sm font-normal">HSD: 12.06.2024</p>
            </div>
            <div className="w-[25%] flex justify-center items-center">
              <Button className="bg-[#DC3545] hover:bg-[#ff6550]">Lưu</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
