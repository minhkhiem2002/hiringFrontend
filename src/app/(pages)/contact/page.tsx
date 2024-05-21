import Navbar from "@/components/user/main-nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Textarea } from "@/components/ui/textarea"
const FAQ = () => {
  return (
    <div className="w-full h-screen bg-[#F9F9F9]">
      <Navbar />
      <div className="w-full h-auto flex flex-col items-center justify-center py-2">
        <div className="w-5/6 flex items-start justify-start py-2">
          <Breadcrumb>
            <BreadcrumbList className="justify-start">
              <BreadcrumbItem>
                <BreadcrumbLink href = "/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/contact" className="text-[#129AA6]">
           
                    Liên hệ
     
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="w-5/6 border-2 rounded-lg bg-white flex flex-col items-center justify-center">
          <h1 className="pt-6 text-3xl font-semibold text-[#21717A]">
            Liên hệ với chúng tôi
          </h1>
          <div className="w-1/2 pt-10 pb-16">
            <Card className="mx-auto max-w-sm">
              <CardHeader>
                <CardTitle className="text-xl">Thông tin</CardTitle>
                <CardDescription>
                  Thông tin cá nhân và nội dung liên hệ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Input id="first-name" placeholder="Họ" required />
                    </div>
                    <div className="grid gap-2">
                      <Input id="last-name" placeholder="Tên" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email: m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="phone"
                      type="phone"
                      placeholder="Số điện thoại"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Textarea id = "content" placeholder="Nhập nội dung cần liên hệ tại đây." />
                  </div>
                  <Button type="submit" className="w-1/4">
                    Gửi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
