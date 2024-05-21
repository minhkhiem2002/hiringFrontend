'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import Navbar from "@/components/user/main-nav";
import CardDp from "@/components/user/card-dp";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const items = [
  {
    id: "football",
    label: "Bóng đá",
  },
  {
    id: "basketball",
    label: "Bóng rổ",
  },
  {
    id: "Volleyball",
    label: "Bóng chuyền",
  },
  {
    id: "Badminton",
    label: "Cầu lông",
  },
  {
    id: "Swimming",
    label: "Bơi lội",
  },
  {
    id: "Indoor",
    label: "Thể thao trong nhà",
  },
  {
    id: "Quận 1",
    label: "Quận 1",
  },
  {
    id: "Quận 3",
    label: "Quận 3",
  },
  {
    id: "Quận 5",
    label: "Quận 5",
  },
  {
    id: "Quận 10",
    label: "Quận 10",
  },
  {
    id: "Quận Bình Thạnh",
    label: "Quận Bình Thạnh",
  },
  {
    id: "Quận Gò Vấp",
    label: "Quận Gò Vấp",
  },
  {
    id: "Khác",
    label: "Khác",
  },
  {
    id: "5star",
    label: (
      <div className='flex gap-1'>
        <FaStar color="#F4B30C" />
        <FaStar color="#F4B30C" />
        <FaStar color="#F4B30C" />
        <FaStar color="#F4B30C" />
        <FaStar color="#F4B30C" />
      </div>
    ),
  },
  {
    id: "4star",
    label: (
      <div className='flex gap-1'>
        <FaStar color="#F4B30C" />
        <FaStar color="#F4B30C" />
        <FaStar color="#F4B30C" />
        <FaStar color="#F4B30C" />
        <FaRegStar color="#F4B30C" />
        <p>trở lên</p>
      </div>
    ),
  },
  {
    id: "3star",
    label: (
      <div className='flex gap-1'>
        <FaStar color="#F4B30C" />
        <FaStar color="#F4B30C" />
        <FaStar color="#F4B30C" />
        <FaRegStar color="#F4B30C" />
        <FaRegStar color="#F4B30C" />
        <p>trở lên</p>
      </div>
    ),
  },
  {
    id: "2star",
    label: (
      <div className='flex gap-1'>
        <FaStar color="#F4B30C" />
        <FaStar color="#F4B30C" />
        <FaRegStar color="#F4B30C" />
        <FaRegStar color="#F4B30C" />
        <FaRegStar color="#F4B30C" />
        <p>trở lên</p>
      </div>
    ),
  },
  {
    id: "1star",
    label: (
      <div className='flex gap-1'>
        <FaStar color="#F4B30C" />
        <FaRegStar color="#F4B30C" />
        <FaRegStar color="#F4B30C" />
        <FaRegStar color="#F4B30C" />
        <FaRegStar color="#F4B30C" />
        <p>trở lên</p>
      </div>
    ),
  },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  minPrice: z.number(),
  maxPrice: z.number(),
});

const CheckboxReactHookFormMultiple = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["football", "4star"],
      minPrice: 0,
      maxPrice: 1000000
    },
  });

  console.log(form.watch("items"));

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const firstItems = items.slice(0, 6);
  const remainingItems = items.slice(6, 13);
  const lastItems = items.slice(13)


  return (
    <div>
      <div className="sticky z-20">
        <Navbar />
      </div>
      <div className='mt-4 flex'>
        <div className='w-1/5  px-7 py-4 border rounded-xl'>
          <Form {...form}>
            <FormLabel className="text-lg text-[#21717A]">Filter By</FormLabel>
            <div className="h-px my-4 bg-gray-300 shadow"></div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-sm text-[#566976]">Categories</FormLabel>
                    </div>
                    {firstItems.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked: boolean) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                  }}
                                  className={`data-[state=checked]:bg-[#129AA6]`}
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-[#7D92A1] text-sm">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
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
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-sm text-[#566976]">Khu vực</FormLabel>
                </div>
                {remainingItems.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked: boolean) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                              }}
                              className={`data-[state=checked]:bg-[#129AA6]`}
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-[#7D92A1] text-sm">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
              <div className="h-px bg-gray-300 shadow"></div>
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-sm text-[#566976]">Đánh giá</FormLabel>
                </div>
                {lastItems.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked: boolean) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                              }}
                              className={`data-[state=checked]:bg-[#129AA6]`}
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-[#7D92A1] text-sm">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            </form>
          </Form>
        </div>
        <div className='flex w-4/5 space-x-8 mx-6 h-fit rounded-xl'>
          <CardDp />
          <CardDp />
          <CardDp />
        </div>

      </div>
    </div>
  );
};

export default CheckboxReactHookFormMultiple;
