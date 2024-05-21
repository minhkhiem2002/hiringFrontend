import Navbar from "@/components/user/main-nav";
import Image from "next/image";
import Banner from "../../../public/images/Banner.jpg";
import TextBanner from "../../../public/images/TextBanner.png";
import Test from "@/components/user/card-dp";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full flex mt-4">
        <p className="w-500 h-400 ml-8 pr-0  flex items-baseline justify-center text-white text-base font-medium translate-x-8 relative pt-5 z-10">
          <Image
            src={TextBanner}
            width={500}
            height={400}
            alt="TextBanner"
            className="w-500 h-400 flex"
          />
        </p>
        <p className="w-1200 h-800 flex items-center justify-center text-white text-base font-medium relative -translate-y-2 -translate-x-24 z-0">
          <Image
            src={Banner}
            width={1100}
            height={800}
            alt="Banner"
            className="w-1200 h-800 flex z-0 relative"
          />
        </p>
        <div className="w-400 h-800 flex items-center justify-center text-white text-base font-medium relative -translate-y-8  -translate-x-14 z-10">
          <Test/>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
