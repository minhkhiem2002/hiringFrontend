import {
    Card,
    CardContent
} from "@/components/ui/card";
import Image from "next/image";
import DetailImage from "../../../../public/images/Detail.jpg";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Navbar from "@/components/user/main-nav";
import { Badge } from "@/components/ui/badge";
import { FaStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { TiNews } from "react-icons/ti";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoMdPricetags } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import ViewPriceDialog from '../../../components/user/view-price'
const Detail = () => {
    return (
        <div>
                <Navbar />
            <div className='flex w-full pl-16 mt-4 gap-4'>
                <div className="w-2/5">
                    <Card className="overflow-hidden">
                        <CardContent className="flex flex-col pt-5">
                            <div className="flex-grow grid gap-2">
                                <Image
                                    alt="Product image"
                                    className="w-full rounded-md h-[300px]"
                                    height="200"
                                    src={DetailImage}
                                    width="300"
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
                <div className='w-[55%] space-y-6 pt-4 pl-4'>
                    <p className='text-4xl font-semibold'>Sân Bóng Đá Khu A</p>
                    <p className='text-lg font-medium text-[#7D92A1]'>Chủ sân: Lê Minh Khiêm - Liên hệ: 0123456789</p>
                    <div className='flex'>
                        <Badge className='flex items-center bg-green-500 text-sm text-white rounded-md'>
                            4.7 <FaStar className='size-4 text-white ml-1' />
                        </Badge>
                        <p className='text-base font-medium ml-2'>200 Đã Đặt Sân | 650+ Reviews</p>
                    </div>
                    <p className='flex text-base space-x-2 font-medium my-2'><CiLocationOn className='size-5' /> <span> Sân liên hợp ĐHQG, Dĩ An, Bình Dương </span></p>
                    <p className='flex text-base space-x-2 font-medium my-2'><TiNews className='size-5' /> <span> Sân mới đầu tư | Hiện đại </span></p>
                    <p className='flex text-base space-x-2 font-medium my-2'><RiSendPlaneFill  className='size-5' /> <span> Sân 5 </span></p>
                    <p className='flex text-base space-x-2 font-medium my-2'><RiSendPlaneFill  className='size-5' /> <span> Sân 7 </span></p>
                    <p className='flex text-base space-x-2 font-medium my-2'><FaRegMoneyBillAlt className='size-5' /> <span> Mức giá: <span className='text-[#DC0F0F]'>150000 VNĐ - 200000 VNĐ</span> / giờ </span></p>
                    <div className = 'flex gap-12'>
                        <ViewPriceDialog/>
                        <Button className = 'bg-[#31AAB7] text-white px-4 py-0 text-md hover:bg-[#6DCDD8]'> <FaCartShopping  className='size-4 text-white mr-2'/> Đặt sân</Button>
                        <Button variant="outline" className = 'border-[#28A745] text-[#28A745] px-4 py-0 text-md'> <FaRegHeart  className='size-4 text-[#28A745] mr-2'/> Theo dõi</Button>
                    </div>
                    </div>
                </div>
                <div className = 'flex pl-16 mt-4 gap-4'>
                    <div className = 'w-[70%]'>
                        <p className='text-2xl font-semibold border-b-2 border-[#28A745] inline-block'>Mô tả sân</p>
                        <p className='text-base font-normal my-2'>
                            Sân bóng đá Khu A là sân bóng lâu đời, mới được chủ đầu tư chỉnh trang, nâng cấp và đang là một trong những sân bóng đẹp nhất Làng Đại Học Quốc Gia. Với vị trí vô cùng thuận lợi, nằm ngay mặt đường chính, đối diện là khu KTX khu A, sân bóng đá khu A đã trở thành địa điểm giao lưu hàng đầu.
                        </p>
                        <p className='text-base font-normal my-2'>
                        Sân bóng rất đông và luôn kín lịch, bạn muốn thuê sân vào các giờ cao điểm giờ đây sẽ rất khó khăn, hãy liện hệ chủ sân hoặc đặt sân trực tiếp để chọn cho mình khoảng thời gian phù hợp tham gia vào các trận đấu. Đồng thời cũng có thể áp dụng các mã giảm giá để giảm được chi phí đi hơn nhiều
                        </p>
                        <p className='text-base font-normal my-2'>
                        Cụm sân gồm 4 sân bóng đá mini, cũng giúp dễ dàng tổ chức thi đấu bóng đá cũng như thi đấu sân bóng 11 người dễ dàng
                        </p>
                    </div>
                    <div className = 'w-[25%] pl-4 gap-4'>
                        <p className='text-2xl font-semibold border-b-2 border-[#28A745] inline-block'>Mã giảm giá của sân</p>
                        <div className = 'flex w-4/5 border rounded-md px-2 py-2 gap-2 mt-4 bg-[#Fde7e7]'>
                        <div className = 'w-[70%]'>
                            <p className = 'text-sm font-normal text-[#DC3545]'>Giảm 30%</p>
                            <p className = 'text-sm font-normal text-[#DC3545]'>Đơn tối thiểu 300k</p>
                            <p className = 'text-sm font-normal text-[#DC3545]'>Giảm tối đa 30k</p>
                            <div className = 'border rounded-sm px-2 border-[#DC3545]'>
                                <p className = 'text-xs font-normal text-[#DC3545]'>Sân 7,9</p>
                            </div>
                            <p className = 'text-sm font-normal'>HSD: 12.06.2024</p>
                        </div>
                        <div className = 'w-[25%] flex justify-center items-center'>
                            <Button className = 'bg-[#DC3545]'>Lưu</Button>
                        </div>
                        </div>
                        <div className = 'flex w-4/5 border rounded-md px-2 py-2 gap-2 mt-4 bg-[#Fde7e7]'>
                        <div className = 'w-[70%]'>
                            <p className = 'text-sm font-normal text-[#DC3545]'>Giảm 30%</p>
                            <p className = 'text-sm font-normal text-[#DC3545]'>Đơn tối thiểu 300k</p>
                            <p className = 'text-sm font-normal text-[#DC3545]'>Giảm tối đa 30k</p>
                            <div className = 'border rounded-sm px-2 border-[#DC3545]'>
                                <p className = 'text-xs font-normal text-[#DC3545]'>Sân 7,9</p>
                            </div>
                            <p className = 'text-sm font-normal'>HSD: 12.06.2024</p>
                        </div>
                        <div className = 'w-[25%] flex justify-center items-center'>
                            <Button className = 'bg-[#DC3545]'>Lưu</Button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            );
};
            export default Detail;
