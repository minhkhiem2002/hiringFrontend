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
import { useFieldsStore } from "@/services/store/fieldStore";
import { Box, Grid, Skeleton } from "@mui/material";

const categories = [
  { id: "Bóng đá", label: "Bóng đá" },
  { id: "Bóng rổ", label: "Bóng rổ" },
  { id: "Bóng chuyền", label: "Bóng chuyền" },
  { id: "Cầu lông", label: "Cầu lông" },
  { id: "Bơi lội", label: "Bơi lội" },
  { id: "Thể thao trong nhà", label: "Thể thao trong nhà" },
];

const locations = [
  { id: "Quận 1", label: "Quận 1" },
  { id: "Quận 3", label: "Quận 3" },
  { id: "Quận 5", label: "Quận 5" },
  { id: "Quận 10", label: "Quận 10" },
  { id: "Quận Bình Thạnh", label: "Quận Bình Thạnh" },
  { id: "Quận Gò Vấp", label: "Quận Gò Vấp" },
  { id: "Khác", label: "Khác" },
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
  locations: z.array(z.string()).optional(),
  ratings: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

const Equipment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFieldsData = useFieldsStore(state => state.fetchFieldsData)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: '',
      items: [],
      locations: [],
      ratings: [],
      minPrice: 0,
      maxPrice: 1000000,

    },
  });

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Trình duyệt không hỗ trợ Geolocation.");
    }
  }, []);

  // Hàm gọi API
  const fetchFilteredData = async () => {
    const { items, locations, ratings, minPrice, maxPrice } = form.getValues();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://sportappdemo.azurewebsites.net/api/SportField/GetSportFields`, {
          params: {
            PageSize: itemsPerPage,
            PageNumber: currentPage,
            Search: null,
            Sort: "rating",
            Sports: items ? items.join(",") : null,
            StarRatings: ratings ? ratings.join(",") : null,
            MinPrice: minPrice,
            MaxPrice: maxPrice,
            UserLat: location? location.latitude : 0,
            UserLong: location ? location.longitude : 0,
          },
        }
      );

      setFilteredItems(response.data.fields); 
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
    form.watch("locations"),
    form.watch("ratings"),
    form.watch("minPrice"),
    form.watch("maxPrice"),
    currentPage,
  ]);

  useEffect(() => {
    if (location) {
      fetchFilteredData();
    }
  },[location])

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
                    <Link href={`/equipment/${item.endPoint}`} key={item.id}>
                      <CardEq 
                          title={item.name} 
                          priceRange={item.priceRange} 
                          images={item.pictureUrl}
                        />
                    </Link>
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
