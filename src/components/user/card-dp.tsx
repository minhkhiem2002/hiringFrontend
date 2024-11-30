"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CiLocationOn } from "react-icons/ci";
import { TiNews } from "react-icons/ti";
import { FaRegMoneyBillAlt, FaStar, FaCarSide } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface CardDpProps {
  title: string;
  location: string;
  priceRange: string;
  rating: number;
  reviews: number;
  images: string;
  distance: string;
  duration: string;
}

const CardDp = ({
  title,
  location,
  priceRange,
  rating,
  reviews,
  images,
  distance,
  duration,
}: CardDpProps) => {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-[350px] h-fit relative transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer rounded-lg overflow-hidden bg-white shadow-md">
        <CardHeader className="relative">
          <Image
            src={images}
            width={350}
            height={200}
            alt="Field"
            className="w-full h-[200px] object-cover"
          />
          <Badge className="absolute top-2 left-2 bg-yellow-400 text-black font-bold px-3 py-1 rounded-md">
            Hot
          </Badge>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-bold text-gray-800 truncate mb-2">{title}</CardTitle>
          <CardTitle className="flex items-center text-sm space-x-2 text-gray-600 mb-2">
            <CiLocationOn className="text-blue-500 text-xl" />
            <span>{location}</span>
          </CardTitle>
          <CardTitle className="flex items-center text-sm space-x-2 text-gray-600 mb-2">
            <FaRegMoneyBillAlt className="text-green-500 text-xl" />
            <span className="text-red-600 font-semibold">{priceRange}</span> / giờ
          </CardTitle>
          {/* Tạo phần thông tin về khoảng cách và thời gian */}
          <div className="flex justify-between text-sm space-x-2 mt-3 text-gray-600">
            <div className="flex items-center space-x-2">
              <FaCarSide className="text-blue-600" />
              <span className="font-semibold">{duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CiLocationOn className="text-blue-600" />
              <span className="font-semibold">{distance}</span>
            </div>
          </div>
          {/* Đánh giá và reviews */}
          <div className="flex items-center space-x-2 mt-2">
            <Badge className="flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md">
              {rating} <FaStar className="text-yellow-400 ml-1" />
            </Badge>
            <span className="text-sm text-gray-600">({reviews} reviews)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardDp;
