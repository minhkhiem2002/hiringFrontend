import Navbar from "@/components/user/main-nav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const FAQ = () => {
  return (
    <div className="w-full h-screen bg-[#F9F9F9]">
      <Navbar />
      <div className="w-full h-auto flex flex-col items-center justify-center py-2">
        <div className="w-5/6 flex items-start justify-start py-2">
          <Breadcrumb>
            <BreadcrumbList className="justify-start">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/faq" className = 'text-[#129AA6]'>
                FAQ
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="w-5/6 border-2 rounded-lg bg-white flex flex-col items-center justify-center">
          <h1 className="pt-6 text-3xl font-semibold text-[#21717A]">
            Frequently Asked Questions
          </h1>
          <div className="w-1/2 pt-10 pb-16">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Cách để đăng nhập tài khoản vào Spotta
                </AccordionTrigger>
                <AccordionContent>
                  Để đăng nhập vào tài khoản của bạn trên Spotta, bạn chỉ cần
                  vào trang chủ của Spotta, nhấp vào nút "Đăng nhập" ở góc trên
                  bên phải của trang web và nhập thông tin đăng nhập của bạn.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Cách đặt sân thể thao</AccordionTrigger>
                <AccordionContent>
                  Để đặt sân thể thao trên Spotta, đầu tiên bạn cần đăng nhập
                  vào tài khoản của mình. Sau đó, chọn môn thể thao mà bạn muốn
                  chơi, chọn sân và thời gian phù hợp, và tiến hành đặt sân bằng
                  cách nhấp vào nút "Đặt sân".
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Làm thế nào để kí gửi trang thiết bị tại Spotta
                </AccordionTrigger>
                <AccordionContent>
                  Để kí gửi trang thiết bị tại Spotta, bạn cần đăng nhập vào tài
                  khoản của mình. Sau đó, vào trang cá nhân của bạn, chọn mục
                  "Kí gửi trang thiết bị" và làm theo hướng dẫn để hoàn tất quá
                  trình kí gửi.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Làm thế nào để tạo hoặc tham gia đội trong Spotta
                </AccordionTrigger>
                <AccordionContent>
                  Để tạo hoặc tham gia đội trong Spotta, đầu tiên bạn cần đăng
                  nhập vào tài khoản của mình. Sau đó, vào trang cá nhân của
                  bạn, chọn mục "Đội của tôi" và làm theo hướng dẫn để tạo hoặc
                  tham gia đội.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
