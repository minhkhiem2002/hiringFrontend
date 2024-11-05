"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CiLocationOn } from "react-icons/ci";
import { TiNews } from "react-icons/ti";
import { FaRegMoneyBillAlt, FaStar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Field from "../../../public/images/Field.jpg";

interface CardDpProps {
  title: string;
  location: string;
  priceRange: string;
  rating: number;
  reviews: number;
}

const CardDp = ({ title, location, priceRange, rating, reviews }: CardDpProps) => {
  return (
    <div className="flex flex-col">
      <Card className="w-[350px] h-[400px] relative transition-transform hover:shadow-xl cursor-pointer">
        <CardHeader>
          <Image src={Field} width={300} height={200} alt="Field" className="rounded-md w-[300px] h-[200px]" />
        </CardHeader>
        <CardContent>
          <div className='gap-y-4'>
            <CardTitle className='text-md'>{title}</CardTitle>
            <CardTitle className='flex text-sm space-x-2 text-[#7D92A1] font-medium my-2'>
              <CiLocationOn className='size-5' /> <span>{location}</span>
            </CardTitle>
            {/* <CardTitle className='flex text-sm space-x-2 text-[#7D92A1] font-medium my-2'>
              <TiNews className='size-5' /> <span>{description}</span>
            </CardTitle> */}
            <CardTitle className='flex text-sm space-x-2 text-[#7D92A1] font-medium my-2'>
              <FaRegMoneyBillAlt className='size-5' /> <span className='text-[#DC0F0F]'>{priceRange}</span> / giờ
            </CardTitle>
            <CardTitle className='flex'>
              <Badge className='flex items-center bg-green-500 text-white rounded-md'>
                {rating} <FaStar className='size-3 text-white ml-1' />
              </Badge>
              <p className='text-sm font-medium ml-2'>({reviews} reviews)</p>
            </CardTitle>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


export default CardDp;
