"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import Image from "next/image";
import { CardMedia } from "@mui/material";

interface CardEqProps {
  title: string;
  priceRange: string;
  images: string;
}

const CardEq = ({ title, priceRange, images }: CardEqProps) => {
  return (
    <div className="flex flex-col">
      <Card className="w-[350px] h-[320px] relative transition-transform hover:shadow-xl cursor-pointer">
        <CardMedia
          sx={{ height: 200 }}
          image={images}
          title="image equipment"
        />
        {/* <CardHeader>
          <Image src={images} width={300} height={200} alt="Field" className="rounded-md w-[300px] h-[200px]" />
        </CardHeader> */}
        <CardContent>
          <div className='gap-y-4'>
            <CardTitle className='text-md'>{title}</CardTitle>
            <CardTitle className='flex text-sm space-x-2 text-[#7D92A1] font-medium my-2'>
              <FaRegMoneyBillAlt className='size-5' /> <span className='text-[#DC0F0F]'>{priceRange}</span>
            </CardTitle>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


export default CardEq;
