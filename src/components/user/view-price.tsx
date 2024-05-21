import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoMdPricetags } from "react-icons/io";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const pricelist = [
  {
    times: "Từ 6.00 AM đến 10.00 AM",
    price: "110.000 VND / giờ",
  },
  {
    times: "Từ 10.00 AM đến 15.00 PM",
    price: "90.000 VND / giờ",
  },
  {
    times: "Từ 15.00 PM đến 18.00 PM",
    price: "120.000 VND / giờ",
  },
  {
    times: "Từ 18.00 PM đến 23.00 PM",
    price: "130.000 VND / giờ",
  }
]

const ViewPriceDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[#28A745] text-[#28A745] px-4 py-0 text-md">
          <IoMdPricetags className="size-4 text-[#28A745] mr-2" /> Xem bảng giá
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[800px]">
        <DialogHeader>
          <DialogTitle className = 'text-3xl flex justify-center items-center'>BẢNG GIÁ THUÊ SÂN</DialogTitle>
          <DialogDescription className = 'flex justify-center items-center'>
           Bảng giá thuê sân tại Spotta
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="san5" className="w-full">
          <TabsList className="flex space-x-2">
            <TabsTrigger value="san5" className="flex-1">Sân 5</TabsTrigger>
            <TabsTrigger value="san7" className="flex-1">Sân 7</TabsTrigger>
            <TabsTrigger value="san9" className="flex-1">Sân 9</TabsTrigger>
          </TabsList>
          <TabsContent value="san5">
          <Table className = 'mt-2'>
      <TableHeader>
        <TableRow className = 'bg-[#31AAB7] hover:bg-[#31AAB7]'>
          <TableHead className="w-[200px] text-white py-4 pl-12">Thời gian</TableHead>
          <TableHead className="text-right text-white">Giá thuê sân / Giờ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pricelist.map((list) => (
          <TableRow key={list.times} className = 'py-2'>
            <TableCell className="font-medium py-4">{list.times}</TableCell>
            <TableCell className="text-right">{list.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
          </TabsContent>
          <TabsContent value="san7">
          <Table className = 'mt-2'>
      <TableHeader>
        <TableRow className = 'bg-[#31AAB7] hover:bg-[#31AAB7]'>
          <TableHead className="w-[200px] text-white py-4 pl-12">Thời gian</TableHead>
          <TableHead className="text-right text-white">Giá thuê sân / Giờ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pricelist.map((list) => (
          <TableRow key={list.times} className = 'py-2'>
            <TableCell className="font-medium py-4">{list.times}</TableCell>
            <TableCell className="text-right">{list.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
          </TabsContent>
          <TabsContent value="san9">
          <Table className = 'mt-2'>
      <TableHeader>
        <TableRow className = 'bg-[#31AAB7] hover:bg-[#31AAB7]'>
          <TableHead className="w-[200px] text-white py-4 pl-12">Thời gian</TableHead>
          <TableHead className="text-right text-white">Giá thuê sân / Giờ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pricelist.map((list) => (
          <TableRow key={list.times} className = 'py-2'>
            <TableCell className="font-medium py-4">{list.times}</TableCell>
            <TableCell className="text-right">{list.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPriceDialog;
