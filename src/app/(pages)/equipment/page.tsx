"use client";
import { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/user/main-nav";
import CardEq from "@/components/user/card-eq";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { FaStar, FaRegStar } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { useEquipmentStore } from "@/services/store/equipmentStore";
import { Box, Grid, Skeleton } from "@mui/material";

const categories = [
  { id: "Bóng đá", label: "Bóng đá" },
  { id: "Bóng rổ", label: "Bóng rổ" },
  { id: "Bóng chuyền", label: "Bóng chuyền" },
  { id: "Cầu lông", label: "Cầu lông" },
  { id: "Bơi lội", label: "Bơi lội" },
  { id: "Thể thao trong nhà", label: "Thể thao trong nhà" },
];


const ratings = [
  { id: "5star", label: <div className='flex gap-1'><FaStar color="#F4B30C" /><FaStar color="#F4B30C" /><FaStar color="#F4B30C" /><FaStar color="#F4B30C" /><FaStar color="#F4B30C" /></div> },
  { id: "4star", label: <div className='flex gap-1'><FaStar color="#F4B30C" /><FaStar color="#F4B30C" /><FaStar color="#F4B30C" /><FaStar color="#F4B30C" /><FaRegStar color="#F4B30C" /><p>trở lên</p></div> },
  { id: "3star", label: <div className='flex gap-1'><FaStar color="#F4B30C" /><FaStar color="#F4B30C" /><FaStar color="#F4B30C" /><FaRegStar color="#F4B30C" /><FaRegStar color="#F4B30C" /><p>trở lên</p></div> },
  { id: "2star", label: <div className='flex gap-1'><FaStar color="#F4B30C" /><FaStar color="#F4B30C" /><FaRegStar color="#F4B30C" /><FaRegStar color="#F4B30C" /><FaRegStar color="#F4B30C" /><p>trở lên</p></div> },
  { id: "1star", label: <div className='flex gap-1'><FaStar color="#F4B30C" /><FaRegStar color="#F4B30C" /><FaRegStar color="#F4B30C" /><FaRegStar color="#F4B30C" /><FaRegStar color="#F4B30C" /><p>trở lên</p></div> },
];

const itemsPerPage = 9;

// Schema validate form
const FormSchema = z.object({
  search: z.string().optional(),
  items: z.array(z.string()).optional(),
  ratings: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  orderBy: z.string().optional(), 
});

const Equipment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const {fetchEquipmentsData} = useEquipmentStore()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: '',
      items: [],
      ratings: [],
      minPrice: 0,
      maxPrice: 1000000,
    },
  });

  const [error, setError] = useState(null);


  // Hàm gọi API
  const fetchFilteredData = async () => {
    const { items,search, ratings, minPrice, maxPrice, orderBy  } = form.getValues();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://sportappdemo.azurewebsites.net/api/SportProduct/GetSportProducts`, {
          params: {
            PageSize: itemsPerPage,
            PageNumber: currentPage,
            Search: search || null,
            Sort: "rating",
            Sports: items ? items.join(",") : null,
            OrderBy: orderBy || null,
            Colors: null,
            Sizes: null
          },
        }
      );

      setFilteredItems(response.data.products); 
      setTotalItems(response?.data?.count); 
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch data",
        status: "error",
      });
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [
    form.watch("items"),
    form.watch("search"),
    form.watch("ratings"),
    form.watch("minPrice"),
    form.watch("maxPrice"),
    form.watch("orderBy"),
    currentPage,
  ]);


  // Số trang dựa trên tổng số mục trả về từ API
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const skeletonItems = Array.from({ length: 9 });

  return (
    <div>
      <Navbar />
      <div className="mt-4 flex">
        <div className="w-1/5 px-7 py-4 border rounded-xl h-fit">
          <Form {...form}>
            <FormLabel className="text-lg text-[#21717A]">Filter By</FormLabel>
            <div className="h-px my-4 bg-gray-300 shadow"></div>
            <form onSubmit={form.handleSubmit(fetchFilteredData)} className="space-y-8">
            <FormItem>
                <div className="flex items-center space-x-4">
                  <Input
                    id="search"
                    type="text"
                    onChange={(e) => form.setValue("search", e.target.value)}
                    placeholder="Tìm kiếm"
                    className="h-8"
                  />
                </div>
              </FormItem>
              <FormField
                control={form.control}
                name="items"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-sm text-[#566976]">Categories</FormLabel>
                    </div>
                    {categories.map((item) => (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                field.onChange([...field.value, item.id]);
                              } else {
                                field.onChange(field.value?.filter((value) => value !== item.id));
                              }
                            }}
                            className="data-[state=checked]:bg-[#129AA6]"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-[#7D92A1] text-sm">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="h-px bg-gray-300 shadow"></div>
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-sm text-[#566976]">Giá</FormLabel>
                </div>
                <p className='text-sm text-[#566976]'>Chọn khoảng giá</p>
                <div className="flex items-center space-x-4">
                  <Input
                    id="minPrice"
                    type="number"
                    onChange={(e) => form.setValue("minPrice", Number(e.target.value))}
                    placeholder="Giá thấp nhất"
                    className="h-8"
                  />
                  <span>-</span>
                  <Input
                    id="maxPrice"
                    type="number"
                    onChange={(e) => form.setValue("maxPrice", Number(e.target.value))}
                    placeholder="Giá cao nhất"
                    className="h-8"
                  />
                </div>
              </FormItem>
              <FormItem>
  <div className="mb-4">
    <FormLabel className="text-sm text-[#566976]">Sắp xếp</FormLabel>
  </div>
  <FormControl>
    <select
      id="OrderBy"
      onChange={(e) => form.setValue("orderBy", e.target.value)}
      className="h-8 w-full border rounded-md px-2 text-sm text-[#566976]"
    >
      <option value="">Mặc định</option>
      <option value="A-Z">Tên: A-Z</option>
      <option value="Z-A">Tên: Z-A</option>
      <option value="$-$$$">Giá: Thấp đến cao</option>
      <option value="$$$-$">Giá: Cao đến thấp</option>
    </select>
  </FormControl>
</FormItem>

            </form>
          </Form>
        </div>
        <div className="w-4/5 p-6">
          {isLoading ? (
            <>
  <Box className="flex gap-12">
    <Skeleton variant="rectangular" width={350} height={370} />
    <Skeleton variant="rectangular" width={350} height={370} />
    <Skeleton variant="rectangular" width={350} height={370} />
  </Box>
  <Box className="flex gap-12 mt-4">
    <Skeleton variant="rectangular" width={350} height={370} />
    <Skeleton variant="rectangular" width={350} height={370} />
    <Skeleton variant="rectangular" width={350} height={370} />
  </Box>
  <Box className="flex gap-12 mt-4">
    <Skeleton variant="rectangular" width={350} height={370} />
    <Skeleton variant="rectangular" width={350} height={370} />
    <Skeleton variant="rectangular" width={350} height={370} />
  </Box>
</>

          ) : (
            <div>
              <div className="grid grid-cols-3 gap-4">
                {filteredItems && filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    // <Link href={/equipment/${item.colorEndpoints[0].endPoint}} key={item.id}>
                      <CardEq 
                          pictureUrl={item.pictureUrl} 
                          colorEndpoints={item.colorEndpoints} 
                          price={item.price}
                          name={item.name}
                          sport={item.sport}
                        />
                    // </Link>
                  ))
                ) : (
                  <p>No items found</p>
                )}
              </div>

              <div className="flex justify-center mt-4">
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                    color="primary"
                  />
                </Stack>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Equipment;