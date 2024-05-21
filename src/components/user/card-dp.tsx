"use client";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Field from "../../../public/images/Field.jpg";
import { CiLocationOn } from "react-icons/ci";
import { TiNews } from "react-icons/ti";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge"
const CardDp = () => {
    return (
        <div className="flex flex-col">
            <Card className="w-[350px] h-[400px] border-none relative transition-transform hover:shadow-lg cursor-pointer">
                <CardHeader>
                    <Image src={Field} width={300} height={200} alt="News" className="rounded-md w-[300px] h-[200px]" />
                </CardHeader>
                <CardContent>
                    <div className='gap-y-4'>
                        <CardTitle className='text-md'>Sân Bóng Đá khu A</CardTitle>
                        <CardTitle className='flex text-sm space-x-2 text-[#7D92A1] font-medium my-2'><CiLocationOn className='size-5' /> <span> Sân liên hợp ĐHQG, Dĩ An, Bình Dương </span></CardTitle>
                        <CardTitle className='flex text-sm space-x-2 text-[#7D92A1] font-medium my-2'><TiNews className='size-5' /> <span> Sân mới đầu tư | Hiện đại </span></CardTitle>
                        <CardTitle className='flex text-sm space-x-2 text-[#7D92A1] font-medium my-2'><FaRegMoneyBillAlt className='size-5' /> <span className='text-[#DC0F0F]'>150000 VNĐ - 200000 VNĐ</span> / giờ</CardTitle>
                        <CardTitle className='flex'>
                            <Badge className='flex items-center bg-green-500 text-white rounded-md'>
                                4.7 <FaStar className='size-3 text-white ml-1' />
                            </Badge>

                            <p className='text-sm font-medium ml-2'>(650 reviews)</p>
                        </CardTitle>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
export default CardDp;
