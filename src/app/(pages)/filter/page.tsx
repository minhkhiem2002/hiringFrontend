"use client";
import { useState, useEffect } from "react";
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
import CardDp from "@/components/user/card-dp";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import data from "@/ultils/data.json";
import { FaStar, FaRegStar } from "react-icons/fa";
import Link from "next/link";

const categories = [
  { id: "football", label: "Bóng đá" },
  { id: "basketball", label: "Bóng rổ" },
  { id: "volleyball", label: "Bóng chuyền" },
  { id: "badminton", label: "Cầu lông" },
  { id: "swimming", label: "Bơi lội" },
  { id: "indoor", label: "Thể thao trong nhà" },
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

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one item."
  }),
  locations: z.array(z.string()).optional(),
  ratings: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

const CheckboxReactHookFormMultiple = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<any[]>(data);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
      locations: [],
      ratings: [],
      minPrice: 0,
      maxPrice: 1000000,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  useEffect(() => {
    const { items, locations, ratings, minPrice, maxPrice } = form.getValues();
  
    const filtered = data.filter(item => {
      const matchesCategory = items.length === 0 || items.includes(item.type);
      const matchesLocation = locations?.length === 0 || locations?.includes(item.district);
      const matchesRating = ratings?.length === 0 || ratings?.some(rating => {
        const itemRating = item.rating; 
        switch (rating) {
          case "5star":
            return itemRating === 5;
          case "4star":
            return itemRating >= 4;
          case "3star":
            return itemRating >= 3;
          case "2star":
            return itemRating >= 2;
          case "1star":
            return itemRating >= 1;
          default:
            return true;
        }
      });
      
      // Assuming priceRange is formatted as "min-max"
      const priceRange = item.priceRange.split('-').map(price => parseInt(price.replace(/[^0-9]/g, '')));
      const matchesPrice = (minPrice ? priceRange[0] >= minPrice : true) &&
                           (maxPrice ? priceRange[1] <= maxPrice : true);
  
      return matchesCategory && matchesLocation && matchesRating && matchesPrice;
    });
  
    setFilteredItems(filtered);
  }, [
    form.watch("items"),
    form.watch("locations"),
    form.watch("ratings"),
    form.watch("minPrice"),
    form.watch("maxPrice"),
  ]);
  

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Navbar />
      <div className="mt-4 flex">
        <div className="w-1/5 px-7 py-4 border rounded-xl h-fit">
          <Form {...form}>
            <FormLabel className="text-lg text-[#21717A]">Filter By</FormLabel>
            <div className="h-px my-4 bg-gray-300 shadow"></div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    onChange={(e) => form.setValue("minPrice", parseInt(e.target.value))}
                    defaultValue="0"
                    className="w-[100px]"
                  />
                  <span>-</span>
                  <Input
                    id="maxPrice"
                    type="number"
                    onChange={(e) => form.setValue("maxPrice", parseInt(e.target.value))}
                    defaultValue="1000000"
                    className="w-[100px]"
                  />
                </div>
                <FormMessage />
              </FormItem>
              <div className="h-px bg-gray-300 shadow"></div>
              <FormField
                control={form.control}
                name="locations"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-sm text-[#566976]">Khu vực</FormLabel>
                    </div>
                    {locations.map((item) => (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                field.onChange([...field?.value, item.id]);
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
              <FormField
                control={form.control}
                name="ratings"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-sm text-[#566976]">Đánh giá</FormLabel>
                    </div>
                    {ratings.map((item) => (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                field.onChange([...field?.value, item.id]);
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
            </form>
          </Form>
        </div>
        <div className="w-4/5 px-7 py-4">
          <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-wrap justify-center gap-4">
            {paginatedItems.map((item) => (
              <Link href={`/filter/${encodeURIComponent(item.title)}`} key={item.id}>
                <CardDp 
                  title={item.title} 
                  location={item.location} 
                  description={item.description} 
                  priceRange={item.priceRange} 
                  rating={item.rating} 
                  reviews={item.reviews} 
                />
              </Link>
            ))}
          </div>

          </div>
          <Stack spacing={2} className="mt-4 flex justify-center items-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default CheckboxReactHookFormMultiple;
