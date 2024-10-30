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
import data from "@/ultils/dataEquipment.json"; // Use the updated data file
import { FaStar, FaRegStar } from "react-icons/fa";

const categories = [
  { id: "football", label: "Football" },
  { id: "basketball", label: "Basketball" },
  { id: "volleyball", label: "Volleyball" },
  { id: "badminton", label: "Badminton" },
  { id: "swimming", label: "Swimming" },
  { id: "indoor", label: "Indoor Sports" }
];

const ratings = [
  { id: "5star", label: <div className="flex gap-1"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div> },
  { id: "4star", label: <div className="flex gap-1"><FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar /> 4+ stars</div> },
  { id: "3star", label: <div className="flex gap-1"><FaStar /><FaStar /><FaStar /><FaRegStar /><FaRegStar /> 3+ stars</div> },
  { id: "2star", label: <div className="flex gap-1"><FaStar /><FaStar /><FaRegStar /><FaRegStar /><FaRegStar /> 2+ stars</div> },
  { id: "1star", label: <div className="flex gap-1"><FaStar /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /> 1+ stars</div> }
];

const itemsPerPage = 9;

const FormSchema = z.object({
  items: z.array(z.string()).refine(value => value.length > 0, {
    message: "You must select at least one item."
  }),
  ratings: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional()
});

const SearchFilter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<any[]>(data);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
      ratings: [],
      minPrice: 0,
      maxPrice: 1000000
    }
  });

  const onSubmit = (formData: z.infer<typeof FormSchema>) => {
    toast({
      title: "Submitted values:",
      description: (
        <pre>
          <code>{JSON.stringify(formData, null, 2)}</code>
        </pre>
      )
    });
  };

  useEffect(() => {
    const { items, ratings, minPrice, maxPrice } = form.getValues();

    const filtered = data.filter(item => {
      const matchesCategory = items.length === 0 || items.includes(item.type);
      const matchesRating = ratings.length === 0 || ratings.some(rating => {
        const itemRating = item.rating;
        switch (rating) {
          case "5star": return itemRating === 5;
          case "4star": return itemRating >= 4;
          case "3star": return itemRating >= 3;
          case "2star": return itemRating >= 2;
          case "1star": return itemRating >= 1;
          default: return true;
        }
      });

      const priceRange = item.priceRange.split('-').map(price => parseInt(price, 10));
      const matchesPrice = (minPrice ? priceRange[0] >= minPrice : true) &&
                           (maxPrice ? priceRange[1] <= maxPrice : true);

      return matchesCategory && matchesRating && matchesPrice;
    });

    setFilteredItems(filtered);
  }, [form.watch("items"), form.watch("ratings"), form.watch("minPrice"), form.watch("maxPrice")]);

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Navbar />
      <div className="flex mt-4">
        <div className="w-1/5 px-7 py-4 border rounded-xl">
          <Form {...form}>
            <FormLabel className="text-lg">Filter By</FormLabel>
            <div className="h-px my-4 bg-gray-300 shadow"></div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="items"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    {categories.map(category => (
                      <FormControl key={category.id}>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value.includes(category.id)}
                            onCheckedChange={(checked) => {
                              field.onChange(checked
                                ? [...field.value, category.id]
                                : field.value.filter(id => id !== category.id));
                            }}
                            id={category.id}
                          />
                          <FormLabel htmlFor={category.id}>
                            {category.label}
                          </FormLabel>
                        </div>
                      </FormControl>
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ratings"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Rating</FormLabel>
                    {ratings.map(rating => (
                      <FormControl key={rating.id}>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value?.includes(rating.id)}
                            onCheckedChange={(checked) => {
                              field.onChange(checked
                                ? [...(field.value || []), rating.id]
                                : field.value?.filter(id => id !== rating.id));
                            }}
                            id={rating.id}
                          />
                          <FormLabel htmlFor={rating.id}>
                            {rating.label}
                          </FormLabel>
                        </div>
                      </FormControl>
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4 flex flex-col gap-3">
                <FormLabel>Price</FormLabel>
                <Input
                  {...form.register("minPrice", { valueAsNumber: true })}
                  type="number"
                  placeholder="Min Price"
                />
                <Input
                  {...form.register("maxPrice", { valueAsNumber: true })}
                  type="number"
                  placeholder="Max Price"
                />
              </div>
              <Button type="submit" className="hidden">Filter</Button>
            </form>
          </Form>
        </div>

        <div className="w-4/5 px-5 py-4">
          <div className="grid grid-cols-3 gap-3">
            {paginatedItems.map(item => (
              <CardDp key={item.id} title={item.title} {...item} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
