"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import News from "../../../public/images/News.jpg";
const Test = () => {
  const today = new Date().toLocaleDateString();
  return (
    <div className="flex flex-col">
      <Card className="w-[300px] border-none">
        <CardHeader>
          <CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hôm nay</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {today}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className = 'mb-10'>
            <Image src={News} width={250} height={250} alt="News" className="rounded-md" />
            <CardDescription>Trận đấu hôm nay</CardDescription>
          </div>
          <div>
            <Image src={News} width={250} height={250} alt="News" />
            <CardDescription>Trận đấu hôm nay</CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Test;
