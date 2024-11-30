"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
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
import { useRouter } from 'next/navigation';
import CommentSection from './comment';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRatingStore, useFieldStore } from "@/services/store/fieldStore";
import { ImageField, CommentData, DetailData } from "@/services/interfaces/fieldInterface";
import Loading from "@/components/user/loading";
import ModalUnlogin from "@/components/user/card-team/modal-unlogin";
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';

const customMarker = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41], // Kích thước icon
  iconAnchor: [12, 41], // Điểm neo của icon
  popupAnchor: [1, -34], // Điểm hiển thị popup
});

const formatDateTime = (dateTime: any) => {
  const date = new Date(dateTime);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function Detail({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const id = params.slug;

  const position = [10.84488722399991, 106.63925902499713];

  const isSuccess = useRatingStore(state => state.isSuccess);
  const fetchFieldData = useFieldStore(state => state.fetchFieldData);
  const field = useFieldStore(state => state.field);
  const loading = useFieldStore(state => state.loading);

  useEffect(() => {
    fetchFieldData(id);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      fetchFieldData(id);
    }
  }, [isSuccess]);

  const [openUnlogin, setOpenUnlogin] = useState(false);

  const handleBooking = async () => {
    const user = sessionStorage.getItem('roleId');
    if (!user) {
      setOpenUnlogin(true);
    } else {
      router.push(`/filter/${id}/booking`);
    }
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
  {/* Tiêu Đề */}
  <p className="text-2xl font-semibold border-b-4 border-[#28A745] inline-block mb-4">Mô tả sân</p>
  <div className="mb-6">
    <p className="text-lg text-gray-800 leading-relaxed">
      Sân thể thao Khu A là lựa chọn lý tưởng cho những trận đấu sôi động và hấp dẫn. Với cơ sở hạ tầng mới được cải tạo, sân luôn đông đúc và kín lịch, khiến việc đặt sân vào các giờ cao điểm trở nên khó khăn hơn bao giờ hết. Cụm sân gồm 4 sân mini và một sân lớn, giúp dễ dàng tổ chức thi đấu và luyện tập.
    </p>
  </div>

  {/* Bao Gồm */}
  <div className="mb-6">
    <p className="text-xl font-semibold text-indigo-600 mb-2">Bao Gồm</p>
    <ul className="list-inside list-disc text-gray-700 space-y-2">
      <li>Sân thể thao chất lượng cao: Cỏ nhân tạo đạt tiêu chuẩn FIFA, khung thành và rào chắn chắc chắn.</li>
      <li>Đội ngũ nhân viên hỗ trợ tận tình: Sẵn sàng giúp đỡ khách hàng với mọi yêu cầu từ việc sắp xếp sân đến việc cung cấp thông tin về lịch sử đấu và quy định của sân.</li>
      <li>Dịch vụ đặt sân trực tuyến tiện lợi: Bạn có thể đặt sân chỉ với vài cú nhấp chuột trên trang web của chúng tôi, dễ dàng kiểm tra lịch trình và đặt chỗ.</li>
    </ul>
  </div>

  {/* Quy Định */}
  <div className="mb-6">
    <p className="text-xl font-semibold text-indigo-600 mb-2">Quy Định</p>
    <ul className="list-inside list-disc text-gray-700 space-y-2">
      <li>Khách hàng vui lòng đến đúng giờ đã đặt. Sân có chính sách không chấp nhận khách đến muộn.</li>
      <li>Không mang thức ăn và đồ uống vào sân để giữ gìn vệ sinh chung.</li>
      <li>Giữ gìn vệ sinh chung, không xả rác, và thực hiện quy định về an ninh của sân.</li>
    </ul>
  </div>

  {/* Tiện Nghi */}
  <div className="mb-6">
    <p className="text-xl font-semibold text-indigo-600 mb-2">Tiện Nghi</p>
    <ul className="list-inside list-disc text-gray-700 space-y-2">
      <li>Phòng thay đồ và phòng tắm sạch sẽ: Trang bị đầy đủ nước nóng lạnh, xà phòng, khăn lau, và gương soi.</li>
      <li>Bãi đỗ xe an toàn và miễn phí: Được bảo vệ 24/7, dễ dàng đậu xe và không cần lo lắng về an toàn.</li>
      <li>Wifi miễn phí cho tất cả khách hàng: Duy trì kết nối liên tục với internet trong suốt trận đấu.</li>
    </ul>
  </div>

  {/* Đánh Giá Sân */}
  <div className="mb-6">
    <p className="text-xl font-semibold text-indigo-600 mb-2">Đánh Giá Sân</p>
    <p className="text-gray-800">Mức giá: Các mức giá được niêm yết rõ ràng và hợp lý, dao động từ 200,000 - 500,000 VNĐ/giờ.</p>
    <p className="text-gray-800">Sao đánh giá: Sân đạt đánh giá cao từ người chơi với 200+ lượt đặt sân và hơn 100+ đánh giá tích cực.</p>
    <p className="text-gray-800">Địa điểm: Nằm ngay trung tâm Làng Đại Học Quốc Gia, dễ dàng di chuyển từ các trường đại học lớn trong khu vực.</p>
  </div>

  {/* Vị Trí và Tiện Ích Bổ Sung */}
  <div className="mb-6">
    <p className="text-xl font-semibold text-indigo-600 mb-2">Vị Trí và Tiện Ích Bổ Sung</p>
    <p className="text-gray-800">Vị trí địa lý: Cách các trường đại học lớn chỉ 5 phút đi bộ.</p>
    <p className="text-gray-800">Giao thông thuận tiện: Gần trạm xe buýt và đường lớn, dễ dàng di chuyển bằng xe đạp, xe máy, và xe hơi.</p>
  </div>

  {/* Thông Tin Liên Hệ */}
  <div className="mb-6">
    <p className="text-xl font-semibold text-indigo-600 mb-2">Thông Tin Liên Hệ</p>
    <p className="text-gray-800">Địa chỉ: Làng Đại Học Quốc Gia, Quận Thủ Đức, TP. HCM.</p>
    <p className="text-gray-800">Điện thoại: 0987654321</p>
    <p className="text-gray-800">Email: support@sandboxfootball.vn</p>
    <p className="text-gray-800">Trang web: sandboxfootball.vn</p>
  </div>

  {/* Cảm Nhận Khách Hàng */}
  <div className="mb-6">
    <p className="text-xl font-semibold text-indigo-600 mb-2">Cảm Nhận Khách Hàng</p>
    <p className="text-gray-800">Khách hàng của sân thể thao Khu A rất hài lòng về chất lượng cơ sở vật chất, dịch vụ và quy trình đặt sân thuận tiện. Nhiều người chơi nhận xét rằng sân thể thao là địa điểm lý tưởng để tổ chức các trận đấu, giải đấu nhỏ và giao lưu giữa các đội.</p>
  </div>
</Grid>

            {/* Other sections like Quy định, Tiện nghi */}
            <Grid item xs={12}>
              <CommentSection />
            </Grid>
          </Grid>
        </div>

        {/* Voucher and Map Section */}
        <div className="w-[23%] pl-4 gap-4">
          <p className="text-2xl font-semibold border-b-2 border-[#28A745] inline-block">Mã giảm giá của sân</p>
          {field?.vouchers?.map((voucher, index) => (
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
          <div className="flex justify-center mt-4">
            <MapContainer center={position} zoom={15} style={{ width: "100%", height: "300px" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position} icon={customMarker}>
                <Popup>{field?.address}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Modal for Unlogin */}
      <ModalUnlogin open={openUnlogin} onClose={() => setOpenUnlogin(false)} />
    </div>
  );
}

export default Detail;
