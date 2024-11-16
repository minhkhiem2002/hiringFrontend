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
import CardEq from "@/components/user/card-eq";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import axios from "axios";
import { Box, Skeleton } from "@mui/material";
import { useTeamStore } from "@/services/store/teamStore";
import CardTeams from "@/components/user/card-team/card-teams";

const categories = [
  { id: "Bóng đá", label: "Bóng đá" },
  { id: "Bóng rổ", label: "Bóng rổ" },
  { id: "Bóng chuyền", label: "Bóng chuyền" },
  { id: "Cầu lông", label: "Cầu lông" },
  { id: "Bơi lội", label: "Bơi lội" },
  { id: "Thể thao trong nhà", label: "Thể thao trong nhà" },
];

const itemsPerPage = 9;

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

  const fetchTeamsData = useTeamStore((state) => state.fetchTeamsData);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  });

  const fetchFilteredData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://sportappdemo.azurewebsites.net/api/SportTeam/GetSportTeams`,
        {
          params: {
            PageSize: itemsPerPage,
            PageNumber: currentPage,
            Search: null,
          },
        }
      );

      setFilteredItems(response.data.sportTeams);
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
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div> {/* Wrapper div to resolve syntax error */}
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
                    <Link href={`/team/${item.endpoint}`} key={item.id}>
                      <CardTeams 
                        name = {item.name}
                        address = {item.address}
                        currentMember = {item.currentMember}
                        limitMember = {item.limitMember}
                        sport = {item.sport}
                        avatar = {item.avatar}
                        endpoint={item.endpoint}
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
